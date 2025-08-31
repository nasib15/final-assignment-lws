import { renderBookingHTML } from "@/utils/pdfTemplate";
import chromium from "@sparticuz/chromium";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs"; // ensure Node runtime for Puppeteer

export async function POST(request) {
  try {
    const booking = await request.json();

    // Render minimal HTML (no external resources)
    const html = renderBookingHTML(booking);

    // Launch headless browser with secure, serverless-friendly flags
    const isLocal = process.env.ENVIRONMENT !== "production";

    // Try to resolve Chrome executable path for local/CI environments
    let executablePath =
      process.env.CHROME_EXECUTABLE_PATH ||
      process.env.GOOGLE_CHROME_BIN ||
      undefined;
    if (!executablePath) {
      if (!isLocal) {
        executablePath = await chromium.executablePath();
      } else {
        // Common defaults for macOS/Linux/Windows
        const mac =
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
        const linux = "/usr/bin/google-chrome";
        const win =
          process.env.PROGRAMFILES +
          "\\Google\\Chrome\\Application\\chrome.exe";
        executablePath =
          process.platform === "darwin"
            ? mac
            : process.platform === "win32"
            ? win
            : linux;
      }
    }

    const browser = await puppeteer.launch({
      args: isLocal
        ? ["--no-sandbox", "--disable-setuid-sandbox"]
        : chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: true,
      executablePath: executablePath,
    });

    const page = await browser.newPage();

    // Block all network requests to avoid external calls and reduce size
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (
        [
          "document",
          "xhr",
          "fetch",
          "stylesheet",
          "image",
          "media",
          "font",
        ].includes(req.resourceType())
      ) {
        return req.abort();
      }
      return req.continue();
    });

    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // Generate compact PDF with print emulation and no background graphics
    await page.emulateMediaType("print");
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true, // allow brand backgrounds; still small due to simple CSS
      displayHeaderFooter: false,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
      preferCSSPageSize: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename=booking-${
          booking?.bookingId || "receipt"
        }.pdf`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "PDF generation failed" },
      { status: 500 }
    );
  }
}

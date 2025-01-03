import { logoBase64 } from "@/app/components/Icons/Icon";
import jsPDF from "jspdf";

export async function generateBookingPDF(bookingData) {
  try {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    // Colors
    const primaryColor = [41, 125, 124];
    const secondaryColor = [51, 51, 51];
    const accentColor = [245, 166, 35];
    const lightGrey = [158, 158, 158];
    const bgGrey = [245, 245, 245];

    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 30, "F");

    // Load the image
    const loadImage = () => {
      // eslint-disable-next-line no-undef
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = logoBase64;
      });
    };

    try {
      const img = await loadImage();

      // Convert SVG to canvas
      const canvas = document.createElement("canvas");
      const scaleFactor = 4;
      canvas.width = 200 * scaleFactor;
      canvas.height = 200 * scaleFactor;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert to PNG base64
      const pngBase64 = canvas.toDataURL("image/svg", 1.0);

      // Logo
      const logoWidth = 25;
      const logoHeight = 10;

      doc.addImage(pngBase64, "SVG", 15, 10, logoWidth, logoHeight);
    } catch (error) {
      console.error("Error adding logo:", error);
    }

    // Accent bar
    doc.setFillColor(...accentColor);
    doc.rect(0, 30, 210, 1, "F");

    // Header Content
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.text("Booking Confirmation", 55, 17);

    // Reference numbers
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text(`Booking ID: #${bookingData.bookingId.toUpperCase()}`, 130, 13);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 130, 19);

    let y = 40;

    // Hotel Name
    doc.setTextColor(...primaryColor);
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text(bookingData.hotelName, 15, y);

    // Line after hotel name
    y += 5;
    doc.setDrawColor(...lightGrey);
    doc.setLineWidth(0.3);
    doc.line(15, y, 195, y);

    // Guest Information
    y += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Guest Information", 15, y);

    y += 5;
    doc.setFillColor(...bgGrey);
    doc.roundedRect(15, y, 180, 25, 2, 2, "F");

    // Guest details inside gray box
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text(`Name: ${bookingData.guestName}`, 20, y + 10);
    doc.text(`Email: ${bookingData.guestEmail}`, 20, y + 18);

    // Reservation Details
    y += 32;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Reservation Details", 15, y);

    y += 5;
    doc.setFillColor(...bgGrey);
    doc.roundedRect(15, y, 180, 25, 2, 2, "F");

    const col1 = 20;
    const col2 = 110;

    doc.setTextColor(...secondaryColor);
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");

    // Check-in/out
    doc.text("Check-in:", col1, y + 8);
    doc.text(
      new Date(bookingData.checkin).toLocaleDateString(),
      col1 + 25,
      y + 8
    );
    doc.text("Check-out:", col2, y + 8);
    doc.text(
      new Date(bookingData.checkout).toLocaleDateString(),
      col2 + 25,
      y + 8
    );

    // Nights/Guests
    doc.text("Nights:", col1, y + 16);
    doc.text(bookingData.nights.toString(), col1 + 25, y + 16);
    doc.text("Guests:", col2, y + 16);
    doc.text(bookingData.guests.toString(), col2 + 25, y + 16);

    // Billing Address
    y += 32;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Billing Address", 15, y);

    y += 5;
    doc.setFillColor(...bgGrey);
    doc.roundedRect(15, y, 180, 35, 2, 2, "F");

    doc.setTextColor(...secondaryColor);
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text(`Street: ${bookingData.billingAddress.streetAddress}`, 20, y + 10);
    doc.text(`City: ${bookingData.billingAddress.city}`, 20, y + 18);
    doc.text(`State: ${bookingData.billingAddress.state}`, 20, y + 26);
    doc.text(`ZIP Code: ${bookingData.billingAddress.zipCode}`, 110, y + 26);

    // Payment Summary
    y += 42;
    doc.setFillColor(...primaryColor);
    doc.roundedRect(15, y, 180, 70, 2, 2, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Payment Summary", 45, y + 15);

    doc.setFontSize(9);
    doc.setFont(undefined, "normal");

    // Cost Breakdown
    const startY = y + 25;
    doc.text(
      `Room Rate (${bookingData.nights} nights × $${bookingData.pricePerNight})`,
      45,
      startY
    );
    doc.text(
      `$${bookingData.nights * bookingData.pricePerNight}`,
      160,
      startY,
      { align: "right" }
    );

    doc.text("Cleaning Fee", 45, startY + 8);
    doc.text("$17.50", 160, startY + 8, { align: "right" });

    doc.text("Service Fee", 45, startY + 16);
    doc.text("$51.31", 160, startY + 16, { align: "right" });

    // Line above total
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.3);
    doc.line(45, startY + 25, 160, startY + 25);

    // Total with adjusted position
    doc.setFont(undefined, "bold");
    doc.text("Total Amount", 45, startY + 35);
    doc.text(`$${bookingData.totalPrice}`, 160, startY + 35, {
      align: "right",
    });

    // Margin after Payment Summary
    y += 80;

    // Footer
    doc.setDrawColor(...lightGrey);
    doc.setLineWidth(0.3);
    doc.line(15, y, 195, y);

    // Hotel Contact Details
    y += 8;
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(8);
    doc.setFont(undefined, "bold");
    doc.text(bookingData.hotelName, 15, y);
    doc.setFont(undefined, "normal");
    doc.text(bookingData.hotelAddress, 15, y + 5);
    doc.text(
      `Tel: ${bookingData.hotelPhone} | Email: ${bookingData.hotelEmail}`,
      15,
      y + 10
    );

    return doc.output("blob");
  } catch (error) {
    console.error("PDF Generation Error:", error);
    throw new Error("Failed to generate PDF");
  }
}

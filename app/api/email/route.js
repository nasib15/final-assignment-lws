import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const { bookingData } = await request.json();
    const safeGuestName = escapeHtml(bookingData?.guestName);
    const safeHotelName = escapeHtml(bookingData?.hotelName);
    const safeGuests = escapeHtml(bookingData?.guests);
    const safeTotalPrice = escapeHtml(bookingData?.totalPrice);
    const safeBookingId = escapeHtml(String(bookingData?.bookingId ?? "").toUpperCase());
    const safeCheckin = escapeHtml(
      new Date(bookingData?.checkin).toLocaleDateString()
    );
    const safeCheckout = escapeHtml(
      new Date(bookingData?.checkout).toLocaleDateString()
    );

    // Generate PDF securely on the server using our API route (avoids large client payloads)
    const headersList = request.headers;
    const host = headersList.get("host");
    const proto = headersList.get("x-forwarded-proto") || "http";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`;

    const pdfResp = await fetch(`${baseUrl}/api/pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
      cache: "no-store",
    });

    if (!pdfResp.ok) {
      const err = await pdfResp.text();
      throw new Error(`Failed to generate PDF: ${err}`);
    }

    const arrayBuffer = await pdfResp.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingData.guestEmail,
      subject: "Booking Confirmation - Hotel Booking",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #009688;">Booking Confirmation</h1>
          <p>Dear ${safeGuestName},</p>
          <p>Thank you for booking with us! Your reservation has been confirmed.</p>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #009688; margin-top: 0;">Booking Details</h2>
            <p><strong>Hotel:</strong> ${safeHotelName}</p>
            <p><strong>Check-in:</strong> ${safeCheckin}</p>
            <p><strong>Check-out:</strong> ${safeCheckout}</p>
            <p><strong>Guests:</strong> ${safeGuests}</p>
            <p><strong>Total Amount:</strong> $${safeTotalPrice}</p>
            <p><strong>Booking ID:</strong> ${safeBookingId}</p>
          </div>

          <p>Your booking receipt is attached to this email.</p>

          <p>If you have any questions, please don't hesitate to contact us.</p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              This is an automated email. Please do not reply directly to this message.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `booking-${safeBookingId}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

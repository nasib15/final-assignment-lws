import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const { bookingData, pdfBuffer } = await request.json();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: bookingData.guestEmail,
      subject: "Booking Confirmation - Hotel Booking",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #009688;">Booking Confirmation</h1>
          <p>Dear ${bookingData.guestName},</p>
          <p>Thank you for booking with us! Your reservation has been confirmed.</p>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #009688; margin-top: 0;">Booking Details</h2>
            <p><strong>Hotel:</strong> ${bookingData.hotelName}</p>
            <p><strong>Check-in:</strong> ${new Date(
              bookingData.checkin
            ).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> ${new Date(
              bookingData.checkout
            ).toLocaleDateString()}</p>
            <p><strong>Guests:</strong> ${bookingData.guests}</p>
            <p><strong>Total Amount:</strong> $${bookingData.totalPrice}</p>
            <p><strong>Booking ID:</strong> ${bookingData.bookingId.toUpperCase()}</p>
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
          filename: `booking-${bookingData.bookingId}.pdf`,
          content: Buffer.from(pdfBuffer),
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

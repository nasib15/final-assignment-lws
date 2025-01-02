"use server";

import dbConnect from "@/lib/dbConnect";
import { paymentModel } from "@/models/payment";

export async function addPayment(userId, hotelId, paymentInfo, bookingId) {
  await dbConnect();

  const paymentData = {
    userId,
    hotelId,
    totalPrice: Number(paymentInfo.totalPrice),
    cardNumber: Number(paymentInfo.cardNumber),
    expiration: new Date(paymentInfo.expiration),
    cvv: Number(paymentInfo.cvv),
    streetAddress: paymentInfo.streetAddress,
    aptNumber: Number(paymentInfo.aptNumber),
    city: paymentInfo.city,
    state: paymentInfo.state,
    zipCode: Number(paymentInfo.zipCode),
    bookingId,
  };

  try {
    await paymentModel.create(paymentData);

    return {
      success: true,
      message: "Payment added successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

"use server";

import dbConnect from "@/lib/dbConnect";
import { paymentModel } from "@/models/payment";

export async function addPayment(userId, hotelId, paymentInfo) {
  await dbConnect();

  try {
    await paymentModel.create({
      userId,
      hotelId,
      ...paymentInfo,
    });

    return {
      success: true,
      message: "Payment added successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

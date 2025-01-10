"use server";

import dbConnect from "@/lib/dbConnect";
import { bookingModel } from "@/models/bookings";
import { paymentModel } from "@/models/payment";
import { revalidatePath } from "next/cache";

export async function addPayment(
  userId,
  hotelId,
  paymentInfo,
  totalPrice,
  checkin,
  checkout,
  guests,
  bookingId,
) {
  await dbConnect();

  const paymentData = {
    userId,
    hotelId,
    totalPrice: Number(totalPrice) + 51.31 + 17.5,
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

    await bookingModel.findByIdAndUpdate(bookingId, {
      bookingStatus: "confirmed",
      checkin,
      checkout,
      guests,
      bookingPrice: totalPrice,
    });

    revalidatePath(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/my-bookings`);

    return {
      success: true,
      message: "Payment added successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

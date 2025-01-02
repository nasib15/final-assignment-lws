"use server";

import dbConnect from "@/lib/dbConnect";
import { bookingModel } from "@/models/bookings";

export async function addBooking(bookingData) {
  await dbConnect();

  try {
    await bookingModel.create(bookingData);

    return {
      success: true,
      message: "Booking added successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

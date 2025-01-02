"use server";

import { getOneBookingDetails } from "@/db/queries";
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

// find booking id
export async function findBookingId(hotelId, userId, checkin, checkout) {
  const res = await getOneBookingDetails(hotelId, userId, checkin, checkout);
  return res.id;
}

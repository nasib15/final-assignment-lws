"use server";

import { getOneBookingDetails } from "@/db/queries";
import dbConnect from "@/lib/dbConnect";
import { bookingModel } from "@/models/bookings";
import { replaceMongoIdInObject } from "@/utils/data-utils";

export async function addBooking(bookingData) {
  await dbConnect();

  try {
    const response = await bookingModel.create(bookingData);
    const bookingDataResponse = await bookingModel
      .findOne({
        _id: response._id,
      })
      .lean();

    const bookingDataResponseWithoutId =
      replaceMongoIdInObject(bookingDataResponse);

    return {
      success: true,
      message: "Booking added successfully",
      data: bookingDataResponseWithoutId,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

// find booking id
export async function findBookingId(hotelId, userId, bookedAt) {
  const res = await getOneBookingDetails(hotelId, userId, bookedAt);
  return res.id;
}

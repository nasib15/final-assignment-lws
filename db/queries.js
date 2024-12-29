import dbConnect from "@/lib/dbConnect";
import { hotelModel } from "@/models/hotels";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";

export async function getAllHotels(page = 1, limit = 8) {
  await dbConnect();

  // skip value
  const skip = (page - 1) * limit;

  // Total number of hotels
  const totalHotels = await hotelModel?.countDocuments();

  // Hotels for the current page
  const hotels = await hotelModel?.find()?.skip(skip)?.limit(limit)?.lean();

  return {
    hotels: replaceMongoIdInArray(hotels),
    totalPages: Math.ceil(totalHotels / limit),
    currentPage: page,
  };
}

export async function getHotelById(id) {
  await dbConnect();

  const hotel = await hotelModel?.findById(id)?.lean();

  return replaceMongoIdInObject(hotel);
}

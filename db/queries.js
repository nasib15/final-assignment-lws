import dbConnect from "@/lib/dbConnect";
import { hotelModel } from "@/models/hotels";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";

export async function getAllHotels() {
  await dbConnect();

  const hotels = await hotelModel?.find()?.lean();

  return replaceMongoIdInArray(hotels);
}

export async function getHotelById(id) {
  await dbConnect();

  const hotel = await hotelModel?.findById(id)?.lean();

  return replaceMongoIdInObject(hotel);
}

import dbConnect from "@/lib/dbConnect";
import { bookingModel } from "@/models/bookings";
import { hotelModel } from "@/models/hotels";
import { paymentModel } from "@/models/payment";
import { reviewModel } from "@/models/reviews";
import { userModel } from "@/models/users";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";

// get all hotels for the current page with pagination
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

// get hotel by id
export async function getHotelById(id) {
  await dbConnect();

  const hotel = await hotelModel?.findById(id)?.lean();

  return replaceMongoIdInObject(hotel);
}

// get user id by email
export async function getUserByEmail(email) {
  await dbConnect();

  const user = await userModel?.findOne({ email }).lean();

  const userDetails = replaceMongoIdInObject(user);

  return userDetails.id;
}

// get user by id
export async function getUserById(id) {
  await dbConnect();

  const user = await userModel?.findById(id)?.lean();

  return replaceMongoIdInObject(user);
}

// get reviews by hotel id
export async function getReviewsByHotelId(hotelId) {
  await dbConnect();

  const reviews = await reviewModel?.find({ hotelId })?.lean();

  return replaceMongoIdInArray(reviews);
}

// get user review on a particular hotel
export async function getUserReview(hotelId, userId) {
  await dbConnect();

  const review = await reviewModel?.findOne({ hotelId, userId })?.lean();

  if (!review) {
    return null;
  }

  return replaceMongoIdInObject(review);
}

// get booking details
export async function getOneBookingDetails(hotelId, userId, checkin, checkout) {
  await dbConnect();

  const booking = await bookingModel
    ?.findOne({
      hotelId,
      userId,
      checkin,
      checkout,
    })
    ?.lean();

  return replaceMongoIdInObject(booking);
}

// get payment details by booking id
export async function getPaymentDetails(bookingId) {
  await dbConnect();

  const payment = await paymentModel?.findOne({ bookingId })?.lean();

  return replaceMongoIdInObject(payment);
}

import dbConnect from "@/lib/dbConnect";
import { bookingModel } from "@/models/bookings";
import { hotelModel } from "@/models/hotels";
import { paymentModel } from "@/models/payment";
import { reviewModel } from "@/models/reviews";
import { userModel } from "@/models/users";
import { wishlistModel } from "@/models/wishlists";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-utils";

// get all hotels for the current page with pagination and search
export async function getAllHotels(page = 1, query = "", sort = "", limit = 8) {
  await dbConnect();

  // skip value
  const skip = (page - 1) * limit;

  // Create sort object based on sort parameter
  let sortObject = {};
  switch (sort) {
    case "price_asc":
      sortObject = { pricePerNight: 1 };
      break;
    case "price_desc":
      sortObject = { pricePerNight: -1 };
      break;
    default:
      sortObject = {};
  }

  // Hotels for the current page
  const hotels = await hotelModel
    ?.find({ name: { $regex: query, $options: "i" } })
    ?.sort(sortObject)
    ?.skip(skip)
    ?.limit(limit)
    ?.lean();

  // Total number of hotels
  const totalHotels = await hotelModel
    ?.find({ name: { $regex: query, $options: "i" } })
    ?.countDocuments();

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
export async function getUserIdByEmail(email) {
  await dbConnect();

  const user = await userModel?.findOne({ email }).lean();

  const userDetails = replaceMongoIdInObject(user);

  return userDetails?.id;
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
export async function getOneBookingDetails(hotelId, userId, bookedAt) {
  await dbConnect();

  const booking = await bookingModel
    ?.findOne({
      hotelId,
      userId,
      bookedAt,
    })
    ?.lean();

  return replaceMongoIdInObject(booking);
}

// get user bookings
export async function getUserBookings(userId) {
  await dbConnect();

  const bookings = await bookingModel?.find({ userId })?.lean();

  return replaceMongoIdInArray(bookings);
}

// get confirmed bookings
export async function getConfirmedBookings(userId) {
  await dbConnect();

  const bookings = await bookingModel
    ?.find({ userId, bookingStatus: "confirmed" })
    ?.lean();

  return replaceMongoIdInArray(bookings);
}

// get pending bookings
export async function getPendingBookings(userId) {
  await dbConnect();

  const bookings = await bookingModel
    ?.find({ userId, bookingStatus: "pending" })
    ?.lean();

  return replaceMongoIdInArray(bookings);
}

// get payment details by booking id
export async function getPaymentDetails(bookingId) {
  await dbConnect();

  const payment = await paymentModel?.findOne({ bookingId })?.lean();

  if (!payment) {
    return null;
  }

  return replaceMongoIdInObject(payment);
}

// add hotel data
export async function addHotelData(hotelData) {
  await dbConnect();

  const hotel = await hotelModel?.create(hotelData);

  return replaceMongoIdInObject(hotel);
}

// get all hotels for a user
export async function getUserHotels(authUserName) {
  await dbConnect();

  const hotels = await hotelModel?.find({ owner: authUserName })?.lean();

  return replaceMongoIdInArray(hotels);
}

// delete hotel by id
export async function deleteHotel(hotelId) {
  await dbConnect();

  const hotel = await hotelModel?.findByIdAndDelete(hotelId);

  return replaceMongoIdInObject(hotel);
}

// update hotel
export async function updateHotel(id, hotelData) {
  await dbConnect();

  const hotel = await hotelModel
    .findByIdAndUpdate(id, hotelData, { new: true })
    .lean();

  return replaceMongoIdInObject(hotel);
}

// Check if dates are available for booking
export async function checkDateAvailability(
  hotelId,
  checkin,
  checkout,
  bookingId = null,
) {
  await dbConnect();

  const query = {
    hotelId,
    checkin: { $lte: checkout },
    checkout: { $gte: checkin },
  };

  if (bookingId) {
    query._id = { $ne: bookingId };
  }

  const overlappingBookings = await bookingModel.find(query).lean();

  return overlappingBookings.length === 0;
}

// get all wishlist for a user
export async function getUserWishlist(userId) {
  await dbConnect();

  const wishlists = await wishlistModel?.find({ userId })?.lean();

  return replaceMongoIdInArray(wishlists);
}

// Check if hotel is in wishlist
export async function isHotelInWishlist(userId, hotelId) {
  await dbConnect();

  const wishlistItem = await wishlistModel
    ?.findOne({ userId, hotelId })
    ?.lean();

  return !!wishlistItem;
}

// add wishlist
export async function addToWishlist(userId, hotelId) {
  await dbConnect();

  const wishlist = await wishlistModel?.create({ hotelId, userId });

  return replaceMongoIdInObject(wishlist);
}

// delete wishlist
export async function removeFromWishlist(userId, hotelId) {
  await dbConnect();

  const wishlist = await wishlistModel?.findOneAndDelete(
    { hotelId, userId },
    { new: true },
  );

  return replaceMongoIdInObject(wishlist);
}

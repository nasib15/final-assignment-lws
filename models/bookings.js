import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  hotelId: {
    required: true,
    type: ObjectId,
  },
  userId: {
    required: true,
    type: ObjectId,
  },
  bookingId: {
    required: true,
    type: String,
  },
  checkin: {
    required: true,
    type: String,
  },
  checkout: {
    required: true,
    type: String,
  },
  guests: {
    required: true,
    type: Number,
  },
  bookingPrice: {
    required: true,
    type: Number,
  },
  bookedAt: {
    default: Date.now,
    type: Date,
  },
});

export const bookingModel =
  mongoose.models.bookings ?? mongoose.model("bookings", bookingSchema);

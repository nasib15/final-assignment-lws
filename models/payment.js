import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  hotelId: {
    required: true,
    type: ObjectId,
  },
  userId: {
    required: true,
    type: ObjectId,
  },
  totalPrice: {
    required: true,
    type: Number,
  },
  cardNumber: {
    required: true,
    type: Number,
  },
  expiration: {
    required: true,
    type: Date,
  },
  cvv: {
    required: true,
    type: Number,
  },
  streetAddress: {
    required: true,
    type: String,
  },
  aptNumber: {
    required: false,
    type: Number,
  },
  city: {
    required: true,
    type: String,
  },
  state: {
    required: true,
    type: String,
  },
  zipCode: {
    required: true,
    type: Number,
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
});

export const paymentModel =
  mongoose.models.payments ?? mongoose.model("payments", paymentSchema);

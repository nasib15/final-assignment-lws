import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  hotelId: {
    required: true,
    type: ObjectId,
  },
  userId: {
    required: true,
    type: ObjectId,
  },
  ratings: {
    required: true,
    type: Number,
  },
  review: {
    required: true,
    type: String,
  },
  reviewDate: {
    default: Date.now,
    type: Date,
  },
});

export const reviewModel =
  mongoose.models.reviews ?? mongoose.model("reviews", reviewSchema);

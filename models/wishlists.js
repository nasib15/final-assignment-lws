import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema({
  userId: {
    required: true,
    type: ObjectId,
  },
  hotelId: {
    required: true,
    type: ObjectId,
  },
  addedAt: {
    default: Date.now,
    type: String,
  },
});

export const wishlistModel =
  mongoose.models.wishlists ?? mongoose.model("wishlists", wishlistSchema);

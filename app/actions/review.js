"use server";

import dbConnect from "@/lib/dbConnect";
import { reviewModel } from "@/models/reviews";

// add review
export async function addReview(reviewData) {
  await dbConnect();

  try {
    await reviewModel.create(reviewData);

    return {
      success: true,
      message: "Review added successfully",
    };
  } catch (err) {
    throw new Error(err);
  }
}

// delete review
export async function deleteReview(reviewId) {
  await dbConnect();

  try {
    await reviewModel.findByIdAndDelete(reviewId);
    return {
      success: true,
      message: "Review deleted successfully",
    };
  } catch (err) {
    throw new Error(err);
  }
}

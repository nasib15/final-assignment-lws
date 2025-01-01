"use server";

import dbConnect from "@/lib/dbConnect";
import { reviewModel } from "@/models/reviews";
import { revalidatePath } from "next/cache";

// add review
export async function addReview(hotelId, reviewData) {
  await dbConnect();

  try {
    await reviewModel.create(reviewData);

    revalidatePath(`${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${hotelId}`);

    return {
      success: true,
      message: "Review added successfully",
    };
  } catch (err) {
    throw new Error(err);
  }
}

// delete review
export async function deleteReview(reviewId, hotelId) {
  await dbConnect();

  try {
    await reviewModel.findByIdAndDelete(reviewId);
    revalidatePath(`${process.env.NEXT_PUBLIC_BASE_URL}/hotels/${hotelId}`);
    return {
      success: true,
      message: "Review deleted successfully",
    };
  } catch (err) {
    throw new Error(err);
  }
}

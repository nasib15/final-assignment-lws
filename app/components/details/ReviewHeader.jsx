"use client";
import { getAvgRating } from "@/utils/getAvgRating";
import Link from "next/link";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

const ReviewHeader = ({
  hotelId,
  authUserId,
  reviewDetails,
  userReview,
  isOwner,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const averageRating = getAvgRating(reviewDetails);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <div className="flex items-center">
            <i className="fas fa-star text-yellow-500 mr-2"></i>
            <span className="text-xl font-semibold">
              {averageRating.toFixed(1)}
            </span>
            <span className="mx-2">·</span>
            <span className="text-gray-600">
              {reviewDetails?.length} reviews
            </span>
          </div>
        </div>

        {authUserId ? (
          !userReview &&
          !isOwner && (
            <button
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80"
              onClick={() => setIsModalOpen(true)}
            >
              Write a Review
            </button>
          )
        ) : (
          <Link
            href="/login"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80"
          >
            Login to Review
          </Link>
        )}
        {isModalOpen && (
          <ReviewModal
            hotelId={hotelId}
            authUserId={authUserId}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </>
  );
};
export default ReviewHeader;

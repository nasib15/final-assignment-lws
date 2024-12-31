"use client";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

const ReviewHeader = ({ hotelId, userId, reviewDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const averageRating =
    reviewDetails?.reduce((acc, review) => acc + review.ratings, 0) /
      reviewDetails?.length || 0;

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

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 border border-gray-900 rounded-lg hover:bg-gray-100"
        >
          Write a Review
        </button>
      </div>

      {isModalOpen && (
        <ReviewModal
          hotelId={hotelId}
          userId={userId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
export default ReviewHeader;

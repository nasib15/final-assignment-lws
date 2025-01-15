"use client";

import { addReview } from "@/app/actions/review";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ReviewModal = ({ onClose, hotelId, authUserId }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    review: "",
  });
  const [error, setError] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    // Reset previous errors
    setError("");

    if (!formData.rating) {
      setError("Please select a rating");
      return false;
    }

    if (!formData.review.trim()) {
      setError("Please write a review");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        ratings: formData.rating,
        review: formData.review.trim(),
        userId: authUserId,
        hotelId,
      };

      const response = await addReview(reviewData);

      if (response.success) {
        onClose();
        toast.success("Review added successfully");
        router.refresh();
      }
    } catch (error) {
      setError("Failed to submit review. Please try again.");
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
    setError("");
  };

  const handleReviewChange = (e) => {
    const review = e.target.value;
    setFormData((prev) => ({
      ...prev,
      review,
    }));
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center modal-overlay">
      <div className="bg-white rounded-2xl w-full max-w-xl mx-4 overflow-hidden modal-content">
        <div className="border-b p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Write a review</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Overall Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="text-2xl transition-colors duration-200"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => handleRatingClick(star)}
                  >
                    <i
                      className={`fas fa-star ${
                        star <= (hoveredRating || formData.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    ></i>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Review
              </label>
              <textarea
                rows="4"
                value={formData.review}
                onChange={handleReviewChange}
                placeholder="Share your experience with other travelers..."
                className={`w-full px-4 py-3 rounded-lg border ${
                  error && !formData.review.trim()
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-gray-500"
                } focus:ring-0 resize-none transition-all duration-200`}
              ></textarea>
            </div>

            <div className="border-t pt-4 bg-gray-50 -mx-6 -mb-6 px-6 py-4">
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:brightness-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    !formData.rating || !formData.review.trim() || isSubmitting
                  }
                >
                  Submit Review
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;

"use client";

import { deleteReview } from "@/app/actions/review";

const DeleteBtn = ({ reviewId, hotelId }) => {
  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this review?")) {
        const res = await deleteReview(reviewId, hotelId);
        if (res.success) {
          alert(res.message);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
      title="Delete review"
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
export default DeleteBtn;

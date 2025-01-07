"use client";

import { performDelete } from "@/app/actions/hotels";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const DeleteBtn = ({ hotelId }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this hotel?")) {
        const res = await performDelete(hotelId);

        if (res.success) {
          toast.success("Hotel deleted successfully");
          router.refresh();
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className=" group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"
      title="Delete hotel"
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};

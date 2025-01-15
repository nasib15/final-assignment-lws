"use client";

import { toggleWishlist } from "@/app/actions/wishlist";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const WishlistButton = ({ hotelId, userId, initialIsWishlisted }) => {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const response = await toggleWishlist(userId, hotelId);
      if (response.success) {
        setIsWishlisted(response.action === "added");
        toast.success(response.message);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleWishlist}
      disabled={isLoading}
      className={`absolute right-0 bottom-3 p-2 rounded-full ${
        isWishlisted
          ? "bg-primary text-white"
          : "bg-white/80 text-gray-600 hover:bg-primary hover:text-white"
      } hover:scale-110 transition-all duration-200`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <i
        className={`fas fa-heart ${isWishlisted ? "text-white" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
};

export default WishlistButton;

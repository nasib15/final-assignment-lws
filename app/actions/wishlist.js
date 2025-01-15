"use server";

import {
    addToWishlist,
    isHotelInWishlist,
    removeFromWishlist,
} from "@/db/queries";

export async function toggleWishlist(userId, hotelId) {
  try {
    const isInWishlist = await isHotelInWishlist(userId, hotelId);

    if (isInWishlist) {
      await removeFromWishlist(userId, hotelId);

      return {
        success: true,
        message: "Removed from wishlist",
        action: "removed",
      };
    } else {
      await addToWishlist(userId, hotelId);

      return {
        success: true,
        message: "Added to wishlist",
        action: "added",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

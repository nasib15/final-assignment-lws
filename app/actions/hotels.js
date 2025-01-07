"use server";

import { deleteHotel } from "@/db/queries";

// perform hotel delete
export async function performDelete(hotelId) {
  try {
    await deleteHotel(hotelId);

    return {
      success: true,
      message: "Hotel deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

import { checkDateAvailability } from "@/db/queries";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { hotelId, checkin, checkout, bookingId } = await request.json();

    const isAvailable = await checkDateAvailability(
      hotelId,
      checkin,
      checkout,
      bookingId
    );

    return NextResponse.json({ available: isAvailable });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
}

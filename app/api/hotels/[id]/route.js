import { auth } from "@/auth";
import { getHotelById, updateHotel } from "@/db/queries";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const session = await auth();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const hotelData = await getHotelById(params.id);

    if (!hotelData) {
      return new NextResponse("Hotel not found", { status: 404 });
    }

    // Check if the logged-in user is the owner of the hotel
    if (
      hotelData?.owner?.toLowerCase() !== session?.user?.name?.toLowerCase()
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(hotelData);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const hotelData = await req.json();

    // Update hotel in database
    await updateHotel(params.id, hotelData);

    return NextResponse.json({
      success: true,
      message: "Hotel updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

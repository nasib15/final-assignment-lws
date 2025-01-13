import { auth } from "@/auth";
import { addHotelData } from "@/db/queries";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const hotelData = await req.json();

    await addHotelData(hotelData);

    return NextResponse.json({
      success: true,
      message: "Hotel created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

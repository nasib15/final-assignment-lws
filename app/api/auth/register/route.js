import dbConnect from "@/lib/dbConnect";
import { userModel } from "@/models/users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, password, image } = await request.json();

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      image,
    });

    await userModel.create(user);

    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

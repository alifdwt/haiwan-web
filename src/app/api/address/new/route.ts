import connectMongoDB from "@/lib/mongodb";
import UserAddress from "@/models/userAddress";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    await connectMongoDB();
    const newAddress = new UserAddress({ ...data, createdAt: new Date() });

    await newAddress.save();
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: newAddress,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

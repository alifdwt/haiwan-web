import connectMongoDB from "@/lib/mongodb";
import UserAddress from "@/models/userAddress";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const creator = searchParams.get("creator");

  try {
    await connectMongoDB();
    if (creator) {
      const addresses = await UserAddress.find({ creator: creator });
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: addresses,
      });
    }
    const addresses = await UserAddress.find();
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: addresses,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

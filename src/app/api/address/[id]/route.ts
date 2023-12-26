import connectMongoDB from "@/lib/mongodb";
import UserAddress from "@/models/userAddress";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const address = await UserAddress.findById(params.id);
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: address,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  try {
    await connectMongoDB();
    const address = await UserAddress.findByIdAndUpdate(params.id, data);
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: address,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const deletedAddress = await UserAddress.findByIdAndDelete(params.id);
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: deletedAddress,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

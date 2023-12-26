import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const creator = searchParams.get("creator");

  try {
    await connectMongoDB();
    if (limit) {
      const products = await Product.find()
        .populate("creator")
        .limit(parseInt(limit));
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: products,
      });
    }
    if (creator) {
      const products = await Product.find({ creator: creator }).populate(
        "creator"
      );
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: products,
      });
    }
    const products = await Product.find().populate("creator");
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: products,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");

  try {
    await connectMongoDB()
    if (limit) {
      const products = await Product.find().limit(parseInt(limit));
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: products,
      })
    }
    const products = await Product.find();
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: products,
    })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    })
  }
}

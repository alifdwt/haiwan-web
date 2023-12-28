import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "subcategories", // Nama koleksi subkategori dalam database Anda
          localField: "_id",
          foreignField: "category",
          as: "subcategories",
        },
      },
    ]);
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: categories,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

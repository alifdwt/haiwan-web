import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    await connectMongoDB();
    const category = await Category.aggregate([
      { $match: { name: params.name } },
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
      data: category,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

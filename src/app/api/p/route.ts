import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const creator = searchParams.get("creator");

  try {
    await connectMongoDB();

    let products;
    if (limit) {
      products = await Product.find()
        .populate("creator")
        .populate({
          path: "subcategory",
          select: ["name", "category"],
          populate: {
            path: "category",
            select: "name", // Memilih hanya nama kategori
          },
        })
        .limit(parseInt(limit));
    } else if (creator) {
      products = await Product.find({ creator: creator })
        .populate("creator")
        .populate({
          path: "subcategory",
          select: ["name", "category"],
          populate: {
            path: "category",
            select: "name", // Memilih hanya nama kategori
          },
        });
    } else {
      products = await Product.find()
        .populate("creator")
        .populate({
          path: "subcategory",
          select: ["name", "category"],
          populate: {
            path: "category",
            select: "name", // Memilih hanya nama kategori
          },
        });
    }

    if (!products || products.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "Products not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: products,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error || "Internal Server Error",
    });
  }
}

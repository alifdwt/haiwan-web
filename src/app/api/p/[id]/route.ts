import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectMongoDB();
    const product = await Product.findById(params.id).populate("creator");
    if (!product) {
      return NextResponse.json({
        status: 404,
        message: "Product not found",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: product,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { title, description, price, image, category } = await request.json();

  try {
    await connectMongoDB();
    const existingProduct = await Product.findById(params.id);
    if (!existingProduct) {
      return NextResponse.json({
        status: 404,
        message: "Product not found",
      });
    }

    existingProduct.title = title;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.image = image;
    existingProduct.category = category;
    await existingProduct.save();

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: existingProduct,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectMongoDB();
    const deletedProduct = await Product.findByIdAndDelete(params.id);
    if (!deletedProduct) {
      return NextResponse.json({
        status: 404,
        message: "Product not found",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: deletedProduct,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
};

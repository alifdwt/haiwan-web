import { Products } from "@/constants/dummy";
import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const limit = searchParams.get("limit");

  if (id) {
    const product = Products.find((product) => product.id === Number(id));
    if (!product) {
      return NextResponse.json({
        status: 404,
        message: "Product not found",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Hello World",
      data: product,
    });
  }

  if (limit) {
    const limitedProducts = Products.slice(0, Number(limit));
    return NextResponse.json({
      status: 200,
      message: "Hello World",
      data: limitedProducts,
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Hello World",
    data: Products,
  });
}

// export async function GET() {
//   await connectMongoDB();
//   const products = await Product.find();
//   return NextResponse.json({
//     status: 200,
//     message: "Success",
//     data: products,
//   });
// }

export async function POST(request: NextRequest) {
  await connectMongoDB();
  const newProduct = await Product.create({
    ...request.body,
    createdAt: new Date(),
  });

  return NextResponse.json({
    status: 200,
    message: "Success",
    data: newProduct,
  });
}

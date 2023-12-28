import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    await connectMongoDB();
    const newCategory = new Category({ ...data, createdAt: new Date() });

    await newCategory.save();
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: newCategory,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

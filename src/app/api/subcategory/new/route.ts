import connectMongoDB from "@/lib/mongodb";
import Subcategory from "@/models/subcategory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    await connectMongoDB();
    const newSubcategory = new Subcategory({ ...data, createdAt: new Date() });

    await newSubcategory.save();
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: newSubcategory,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

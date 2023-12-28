import connectMongoDB from "@/lib/mongodb";
import Subcategory from "@/models/subcategory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const subcategories = await Subcategory.find();
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: subcategories,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

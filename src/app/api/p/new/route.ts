import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

export const POST = async (request: NextRequest) => {
    const data = await request.json();
    try {
        await connectMongoDB();
        const newProduct = new Product({...data, createdAt: new Date(), creator: data.userId});

        await newProduct.save();
        return NextResponse.json({
            status: 200,
            message: "Success",
            data: newProduct,
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: error,
        })
    }
}
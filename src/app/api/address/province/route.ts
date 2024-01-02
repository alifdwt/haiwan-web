import { NextRequest, NextResponse } from "next/server";
import provincesDummy from "@/constants/mocks/province";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const province = provincesDummy.rajaongkir.results.find(
        (province) => province.province_id === id
      );
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: province,
      });
    }
    return NextResponse.json({
      rajaongkir: provincesDummy.rajaongkir,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

import citiesDummy from "@/constants/mocks/city";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const province = searchParams.get("province");

  try {
    if (province) {
      const cities = citiesDummy.rajaongkir.results.filter(
        (city) => city.province_id === province
      );

      return NextResponse.json({
        rajaongkir: {
          query: [],
          status: {
            code: 200,
            description: "OK",
          },
          results: cities,
        },
      });
    }

    return NextResponse.json({
      rajaongkir: citiesDummy.rajaongkir,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

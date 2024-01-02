import citiesDummy from "@/constants/mocks/city";
import connectMongoDB from "@/lib/mongodb";
import UserAddress from "@/models/userAddress";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const creator = searchParams.get("creator");

  try {
    await connectMongoDB();
    if (creator) {
      const addresses = await UserAddress.find({ creator: creator });
      const formattedAddresses = addresses.map((address) => {
        return {
          ...address._doc,
          city: {
            id: address.city,
            name:
              citiesDummy.rajaongkir.results.find(
                (city) => city.city_id === address.city
              )?.type +
              " " +
              citiesDummy.rajaongkir.results.find(
                (city) => city.city_id === address.city
              )?.city_name,
          },
          province: {
            id: address.province,
            name: citiesDummy.rajaongkir.results.find(
              (city) => city.province_id === address.province
            )?.province,
          },
        };
      });
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: formattedAddresses,
      });
    }
    const addresses = await UserAddress.find();
    const formattedAddresses = addresses.map((address) => {
      return {
        ...address._doc,
        city: {
          id: address.city,
          name:
            citiesDummy.rajaongkir.results.find(
              (city) => city.city_id === address.city
            )?.type +
            " " +
            citiesDummy.rajaongkir.results.find(
              (city) => city.city_id === address.city
            )?.city_name,
        },
        province: {
          id: address.province,
          name: citiesDummy.rajaongkir.results.find(
            (city) => city.province_id === address.province
          )?.province,
        },
      };
    });
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: formattedAddresses,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
}

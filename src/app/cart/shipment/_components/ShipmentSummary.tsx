import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToRupiah } from "@/components/util/currency";

export default function ShipmentSummary({
  totalPrice,
}: {
  totalPrice: number;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>Shipment Summary</CardTitle>
        <Input type="text" placeholder="Do you have a promo code" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p>Total</p>
          <p className="font-bold">{ToRupiah(totalPrice)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

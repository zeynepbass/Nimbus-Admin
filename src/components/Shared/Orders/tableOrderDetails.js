"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Updated from "@/components/widgets/Updated";
import formatDate from "@/helper/formatDate"
export default function OrderDetailsClient({ order }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div ref={contentRef}>
        <Card>
          <CardHeader>
            <CardTitle>Sipariş Detayı</CardTitle>
            <CardDescription>{order.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><b>Müşteri:</b> {order.customerName}</p>
            <p><b>Tarih:</b> {formatDate(order.createdAt)}</p>
            <p><b>Toplam:</b>  ₺{order.totalPrice}</p>
            <p><b>Ödeme:</b>  {order.paymentMethod}</p>
            <Badge>{order.status}</Badge>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Ürünler</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ürün</TableHead>
                  <TableHead>Adet</TableHead>
                  <TableHead>Birim</TableHead>
                  <TableHead>Toplam</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>₺{item.price}</TableCell>
                    <TableCell>₺{item.price * item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-4 gap-1">
        <Button onClick={reactToPrintFn}>Faturayı Yazdır</Button>
        <Updated order={order}/>
      </div>
    </div>
  );
}

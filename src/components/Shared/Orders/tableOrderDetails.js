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
import {downloadOrderPDF} from "@/helper/pdf"
export default function OrderDetailsClient({ order }) {
  const contentRef = useRef(null);
  
  const reactToPrintFn = useReactToPrint({ contentRef });
  const handlePrintInvoice = () => {
    const invoiceData = {
      id: order.id,
      customerName: order.customerName,
      paymentMethod: order.paymentMethod,
      items: order.items,
      totalPrice: order.totalPrice,
      Durum: order.timeline?.length > 0 ? order.timeline[order.timeline.length - 1].label : "",
      createdAt: order.createdAt,
      printedAt: new Date().toISOString(),
    };

    const control = localStorage.getItem("lastInvoice");
    const invoices = control ? JSON.parse(control) : [];
    const alreadyId=invoices.some((item)=>item.id===invoiceData.id)
    if(!alreadyId){
      invoices.push(invoiceData);  
    localStorage.setItem(
      "lastInvoice",
      JSON.stringify(invoices)
    );
    }
     


    reactToPrintFn(); 
  };
  
  const statusStyle = {
    Tamamlandı: "bg-green-100 text-green-700",
    Beklemede: "bg-yellow-100 text-yellow-700",
    İptal: "bg-red-100 text-red-700",
  };
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
            <br/>
            <p><b>Zaman Çizelgesi</b></p>
            <div className="flex flex-row gap-4">
        {order.timeline.map((step, index) => (
          <div key={step.key} className="flex items-center gap-2">

            <span
              className={`h-3 w-3 rounded-full ${
                statusStyle[step.label] || "bg-gray-300"
              }`}
            />

            <div className="flex flex-col text-xs">
              <span className="font-medium">{step.label}</span>
              <span className="text-gray-400">
                {new Date(step.date).toLocaleString("tr-TR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
        
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
        <Button onClick={handlePrintInvoice}>Faturayı Yazdır</Button>
        <Button variant="outline" onClick={() => downloadOrderPDF(order)}>PDF İndir</Button>
        <Updated order={order}/>
      </div>
    </div>
  );
}

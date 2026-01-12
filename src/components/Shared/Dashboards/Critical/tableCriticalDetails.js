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

import { Button } from "@/components/ui/button";
import Updated from "@/components/widgets/Dashboards/Updated";
import formatDate from "@/helper/formatDate"
import {downloadDashboardPDF} from "@/helper/pdf"
export default function OrderDetailsClient({ order }) {
  const contentRef = useRef(null);
  
  const reactToPrintFn = useReactToPrint({ contentRef });
  const handlePrintInvoice = () => {
    const invoiceData = {
      id: order.id,
      name: order.name,
      categori: order.categori,
      price: order.price,
      stock: order.stock,
      criticalStock: order.criticalStock,
     sold:order.sold,
     status: order.status,
      createdAt: order.createdAt,
      printedAt: new Date().toISOString(),
    };

    const control = localStorage.getItem("dashboardsSummary");
    const invoices = control ? JSON.parse(control) : [];
    const alreadyId=invoices.some((item)=>item.id===invoiceData.id)
    if(!alreadyId){
      invoices.push(invoiceData);  
    localStorage.setItem(
      "dashboardsSummary",
      JSON.stringify(invoices)
    );
    }
     


    reactToPrintFn(); 
  };
  const totalPrice=order.sold * order.price
  const STATUS_STYLE = {
    "active": "bg-green-100 text-green-700",
    "out_of_stock": "bg-yellow-100 text-yellow-700",
    "critical": "bg-red-100 text-red-700"
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div ref={contentRef}>
        
        <Card>
          <CardHeader>
            <CardTitle>Ürün Detayı</CardTitle>
            <CardDescription>{order.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><b>Ürün Adı:</b> {order.name}</p>
            <p><b>Kategori:</b>  {order.category}</p>
            <p><b>Fiyat:</b>  {order.price}</p>
            <p><b>Stok:</b>  {order.stock}</p>
            <p><b>Kritik Stok:</b>  {order.criticalStock}</p>
            <p><b>Satılan Ürün Sayısı:</b>  {order.sold}</p>
     
           <p>
          <b>Durumu: </b> 
           <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${STATUS_STYLE[order.status]}`}
          >
      {order.status}
          </span>
 
            </p> 


            <p><b>Tarih:</b> {formatDate(order.createdAt)}</p>
            <p><b>Toplam:</b> {totalPrice}</p>
   
          </CardContent>
        </Card>


      </div>

      <div className="flex justify-end mt-4 gap-1">
        <Button onClick={handlePrintInvoice}>Faturayı Yazdır</Button>
        <Button variant="outline" onClick={() => downloadDashboardPDF(order)}>PDF İndir</Button>
        <Updated order={order}/>
      </div>
    </div>
  );
}

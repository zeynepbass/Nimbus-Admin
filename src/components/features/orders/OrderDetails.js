"use client";

import { DetailActions, DetailPage } from "@/components/common/DetailPage";
import InfoCard from "@/components/common/InfoCard";
import OrderEditSheet from "@/components/features/orders/OrderEditSheet";
import { saveInvoice } from "@/components/features/invoices/invoiceStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PAYMENT_LABELS, STATUS } from "@/constants/status";
import usePrint from "@/hooks/usePrint";
import { formatCurrency, formatDate } from "@/lib/format";
import { downloadOrderPDF } from "@/lib/pdf";
import { cn } from "@/lib/utils";

const formatStepDate = (date) =>
  new Date(date).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function OrderDetails({ order }) {
  const { contentRef, print } = usePrint();

  const handlePrint = () => {
    saveInvoice(order);
    print();
  };

  const fields = [
    { label: "Müşteri", value: order.customerName },
    { label: "Tarih", value: formatDate(order.createdAt) },
    { label: "Toplam", value: formatCurrency(order.totalPrice) },
    { label: "Ödeme", value: PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod },
  ];

  return (
    <DetailPage>
      <div ref={contentRef}>
        <InfoCard title="Sipariş Detayı" description={order.id} fields={fields}>
          <p className="mt-6 mb-2 font-bold">Zaman Çizelgesi</p>
          <div className="flex flex-row gap-4">
            {order.timeline.map((step) => (
              <div key={step.key} className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-3 w-3 rounded-full",
                    STATUS[step.key]?.className ?? "bg-gray-300"
                  )}
                />
                <div className="flex flex-col text-xs">
                  <span className="font-medium">{step.label}</span>
                  <span className="text-gray-400">{formatStepDate(step.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

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
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>{formatCurrency(item.price * item.quantity)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <DetailActions
        printLabel="Faturayı Yazdır"
        onPrint={handlePrint}
        onDownload={() => downloadOrderPDF(order)}
      >
        <OrderEditSheet order={order} />
      </DetailActions>
    </DetailPage>
  );
}

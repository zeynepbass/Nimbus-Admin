"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import  initialOrders from "@/data/orders.json"
import { useRouter } from "next/navigation";

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
const statusStyle = {
  completed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusText = {
  completed: "Tamamlandı",
  pending: "Beklemede",
  cancelled: "İptal",
};

export default function Page() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
const router=useRouter();
  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Siparişler</h2>

      <Input
        placeholder="Sipariş no veya müşteri ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm mb-4"
      />

      <div className="rounded-xl border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sipariş No</TableHead>
              <TableHead>Müşteri</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Toplam</TableHead>
              <TableHead>Ödeme Yöntemi</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Aksiyon</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="group relative">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.createdAt}</TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${statusStyle[order.status].split(" ")[0]}`}
                    ></span>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyle[order.status]}`}>
                      {statusText[order.status]}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="relative">
                  <button className="p-1 rounded hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4" />
                  </button>

         
                  <div className="absolute right-0 top-6 hidden group-hover:block w-28 bg-white border rounded shadow-md z-10">
                    <div>
                    <button
                      className="px-2 py-1 hover:bg-gray-100 cursor-pointer w-full text-left"
                      onClick={() => router.push(`/sales/orders/${order.id}`)}
                    >
                      Detay
                    </button>
                    </div>
                    <div>
                    <button
                      className="px-2 py-1 hover:bg-gray-100 cursor-pointer w-full text-left"
                      onClick={() => toast.error("Silindi")}
                    >

        Sil
        </button>
                    </div>
             

     
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2 mt-4 text-sm text-gray-500">
        <button className="px-2 py-1 rounded hover:bg-gray-100">«</button>
        <span>1 / 1</span>
        <button className="px-2 py-1 rounded hover:bg-gray-100">»</button>
      </div>
    </div>
  );
}

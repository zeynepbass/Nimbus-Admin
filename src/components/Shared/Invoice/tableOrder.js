

"use client";
import { useState } from "react";

import Table from "@/components/widgets/Table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import formatDate from "@/helper/formatDate"
 import { toast } from "sonner";

export default function Page() {
  const veri = JSON.parse(localStorage.getItem("lastInvoice") || "[]");

  const [orders, setOrders] = useState(veri);
  


  const handleClickDelete = (id) => {
    const updated = orders.filter((item) => item.id !== id);
  
    setOrders(updated);
    localStorage.setItem("lastInvoice", JSON.stringify(updated));
  
    toast.error("Silindi");
  };


 const columns = [

    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  

    {
      accessorKey: "id",
      header: "Sipariş No",
    },
  

    {
      accessorKey: "customerName",
      header: "Adı Soyadı",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("customerName")}</div>
      ),
    },
  

    {
      accessorKey: "createdAt",
      header: "Tarih",
      cell: ({ row }) => formatDate(row.getValue("createdAt")),
    },
  

    {
      accessorKey: "paymentMethod",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Ödeme
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="capitalize">{row.getValue("paymentMethod")}</span>
      ),
    },
  

    {
      accessorKey: "total",
      header: () => <div className="text-right">Toplam</div>,
      cell: ({ row }) => (
        <div className="text-right font-semibold">
          ₺{row.getValue("total")}
        </div>
      ),
    },
  

    {
      accessorKey: "status",
      header: "Durum",
      cell: ({ row }) => {
        const status = row.getValue("status")
  
        const statusStyle = {
          Tamamlandı: "bg-green-100 text-green-700",
          Beklemede: "bg-yellow-100 text-yellow-700",
          İptal: "bg-red-100 text-red-700",
        }
  
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyle[status]}`}
          >
            {status}
          </span>
        )
      },
    },
  

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const order = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksiyon</DropdownMenuLabel>
  
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order.id)}
              >
                Sipariş No Kopyala
              </DropdownMenuItem>
  
              <DropdownMenuSeparator />

  
              <DropdownMenuItem className="text-red-600"  onClick={() => handleClickDelete(order.id)}>
                İptal Et
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  

  return (
 <Table
  baslik="Faturalar"
  data={orders}
  columns={columns}
 />
  );
}

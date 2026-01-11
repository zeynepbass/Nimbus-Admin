

"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import Table from "@/components/widgets/Table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import formatDate from "@/helper/formatDate";


export default function Page() {

  const veri = JSON.parse(localStorage.getItem("lastInvoice") || "[]");

  const [orders, setOrders] = useState(veri);


  const totalCiro = useMemo(
    () => orders.reduce((sum, o) => sum + o.totalPrice, 0),
    [orders]
  );
  const completedCount = useMemo(
    () =>
      orders.filter((o) =>
        o.timeline.some((item) => item.key === "completed")
      ).length,
    [orders]
  );
  const pendingCount = useMemo(
    () =>
      orders.filter((o) =>
        o.timeline.some((item) => item.key === "pending")
      ).length,
    [orders]
  );



  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    toast.error("Sipariş iptal edildi");
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
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
        />
      ),
      enableSorting: false,
    },

    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
        Sipariş No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    {
      accessorKey: "customerName",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
        Ad Soyad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("customerName")}</span>
      ),
    },

    {
      accessorKey: "createdAt",

      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Tarih
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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
      accessorKey: "totalPrice",
      header: ({ column }) => (
        <Button
          variant="ghost"
          
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
Toplam
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <div className="text-center font-semibold">
          ₺{row.getValue("totalPrice")}
        </div>
      ),
    },

    {
      accessorKey: "timeline",
      header: "Zaman Çizelgesi",
      cell: ({ row }) => {
        const timeline = row.getValue("timeline");
        if (!timeline || timeline.length === 0) return null;
    
        const lastStep = timeline[timeline.length - 1]; 
    
        const STATUS_STYLE = {
          "Tamamlandı": "bg-green-100 text-green-700",
          "Beklemede": "bg-yellow-100 text-yellow-700",
          "İptal": "bg-red-100 text-red-700"
        };
    
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${STATUS_STYLE[lastStep.label] || ""}`}
          >
            {lastStep.label}
          </span>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original;

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
                onClick={() =>
                  navigator.clipboard.writeText(order.id)
                }
              >
                Sipariş No Kopyala
              </DropdownMenuItem>


              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDelete(order.id)}
              >
                İptal Et
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <Table
      baslik="Faturalar"
      data={orders}
      columns={columns}
      totalCiro={totalCiro}
      completedCount={completedCount}
      pendingCount={pendingCount}
    />
  );
}

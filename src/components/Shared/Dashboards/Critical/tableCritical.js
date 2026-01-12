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
import initialDashboards from "@/data/product";

export default function Page() {
  const router = useRouter();
  const [orders, setOrders] = useState(initialDashboards);


  const totalCiro = useMemo(
    () => orders.reduce((sum, o) => sum + o.price, 0),
    [orders]
  );

  const completedCount = useMemo(() => {
    return orders.reduce((sum, p) => sum + p.sold, 0);
  }, [orders]);
  
  const criticalCount = useMemo(() => {
    return orders.filter((p) => p.status === "critical").length;
  }, [orders]);
    



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
       Ürün No
           <ArrowUpDown className="ml-2 h-4 w-4" />
         </Button>
       ),
     },
 
     {
       accessorKey: "name",
 
       header: ({ column }) => (
         <Button
           variant="ghost"
           onClick={() =>
             column.toggleSorting(column.getIsSorted() === "asc")
           }
         >
        Ürün Adı
           <ArrowUpDown className="ml-2 h-4 w-4" />
         </Button>
       ),
       cell: ({ row }) => (
         <span className="font-medium">{row.getValue("name")}</span>
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
      accessorKey: "stock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
Stok
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <div className="text-center font-semibold">
          {row.getValue("stock")}
        </div>
      ),
    },
    {
      accessorKey: "criticalStock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
Kritik Stok
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <div className="text-center font-semibold">
          {row.getValue("criticalStock")}
        </div>
      ),
    },
    {
      accessorKey: "sold",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
Satılan Ürün Sayısı
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <div className="text-center font-semibold">
          {row.getValue("sold")}
        </div>
      ),
    },
     {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),

      cell: ({ row }) => {
   
      
        const status = row.getValue("status");
        const STATUS_STYLE = {
          "active": "bg-green-100 text-green-700",
          "out_of_stock": "bg-yellow-100 text-yellow-700",
          "critical": "bg-red-100 text-red-700"
        };
    
        return (
          <div className="flex items-center justify-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${STATUS_STYLE[status]}`}
          />
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${STATUS_STYLE[status]}`}
          >
            {status}
          </span>
        </div>
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
                 className="text-yellow-800"
                 onClick={() => router.push(`/dashboard/
critical/${order.id}`)}
               >
                 Detay Gör
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
         searchTitle="Ürün No ile filtrele..."
      baslik="Ürünler"
      data={orders}
      columns={columns}
      totalCiro={totalCiro}
      completedCount={["Satılan Toplam Ürün Sayısı","₺"+completedCount]}
      pendingCount={["Kritik Toplam Stok",criticalCount]}
    />
  );
}

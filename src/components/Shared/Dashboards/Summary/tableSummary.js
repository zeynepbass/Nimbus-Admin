"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Charts from "@/components/widgets/Charts/SalesChart";
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
import StatCard from "@/components/ui/statCard";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import formatDate from "@/helper/formatDate";
import initialDashboards from "@/data/product";
import PieChart from "@/components/widgets/Charts/PieChart";

export default function Page() {
  const router = useRouter();
  const [orders, setOrders] = useState(initialDashboards);

  /* -------------------- STATS -------------------- */

  const totalCiro = useMemo(() => {
    return orders.reduce((sum, o) => sum + o.price * o.sold, 0);
  }, [orders]);

  const activeCount = useMemo(() => {
    return orders.filter((p) => p.status === "active").length;
  }, [orders]);

  const criticalCount = useMemo(() => {
    return orders.filter((p) => p.stock <= p.criticalStock).length;
  }, [orders]);

  /* -------------------- ACTIONS -------------------- */

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    toast.error("Ürün silindi");
  };

  /* -------------------- TABLE COLUMNS -------------------- */

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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tarih
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => formatDate(row.getValue("createdAt")),
    },

    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fiyat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center font-semibold">
          ₺{row.getValue("price")}
        </div>
      ),
    },

    {
      accessorKey: "stock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stok
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    {
      accessorKey: "criticalStock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kritik Stok
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    {
      accessorKey: "sold",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Satılan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Durum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");

        const STATUS_STYLE = {
          active: "bg-green-100 text-green-700",
          out_of_stock: "bg-yellow-100 text-yellow-700",
          critical: "bg-red-100 text-red-700",
        };

        const STATUS_TEXT = {
          active: "Aktif",
          out_of_stock: "Stok Yok",
          critical: "Kritik",
        };

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[status]}`}
          >
            {STATUS_TEXT[status]}
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
                onClick={() => navigator.clipboard.writeText(order.id)}
              >
                Ürün No Kopyala
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/lastOrders/${order.id}`)}
              >
                Detay Gör
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDelete(order.id)}
              >
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Toplam Ürün" value={orders.length} />
      <StatCard title="Toplam Ciro" value={`₺${totalCiro}`} />
      <StatCard title="Aktif Ürünler" value={activeCount} />
      <StatCard title="Kritik Stok" value={criticalCount} />
    </div>
  

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-600 mb-4">
          Satış Grafiği
        </h3>
        <Charts orders={orders} />
      </div>
  

      <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-5">
        <Table
          baslik="Ürün Listesi"
          searchTitle="Ürün No ile filtrele..."
          data={orders}
          columns={columns}
        />
      </div>

    </div>
    <div className="grid grid-cols-1 xl:grid-cols-1 p-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <PieChart/>        <PieChart/>        <PieChart/>        <PieChart/>
        </div>
  
   

      </div>
  </div>
  
  );
}

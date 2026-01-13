"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Charts from "@/components/widgets/Charts/SalesChart";
import initialOrders from "@/data/orders";
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
import { SuppliersList } from "@/components/widgets/Dashboards/SuppliersList";
import { toast } from "sonner";
import formatDate from "@/helper/formatDate";
import initialDashboards from "@/data/product";
import suppliers from "@/data/supplier";
import { SeparatorDemo } from "@/components/widgets/Dashboards/Seperator";
import PieChart from "@/components/widgets/Charts/PieChart";
import { filterFns } from "@tanstack/react-table";

export default function Page() {
  const router = useRouter();
  const [orders, setOrders] = useState(initialDashboards);

  const getMostSoldProducts = (orders) => {
    const productMap = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productMap[item.productId]) {
          productMap[item.productId] = {
            productId: item.productId,
            productId: item.productId,
            price: item.price,
            name: item.name,
            totalQuantity: 0,
            totalRevenue: 0,
          };
        }

        productMap[item.productId].totalQuantity += item.quantity;
        productMap[item.productId].totalRevenue += item.price * item.quantity;
      });
    });

    return Object.values(productMap).sort(
      (a, b) => b.totalQuantity - a.totalQuantity
    );
  };
  const mostSoldProducts = getMostSoldProducts(initialOrders);

  const totalCiro = useMemo(() => {
    return orders.reduce((sum, o) => sum + o.price * o.sold, 0);
  }, [orders]);

  const activeCount = useMemo(() => {
    return orders.filter((p) => p.status === "active").length;
  }, [orders]);

  const criticalCount = useMemo(() => {
    return orders.filter((p) => p.stock <= p.criticalStock).length;
  }, [orders]);

  const handleDelete = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    toast.error("Ürün silindi");
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
  const filtreredName = suppliers.sort((a, b) => b.rating - a.rating);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="grid grid-cols-12 relative p-4 gap-4 bg-gray-50">
      <div className="col-span-12 relative h-40 xl:col-span-9  space-y-8 ">
      <div
  className=" h-40 rounded-xl bg-cover bg-center overflow-hidden"
  style={{
    backgroundImage: "url('/images/wave-haikei.png')",
  }}
>
 <img
    src="/images/curve-rafiki.png"
    alt="Welcome illustration"
    className="absolute -top-[80px] left-0 w-70 h-70 z-50  pointer-events-none"
  />



  <div className="relative z-10 h-full flex flex-col justify-center pl-75 pr-6">
    <span className="text-sm text-white/80">Hoş geldin 👋</span>

    <h2 className="text-xl md:text-2xl font-semibold text-white">
      {user.name}
    </h2>

    <p className="text-sm text-white/70 mt-1">
      <span className="font-bold text-xl">
        Doğru yoldasınız!
      </span>
      <br />
      Son faaliyetleriniz tutarlı ilerleme ve güçlü bir katılım gösteriyor.
      <br />
      Geliştirmeye, iyileştirmeye ve sınırlarınızı zorlamaya devam edin;
      sonuçlar giderek artıyor.
    </p>
  </div>
</div>


        <div className="space-y-8   min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Toplam Ürün" value={orders.length} />
            <StatCard title="Toplam Ciro" value={`₺${totalCiro}`} />
            <StatCard title="Aktif Ürünler" value={activeCount} />
            <StatCard title="Kritik Stok" value={criticalCount} />
          </div>

          <div className="bg-zinc-100 rounded-2xl shadow-sm">
            <h3 className="text-sm font-bold text-gray-600 mb-4">
              SATIŞ GRAFİĞİ
            </h3>
            <Charts orders={orders} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-zinc-100 rounded-2xl shadow-sm">
              <SuppliersList suppliers={filtreredName} />
            </div>

            <div className="bg-zinc-100 rounded-2xl shadow-sm p-5">
              <SeparatorDemo data={mostSoldProducts} />
            </div>
          </div>

          <div className="bg-zinc-100 rounded-2xl shadow-sm p-5">
            <Table
              baslik="ÜRÜN LİSTESİ"
              searchTitle="Ürün No ile filtrele..."
              data={orders}
              columns={columns}
            />
          </div>
        </div>
      </div>

      <div className="col-span-12 xl:col-span-3 space-y-6 ">
        <div className="bg-zinc-100 rounded-2xl shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-600 mb-4">
          ÜRÜN DETAY GRAFİĞİ
          </h3>
          <PieChart initialOrders={initialOrders} />
        </div>
      </div>
    </div>
  );
}

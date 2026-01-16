"use client";

import { useMemo } from "react";
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
import StatCard from "@/components/ui/statCard";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import stock from "@/data/product";
import formatDate from "@/helper/formatDate";

export default function Page({
  stocks,
  editingStock,
  stockValue,
  handleStockSave,
  setStockValue,
  setEditingStock,
}) {
  const router = useRouter();
  const orders = useMemo(
    () => stocks || stock.filter((item) => item.status === "critical"),
    [stocks || stock]
  );

  const totalCiro = useMemo(
    () => stocks || stock.reduce((sum, o) => sum + o.price, 0),
    [stocks || stock]
  );

  const completedCount = useMemo(() => {
    return stocks || stock.reduce((sum, p) => sum + p.sold, 0);
  }, [stocks || stock]);

  const criticalCount = useMemo(() => {
    return stocks || stock.filter((p) => p.status === "critical").length;
  }, [stocks || stock]);

  const handleDelete = (id) => {
    setStock((prev) => prev.filter((o) => o.id !== id));
    toast.error("İptal edildi");
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

      cell: ({ row }) => {
        const stock = row.original;

        return (
          <div className="text-center font-semibold">
            {editingStock === stock.id ? (
              <input
                autoFocus
                type="text"
                value={stockValue}
                onChange={(e) => setStockValue(e.target.value)}
                onBlur={() => handleStockSave(stock.id)}
                className="border px-2 py-1 rounded w-20 text-center"
              />
            ) : (
              <div className="flex items-center gap-2 justify-center">
                <span>{stock.stock}</span>
                {handleStockSave && (
              
                    <Pencil width="15" height="15"      onClick={() => {
                      setEditingStock(stock.id);
                      setStockValue(stock.stock);
                    }}/>

                )}
              </div>
            )}
          </div>
        );
      },
    },
    
    ...(!handleStockSave
      ? [
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
        ]
      : []),
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
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
                onClick={() => navigator.clipboard.writeText(order.id)}
              >
                No Kopyala
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-[#6C120B]"
                onClick={() =>
                  router.push(`/dashboard/
critical/${order.id}`)
                }
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
  const excelData = orders.map((p) => ({
    "Ürün No": p.id,
    "Ürün Adı": p.name,
    Kategori: p.category,
    Fiyat: p.price,
    Stok: p.stock,
    "Kritik Stok": p.criticalStock,
    Satılan: p.sold,
    Durum:
      p.status === "active"
        ? "Aktif"
        : p.status === "critical"
        ? "Kritik"
        : "Stok Yok",
    Tarih: formatDate(p.createdAt),
  }));
  return (
    <div className="p-6 space-y-8 ">
      {!handleStockSave && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Toplam Ürün Sayısı" value={orders.length} />
          <StatCard title="Toplam Ciro" value={`₺${totalCiro}`} />
          <StatCard title="Satılan Toplam Ürün Sayısı" value={completedCount} />
          <StatCard title="Kritik Toplam Stok" value={criticalCount} />
        </div>
      )}

      <Table
        searchTitle="Ürün No ile Filtrele Yöntemi"
        baslik={!handleStockSave ? "Kritik Stok Listesi" : "Stok ve Ürün Ayarları"}
        data={orders.slice().reverse()}
        excelData={excelData}
        columns={columns}
      />
    </div>
  );
}

import StatusBadge from "@/components/common/StatusBadge";
import { centered, sortableHeader } from "@/components/common/columns";
import { formatCurrency, formatDate } from "@/lib/format";
import { isCriticalStock } from "@/lib/products";

export const productColumns = {
  id: { accessorKey: "id", header: sortableHeader("Ürün No") },
  name: {
    accessorKey: "name",
    header: sortableHeader("Ürün Adı"),
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  category: {
    accessorKey: "category",
    header: sortableHeader("Kategori"),
    cell: ({ row }) => <span className="font-medium">{row.getValue("category")}</span>,
  },
  createdAt: {
    accessorKey: "createdAt",
    header: sortableHeader("Tarih"),
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  price: {
    accessorKey: "price",
    header: sortableHeader("Fiyat"),
    cell: ({ row }) => (
      <div className="text-center font-semibold">{formatCurrency(row.getValue("price"))}</div>
    ),
  },
  stock: {
    accessorKey: "stock",
    header: sortableHeader("Stok"),
    cell: ({ row }) => (
      <div
        className={`text-center font-semibold ${
          isCriticalStock(row.original) ? "text-red-600" : "text-gray-800"
        }`}
      >
        {row.getValue("stock")}
      </div>
    ),
  },
  criticalStock: centered("criticalStock", sortableHeader("Kritik Stok")),
  sold: centered("sold", sortableHeader("Satılan Ürün Sayısı")),
  status: {
    accessorKey: "status",
    header: sortableHeader("Durum"),
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} dot />,
  },
};

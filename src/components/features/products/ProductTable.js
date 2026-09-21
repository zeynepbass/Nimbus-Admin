"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/common/DataTable";
import { actionsColumn, copyAction, selectColumn } from "@/components/common/columns";
import { productColumns as col } from "@/components/features/products/productColumns";
import { toProductRows } from "@/components/features/products/productExcel";

export default function ProductTable({
  products,
  onDelete,
  title,
  searchPlaceholder = "Ürün No ile filtreleme yöntemi",
  exportable = false,
}) {
  const router = useRouter();

  const columns = [
    selectColumn,
    col.id,
    col.name,
    col.category,
    col.createdAt,
    col.price,
    col.stock,
    col.criticalStock,
    col.sold,
    col.status,
    actionsColumn((product) => [
      copyAction(product.id),
      {
        label: "Detay Gör",
        tone: "accent",
        onClick: () => router.push(`/dashboard/lastOrders/${product.id}`),
      },
      { label: "İptal Et", tone: "danger", onClick: () => onDelete(product.id) },
    ]),
  ];

  return (
    <DataTable
      title={title}
      searchPlaceholder={searchPlaceholder}
      data={products.toReversed()}
      columns={columns}
      exportRows={exportable ? toProductRows(products) : undefined}
    />
  );
}

"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import { actionsColumn, copyAction, selectColumn } from "@/components/common/columns";
import { productColumns as col } from "@/components/features/products/productColumns";
import { toProductRows } from "@/components/features/products/productExcel";
import { useRouter } from "next/navigation";

export default function StockSettings({ products, onStockChange, onDelete }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState(null);
  const [value, setValue] = useState("");

  const startEditing = (product) => {
    setEditingId(product.id);
    setValue(product.stock);
  };

  const commit = (id) => {
    onStockChange(id, Number(value));
    setEditingId(null);
    setValue("");
  };

  const stockColumn = {
    ...col.stock,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="text-center font-semibold">
          {editingId === product.id ? (
            <input
              autoFocus
              type="number"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onBlur={() => commit(product.id)}
              className="border px-2 py-1 rounded w-20 text-center"
            />
          ) : (
            <div className="flex items-center gap-2 justify-center">
              <span>{product.stock}</span>
              <Pencil
                width="15"
                height="15"
                className="cursor-pointer"
                onClick={() => startEditing(product)}
              />
            </div>
          )}
        </div>
      );
    },
  };

  const columns = [
    selectColumn,
    col.id,
    col.name,
    col.createdAt,
    stockColumn,
    col.status,
    actionsColumn((product) => [
      copyAction(product.id),
      {
        label: "Detay Gör",
        tone: "accent",
        onClick: () => router.push(`/dashboard/critical/${product.id}`),
      },
      { label: "İptal Et", tone: "danger", onClick: () => onDelete(product.id) },
    ]),
  ];

  return (
    <DataTable
      title="Stok ve Ürün Ayarları"
      searchPlaceholder="Ürün No ile filtreleme yöntemi"
      data={products.toReversed()}
      columns={columns}
      exportRows={toProductRows(products)}
    />
  );
}

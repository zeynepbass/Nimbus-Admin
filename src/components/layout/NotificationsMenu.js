"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import products from "@/data/product";
import { isCriticalStock } from "@/lib/products";

export default function NotificationsMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const criticalProducts = products.filter(isCriticalStock);

  return (
    <div className="relative">
      <button
        className="relative h-9 w-9 flex items-center justify-center"
        onClick={() => setOpen(!open)}
      >
        <Bell className="h-5 w-5 text-[#102E46]" />
        <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-[#6C120B] text-white rounded-full flex items-center justify-center">
          {criticalProducts.length}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-64 rounded-md border bg-background shadow-lg z-50">
          <div className="p-2 border-b text-sm font-semibold">Bildirimler</div>

          <ul className="space-y-2">
            {criticalProducts.toReversed().map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center px-4 py-2 text-sm"
              >
                <span className="font-medium text-gray-700">{product.name}</span>
                <span className="text-red-900 font-semibold">Stok: {product.stock}</span>
              </li>
            ))}
          </ul>

          <div
            className="p-2 border-t text-xs text-muted-foreground text-center cursor-pointer"
            onClick={() => router.push("/dashboard/critical")}
          >
            Stokları görüntüle
          </div>
        </div>
      )}
    </div>
  );
}

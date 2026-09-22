"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import products from "@/data/product";

const lowStockProducts = products.filter((product) => product.stock <= 10);

export default function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative h-9 w-9 flex items-center justify-center">
      <button onClick={() => setOpen(!open)} aria-label="Bildirimler">
        <Bell className="h-5 w-5 text-[#102E46]" />
      </button>

      <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-[#6C120B] text-white rounded-full flex items-center justify-center">
        {lowStockProducts.length}
      </span>

      {open && (
        <div className="absolute right-0 top-11 w-64 rounded-md border bg-background shadow-lg z-50">
          <div className="py-2 border-b text-sm font-semibold">Bildirimler</div>

          <ul className="space-y-2">
            {[...lowStockProducts].reverse().map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center px-4 py-2 text-sm cursor-pointer transition-colors"
              >
                <span className="font-medium text-gray-700">{product.name}</span>
                <span className="text-red-900 font-semibold">
                  Stok: {product.stock}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="p-2 border-t text-xs text-muted-foreground text-center cursor-pointer"
            onClick={() => router.push("/dashboard/lastOrders")}
          >
            Stokları görüntüle
          </div>
        </div>
      )}
    </div>
  );
}

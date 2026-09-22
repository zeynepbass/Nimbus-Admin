"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTE_LABELS = {
  dashboard: "Gösterge Paneli",
  sales: "Satışlar",
  summary: "Genel Özet",
  orders: "Siparişler",
  lastOrders: "Son Siparişler",
  invoices: "Faturalar",
  profile: "Profil",
  role: "Roller ve Yetkilendirmeler",
  settings: "Ayarlar",
  supplier: "Tedarikçiler",
  critical: "Kritik Stok",
  humanresources: "İnsan Kaynakları",
  employees: "Personel Listesi",
  leaves: "İzinler",
};

export default function Breadcrumb() {
  const segments = usePathname().split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-muted-foreground cursor-alias">
      <h5>Dashboard</h5>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label = ROUTE_LABELS[segment] ?? segment;

        return (
          <span key={href} className="flex items-center">
            <span className="mx-2">/</span>

            {index === segments.length - 1 ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routeMap= {
  dashboard: "Gösterge Paneli",
  orders: "Siparişler",
  sales:"Satışlar",
  summary:"Genel Özet",
  orders:"Siparişler",
  lastOrders:"Son Siparişler",
  invoices: "Faturalar",
  profile: "Profil",
  role: "Roller ve Yetkilendirmeler",
  settings: "Ayarlar",
  supplier: "Tedarikçiler",
  critical:"Kritik Stok",
  humanresources:"İnsan Kaynakları",
  employees:"Personel Listesi",
  leaves:"İzinler"
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-muted-foreground cursor-alias ">
    <h5>
    Dashboard
    </h5>



      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label = routeMap[segment] || segment;

        const isLast = index === segments.length - 1;

        return (
          <span key={href} className="flex items-center">
            <span className="mx-2">/</span>

            {isLast ? (
              <span className="font-medium text-foreground">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-foreground"
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

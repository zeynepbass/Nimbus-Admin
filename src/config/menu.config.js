
import {
    LayoutDashboard,
    ShoppingCart,
    Boxes,
    BarChart3,
    Shield,
    Settings,
    TrendingUp,
    Wallet,
    Truck,
  } from "lucide-react";
  
  export const menuConfig = [
    {
      id:"1",
      label: "Dashboard",
      roles: ["user"],
      icon: LayoutDashboard,
      children: [
        {
          label: "Genel Özet",
          icon: TrendingUp,
          href: "/dashboard/summary",
        },
        {
          label: "Son Siparişler",
          icon: ShoppingCart,
          href: "/dashboard/lastOrders",
        },
        {
          label: "Kritik Stok",
          icon: Boxes,
          href: "/dashboard/critical",
        },
      ],
    },
    {
      id:"2",
      label: "Satış Yönetimi",
      roles: ["user"],
      icon: ShoppingCart,
      children: [
        {
          label: "Siparişler",
          icon: Truck,
          href: "/sales/orders"
        },
        {
          label: "Faturalar",
          icon: Wallet,
          href: "/sales/invoices",
        },
      ],
    },
    {
      id:"3",
      label: "Raporlar",
      href: "/report",
      roles: ["user"],
      icon: BarChart3
    },
    {
      id:"4",
      label: "Kullanıcılar & Roller",
      href: "/users",
      icon: Shield,
      roles: ["admin"],
    },
    {
      id:"5",
      label: "Ayarlar",
      href: "/settings",
      roles: ["user"],
      icon: Settings
    },
  ];
  
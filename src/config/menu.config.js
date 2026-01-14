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
  User,
  Calendar,
  Package,
} from "lucide-react";

export const menuConfig = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["user"],
    children: [
      {
        label: "Genel Özet",
        icon: TrendingUp,
        href: "/dashboard/summary",
        roles: ["user"],
      },
      {
        label: "Son Siparişler",
        icon: ShoppingCart,
        href: "/dashboard/lastOrders",
        roles: ["user"],
      },
      {
        label: "Kritik Stok",
        icon: Boxes,
        href: "/dashboard/critical",
        roles: ["user"],
      },
    ],
  },

  {
    id: "sales",
    label: "Satış Yönetimi",
    icon: ShoppingCart,
    roles: ["user"],
    children: [
      {
        label: "Siparişler",
        icon: Truck,
        href: "/sales/orders",
        roles: ["user"],
      },
      {
        label: "Faturalar",
        icon: Wallet,
        href: "/sales/invoices",
        roles: ["user"],
      },
    ],
  },


  {
    id: "users",
    label: "Kullanıcılar & Roller",
    icon: Shield,
    href: "/users",
    roles: ["admin"],
  },

  {
    id: "suppliers",
    label: "Tedarikçiler",
    icon: Package,
    href: "/supplier",
    roles: ["user"],
  },

  {
    id: "hr",
    label: "İnsan Kaynakları",
    icon: User,
    roles: ["user"],
    children: [
      {
        label: "Personel Listesi",
        icon: User,
        href: "/humanresources/employees",
        roles: ["user"],
      },
      {
        label: "İzinler",
        icon: Calendar,
        href: "/humanresources/leaves",
        roles: ["user"],
      },
    ],
  },

  // {
  //   id: "reports",
  //   label: "Raporlar",
  //   icon: BarChart3,
  //   href: "/reports",
  //   roles: ["user"],
  // },
  {
    id: "settings",
    label: "Ayarlar",
    icon: Settings,
    href: "/settings",
    roles: ["user"],
  },
];

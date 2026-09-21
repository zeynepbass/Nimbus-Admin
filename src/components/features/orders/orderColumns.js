import StatusBadge from "@/components/common/StatusBadge";
import { sortableHeader } from "@/components/common/columns";
import { PAYMENT_LABELS } from "@/constants/status";
import { formatCurrency, formatDate } from "@/lib/format";
import { getLastStep } from "@/lib/orders";

export const orderColumns = {
  id: { accessorKey: "id", header: sortableHeader("Sipariş No") },
  customerName: {
    accessorKey: "customerName",
    header: sortableHeader("Ad Soyad"),
    cell: ({ row }) => <span className="font-medium">{row.getValue("customerName")}</span>,
  },
  createdAt: {
    accessorKey: "createdAt",
    header: sortableHeader("Tarih"),
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  paymentMethod: {
    accessorKey: "paymentMethod",
    header: sortableHeader("Ödeme"),
    cell: ({ row }) => {
      const method = row.getValue("paymentMethod");
      return <span>{PAYMENT_LABELS[method] ?? method}</span>;
    },
  },
  totalPrice: {
    accessorKey: "totalPrice",
    header: sortableHeader("Toplam"),
    cell: ({ row }) => (
      <div className="text-center font-semibold">{formatCurrency(row.getValue("totalPrice"))}</div>
    ),
  },
  timeline: {
    accessorKey: "timeline",
    header: "Zaman Çizelgesi",
    cell: ({ row }) => {
      const step = getLastStep(row.original);
      return step ? <StatusBadge status={step.key} label={step.label} dot /> : null;
    },
  },
};

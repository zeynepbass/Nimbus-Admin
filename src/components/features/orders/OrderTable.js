"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/common/DataTable";
import PageContainer from "@/components/common/PageContainer";
import StatGrid from "@/components/common/StatGrid";
import { actionsColumn, copyAction, selectColumn } from "@/components/common/columns";
import { orderColumns as col } from "@/components/features/orders/orderColumns";
import { toOrderRows } from "@/components/features/orders/orderExcel";
import ordersData from "@/data/orders";
import useList from "@/hooks/useList";
import { formatCurrency } from "@/lib/format";
import { hasStep } from "@/lib/orders";
import { sumBy } from "@/lib/stats";

export default function OrderTable() {
  const router = useRouter();
  const { items: orders, remove } = useList(ordersData);

  const stats = [
    { title: "Toplam Sipariş Sayısı", value: orders.length },
    { title: "Toplam Ciro", value: formatCurrency(sumBy(orders, (order) => order.totalPrice)) },
    { title: "Tamamlanan", value: orders.filter((order) => hasStep(order, "completed")).length },
    { title: "Bekleyen", value: orders.filter((order) => hasStep(order, "pending")).length },
  ];

  const columns = [
    selectColumn,
    col.id,
    col.customerName,
    col.createdAt,
    col.paymentMethod,
    col.totalPrice,
    col.timeline,
    actionsColumn((order) => [
      copyAction(order.id),
      {
        label: "Detay Gör",
        tone: "accent",
        onClick: () => router.push(`/sales/orders/${order.id}`),
      },
      { label: "İptal Et", tone: "danger", onClick: () => remove(order.id) },
    ]),
  ];

  return (
    <PageContainer>
      <StatGrid stats={stats} />
      <DataTable
        title="Siparişler Listesi"
        data={orders.toReversed()}
        columns={columns}
        exportRows={toOrderRows(orders)}
      />
    </PageContainer>
  );
}

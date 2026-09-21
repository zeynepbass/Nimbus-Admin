"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import PageContainer from "@/components/common/PageContainer";
import StatGrid from "@/components/common/StatGrid";
import { actionsColumn, copyAction, selectColumn } from "@/components/common/columns";
import { orderColumns as col } from "@/components/features/orders/orderColumns";
import { getInvoices } from "@/components/features/invoices/invoiceStorage";
import useList from "@/hooks/useList";
import { formatCurrency } from "@/lib/format";
import { hasStep } from "@/lib/orders";
import { sumBy } from "@/lib/stats";

export default function InvoiceTable() {
  const [initialInvoices] = useState(getInvoices);
  const { items: invoices, remove } = useList(initialInvoices);

  const stats = [
    { title: "Toplam Sipariş Sayısı", value: invoices.length },
    { title: "Toplam Ciro", value: formatCurrency(sumBy(invoices, (invoice) => invoice.totalPrice)) },
    { title: "Tamamlanan", value: invoices.filter((invoice) => hasStep(invoice, "completed")).length },
    { title: "Bekleyen", value: invoices.filter((invoice) => hasStep(invoice, "pending")).length },
  ];

  const columns = [
    selectColumn,
    col.id,
    col.customerName,
    col.createdAt,
    col.paymentMethod,
    col.totalPrice,
    col.timeline,
    actionsColumn((invoice) => [
      copyAction(invoice.id),
      { label: "İptal Et", tone: "danger", onClick: () => remove(invoice.id) },
    ]),
  ];

  return (
    <PageContainer className="space-y-0">
      <StatGrid stats={stats} />
      <DataTable title="Faturalar Listesi" data={invoices.toReversed()} columns={columns} />
    </PageContainer>
  );
}

"use client";

import DataTable from "@/components/common/DataTable";
import employees from "@/data/employees";
import { cn } from "@/lib/utils";

const ranked = employees.toSorted((a, b) => b.performanceScore - a.performanceScore);

const highlight = (row) => (row.index === 0 ? "text-[#6C120B]" : "");

const textColumn = (accessorKey, header, bold = false) => ({
  accessorKey,
  header,
  cell: ({ row }) => (
    <span className={cn(bold && "font-semibold", highlight(row))}>
      {row.getValue(accessorKey)}
    </span>
  ),
});

const columns = [
  {
    accessorKey: "performanceScore",
    header: "",
    cell: ({ row }) => (
      <span className={cn("font-semibold", highlight(row) || "text-green-600")}>
        ⭐ {row.getValue("performanceScore")}
      </span>
    ),
  },
  textColumn("id", "Personel No", true),
  textColumn("fullName", "Ad Soyad", true),
  textColumn("department", "Departman"),
  textColumn("position", "Pozisyon"),
];

export default function PerformanceTable() {
  return (
    <div className="h-80">
      <DataTable data={ranked} columns={columns} />
    </div>
  );
}

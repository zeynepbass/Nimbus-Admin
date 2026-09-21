"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import StatGrid from "@/components/common/StatGrid";
import StatusBadge from "@/components/common/StatusBadge";
import { actionsColumn } from "@/components/common/columns";
import LeaveForm from "@/components/features/leaves/LeaveForm";
import employeesData from "@/data/employees";
import useList from "@/hooks/useList";
import { formatDate } from "@/lib/format";
import { averageBy } from "@/lib/stats";

const EMPTY_FORM = {
  fullName: "",
  department: "",
  from: "",
  to: "",
  type: "Yıllık İzin",
  status: "active",
};

const toLeaveRows = (employees) =>
  employees.flatMap((employee) =>
    employee.leaveDates.map((leave) => ({
      id: employee.id,
      fullName: employee.fullName,
      department: employee.department,
      from: leave.from,
      to: leave.to,
      type: leave.type,
      status: employee.status,
    }))
  );

const staticColumns = [
  { accessorKey: "id", header: "Personel No" },
  {
    accessorKey: "fullName",
    header: "Ad Soyad",
    cell: ({ row }) => <span className="font-semibold">{row.getValue("fullName")}</span>,
  },
  { accessorKey: "department", header: "Departman" },
  {
    accessorKey: "from",
    header: "Başlangıç",
    cell: ({ row }) => formatDate(row.getValue("from")),
  },
  {
    accessorKey: "to",
    header: "Bitiş",
    cell: ({ row }) => formatDate(row.getValue("to")),
  },
  {
    accessorKey: "type",
    header: "İzin Türü",
    cell: ({ row }) => (
      <span className="px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs">
        {row.getValue("type")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
];

export default function LeaveTable({ editable = false }) {
  const { items: employees, update, remove } = useList(employeesData);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const leaves = toLeaveRows(employees);

  const stats = [
    { title: "Toplam Personel", value: employees.length },
    { title: "Aktif Personel", value: employees.filter((e) => e.status === "active").length },
    { title: "İzinde Olanlar", value: leaves.length },
    {
      title: "Ortalama Performans",
      value: averageBy(employees, (e) => e.performanceScore).toFixed(1),
    },
  ];

  const startEditing = (leave) => {
    setSelected(leave);
    setForm({
      fullName: leave.fullName,
      department: leave.department,
      from: leave.from,
      to: leave.to,
      type: leave.type,
      status: leave.status,
    });
  };

  const handleSave = () => {
    if (!selected) return;

    const employee = employees.find((item) => item.id === selected.id);

    update(selected.id, {
      leaveDates: [
        { ...employee.leaveDates[0], from: form.from, to: form.to, type: form.type },
      ],
      status: form.status,
    });
    setSelected(null);
  };

  const columns = [
    ...staticColumns,
    actionsColumn((leave) => [
      { label: "Personel Sil", onClick: () => remove(leave.id) },
      ...(editable
        ? [{ label: "Personel Güncelle", onClick: () => startEditing(leave) }]
        : []),
    ]),
  ];

  return (
    <div className="p-6 space-y-8">
      {!editable && <StatGrid stats={stats} />}

      {selected && <LeaveForm values={form} onChange={setForm} onSave={handleSave} />}

      <DataTable
        title="Personel İzin Listesi"
        searchPlaceholder="Personel No ile filtreleme yöntemi"
        data={leaves.toReversed()}
        columns={columns}
      />
    </div>
  );
}

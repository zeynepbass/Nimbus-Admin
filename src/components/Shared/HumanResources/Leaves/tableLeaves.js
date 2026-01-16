"use client";

import { useMemo, useState } from "react";
import FormLeavesSetting from "@/components/widgets/Employees/FormLeavesSetting";
import StatCard from "@/components/ui/statCard";
import Table from "@/components/widgets/Table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import formatDate from "@/helper/formatDate";
import initialEmployees from "@/data/employees";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

export default function Page() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [employees, setEmployees] = useState(initialEmployees);
  const pathname = usePathname();
  const isLeavesPage = pathname === "/humanresources/leaves";

  const [formLeaves, setFormLeaves] = useState({
    fullName: "",
    department: "",

    from: "",
    to: "",

    type: "",
    status: "",
  });

  const handleUpdatedUser = (user) => {
    setSelectedUser(user);
    setFormLeaves({
      fullName: user.fullName,
      department: user.department,
      from: user.from || "",
      to: user.to || "",
      type: user.type || "",
      status: user.status,
    });
  };

  const handleSaveUser = () => {
    setEmployees((prev) =>
      prev.map((item) =>
        item.id === selectedUser.id
          ? {
              ...item,
              leaveDates: [
                {
                  ...item.leaveDates[0],
                  from: formLeaves.from,
                  to: formLeaves.to,
                  type: formLeaves.type,
                },
              ],
              status: formLeaves.status,
            }
          : item
      )
    );

    setSelectedUser(null);
  };

  const leaves = useMemo(() => {
    return employees.flatMap((employee) =>
      employee.leaveDates.map((leave) => ({
        id: employee.id,
        fullName: employee.fullName,
        department: employee.department,
        from: leave.from,
        to: leave.to,
        type: leave.type,
        status: employee.status,
        performanceScore: employee.performanceScore,
      }))
    );
  }, [employees]);

  const handleDelete = (employeeId) => {
    setEmployees((prev) => prev.filter((e) => e.id !== employeeId));
    toast.error("iptal Edildi");
  };

  const totalEmployee = employees.length;

  const activeCount = useMemo(
    () => employees.filter((e) => e.status === "active").length,
    []
  );

  const onLeaveCount = leaves.length;

  const avgPerformance = useMemo(() => {
    const total = employees.reduce((sum, e) => sum + e.performanceScore, 0);
    return (total / employees.length).toFixed(1);
  }, []);

  const columns = [
    {
      accessorKey: "id",
      header: "Personel No",
    },
    {
      accessorKey: "fullName",
      header: "Ad Soyad",
      cell: ({ row }) => (
        <span className="font-semibold">{row.getValue("fullName")}</span>
      ),
    },
    {
      accessorKey: "department",
      header: "Departman",
    },
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
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {status === "active" ? "Aktif" : "Pasif"}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
              Personel Sil
            </DropdownMenuItem>
            {!isLeavesPage && (
              <DropdownMenuItem onClick={() => handleUpdatedUser(row.original)}>
                Personel Güncelle
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-8 ">
      {isLeavesPage && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Toplam Personel" value={totalEmployee} />
          <StatCard title="Aktif Personel" value={activeCount} />
          <StatCard title="İzinde Olanlar" value={onLeaveCount} />
          <StatCard title="Ortalama Performans" value={avgPerformance} />
        </div>
      )}
      <FormLeavesSetting
        selectedUser={selectedUser}
        formLeaves={formLeaves}
        setFormLeaves={setFormLeaves}
        handleSaveUser={handleSaveUser}
      />
      <Table
        baslik="Personel İzin Listesi"
        searchTitle="Personel No ile Filtreleme Yöntemi"
        data={leaves.slice().reverse()}
        columns={columns}
      />
    </div>
  );
}

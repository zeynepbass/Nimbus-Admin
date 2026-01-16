"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import StatCard from "@/components/ui/statCard";
import Table from "@/components/widgets/Table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import formatDate from "@/helper/formatDate";
import initialEmployees from "@/data/employees";
import Dialog from "@/components/widgets/Employees/Dialog";
export default function Page() {
  const router = useRouter();
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [open, setOpen] = useState(false);
  const totalEmployee = employees.length;

  const activeCount = useMemo(
    () => employees.filter((e) => e.status === "active").length,
    [employees]
  );

  const onLeaveCount = useMemo(
    () => employees.filter((e) => e.leaveDates?.length > 0).length,
    [employees]
  );

  const avgPerformance = useMemo(() => {
    const total = employees.reduce((sum, e) => sum + e.performanceScore, 0);
    return (total / employees.length).toFixed(1);
  }, [employees]);

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((o) => o.id !== id));
    toast.error("Sipariş iptal edildi");
  };

  const handleClick = (item) => {
    setSelectedEmployee(item);
    setOpen(true);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Personel No",
    },
    {
      accessorKey: "avatar",
      header: "Resim",
      cell: ({ row }) => (
        <Avatar className="mx-auto">
          <AvatarImage
            src={row.getValue("avatar")}
            alt={row.getValue("avatar")}
          />
        </Avatar>
      ),
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
      accessorKey: "position",
      header: "Pozisyon",
    },
    {
      accessorKey: "employment.startDate",
      header: "İşe Giriş",
      cell: ({ row }) => formatDate(row.original.employment.startDate),
    },
    {
      accessorKey: "phone",
      header: "Telefon",
    },
    {
      accessorKey: "performanceScore",
      header: "Performans",
      cell: ({ row }) => (
        <span className="font-semibold text-green-600">
          {row.getValue("performanceScore")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Durum",
      cell: ({ row }) => {
        const status = row.getValue("status");
        const STATUS_STYLE = {
          active: "bg-green-100 text-green-700",
          passive: "bg-gray-100 text-gray-600",
        };

        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${STATUS_STYLE[status]}`}
          >
            {status === "active" ? "Aktif" : "Pasif"}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const employees = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksiyon</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(employees.id)}
              >
                No Kopyala
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleClick(employees)}>
                Güncelle
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-[#6C120B]"
                onClick={() =>
                  router.push(`/humanresources/employees/${employees.id}`)
                }
              >
                Detay Gör
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDelete(employees.id)}
              >
                İptal Et
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    position: "",
    email: "",
    phone: "",
    address: { city: "", district: "", fullAddress: "" },
    education: { university: "", faculty: "", degree: "" },
    employment: {
      startDate: "",
      contractType: "",
      workType: "",
    },
    status: "active",
    performanceScore: 0,
  });

  const handleCreate = () => {
    const lastId =
      employees.length > 0
        ? parseInt(employees[employees.length - 1].id.split("-")[1])
        : 0;
    const newId = `P-${(lastId + 1).toString().padStart(3, "0")}`;

    const newEmployee = {
      id: newId,
      fullName: `${formData.firstName} ${formData.lastName}`,
      ...formData,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setEmployees((prev) => [...prev, newEmployee]);

    toast.success(`${newEmployee.fullName} eklendi!`);
  };

  const handleChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Toplam Personel" value={totalEmployee} />
        <StatCard title="Aktif Personel" value={activeCount} />
        <StatCard title="İzinde Olanlar" value={onLeaveCount} />
        <StatCard title="Ortalama Performans" value={avgPerformance} />
      </div>

      <Dialog
        open={open}
        setOpen={setOpen}
        employees={selectedEmployee}
        onSave={(updatedEmployee) => {
          const normalized = {
            ...updatedEmployee,
            fullName: `${updatedEmployee.firstName} ${updatedEmployee.lastName}`,
          };

          setEmployees((prev) =>
            prev.map((emp) => (emp.id === normalized.id ? normalized : emp))
          );
        }}
      />

      <Table
        setOpen={setOpen}
        formData={formData}
        handleChange={handleChange}
        handleCreate={handleCreate}
    
        searchTitle="Personel No ile Filtreleme Yöntemi"
        baslik="Personel Listesi"
        data={employees.slice().reverse()}
        columns={columns}
      />
    </div>
  );
}

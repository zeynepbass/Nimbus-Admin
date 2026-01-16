"use client";

import { useState } from "react";
import Table from "@/components/widgets/Table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import initialUser from "@/data/users";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Page() {

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: "Role No",
    },
    {
      accessorKey: "resim",
      header: "Resim",
      cell: ({ row }) => (
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.original.resim} />
        </Avatar>
      ),
    },
    {
      accessorKey: "name",
      header: "Ad Soyad",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => {
        const role = row.getValue("role");
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold ${
              role === "TEST"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {role}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
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
                onClick={() =>
                  navigator.clipboard.writeText(user.email)
                }
              >
                Email Kopyala
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUpdated(user.id)}>
                Güncelle
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDelete(user.id)}
              >
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredData = initialUser.filter((u) => u.role === "USER");
  const [users, setUsers] = useState(filteredData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    role: "USER",
    resim: null,
  });


  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.error("İptal edildi");
  };

  const handleCreateUser = () => {
    if (!formData.name || !formData.email) {
      toast.error("Ad ve Email zorunlu");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(), 
      name: formData.name,
      email: formData.email,
      tel: formData.tel,
      role: formData.role,
      resim: formData.resim
        ? URL.createObjectURL(formData.resim)
        : `https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 90
          )}.jpg`,
    };

    setUsers((prev) => [newUser, ...prev]);

    setFormData({
      name: "",
      email: "",
      tel: "",
      role: "USER",
      resim: null,
    });

    toast.success("Eklendi");
  };

  const handleChangeUser = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, resim: file }));
  };

  const handleUpdated = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: "TEST" } : u
      )
    );
    toast.success("Güncellendi");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Table
        baslik="Roller Listesi"
        searchTitle="Role No ile filtrele"
        data={users}
        columns={columns}
        formData={formData}
        handleChangeUser={handleChangeUser}
        handleCreateUser={handleCreateUser}
        handleImageChange={handleImageChange}
      />
    </div>
  );
}

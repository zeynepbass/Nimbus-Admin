"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import StatCard from "@/components/ui/statCard";
import Table from "@/components/widgets/Table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Dialog from "@/components/widgets/Supplier/Dialog";
import formatDate from "@/helper/formatDate"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import suppliersData from "@/data/supplier";

export default function Page() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState(suppliersData);

  const activeCount = useMemo(
    () => suppliers.filter((s) => s.status === "active").length,
    [suppliers]
  );

  const pausedCount = useMemo(
    () => suppliers.filter((s) => s.status !== "active").length,
    [suppliers]
  );

  const averageRating = useMemo(() => {
    if (suppliers.length === 0) return 0;
    const total = suppliers.reduce((sum, s) => sum + s.rating, 0);
    return (total / suppliers.length).toFixed(1);
  }, [suppliers]);

  const handleDelete = (id) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    toast.error("Tedarikçi silindi");
  };
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const handleClick = (item) => {
    setOpen(true);
    setData(item);
  };


  const supplierId = `SUP-${String(suppliers.length+1).padStart(3, "0")}`

  const [formData, setFormData] = useState({
    id: supplierId,
    name: "",
    companyType: "",
    contact: {
      person: "",
      email: "",
      phone: "",
    },
    address: {
      city: "",
      district: "",
      fullAddress: "",
    },
    products: [
      {
        productId: "",
        name: "",
        supplyPrice: "",
        minOrder: "",
        leadTimeDays: "",
      },
    ],
    rating: "",
    status: "",
    createdAt: new Date().toISOString(),
  })
  const handleChange = (path, value) => {
    setFormData(prev => {
      const keys = path.split(".")
      let updated = { ...prev }
      let current = updated
  
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }
  
      current[keys[keys.length - 1]] = value
      return updated
    })
  }
  
  const handleCreateSupplier = () => {
    setSuppliers(prev => [...prev, formData])
  }

  
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
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
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Firma No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-semibold">{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Firma Adı
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-semibold">{row.getValue("name")}</span>
      ),
    },

    {
      accessorKey: "contact.person",
      header: "Yetkili",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">
          {row.original.contact.person}
        </span>
      ),
    },

    {
      accessorKey: "address.city",
      header: "Şehir",
      cell: ({ row }) => row.original.address.city,
    },

    {
      header: "Ürün Sayısı",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.products.length}</span>
      ),
    },

    {
      accessorKey: "status",
      header: "Durum",
      cell: ({ row }) => {
        const status = row.getValue("status");

        const STYLE = {
          active: "bg-green-100 text-green-700",
          paused: "bg-yellow-100 text-yellow-700",
        };

        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              STYLE[status] || "bg-gray-100"
            }`}
          >
            {status === "active" ? "Aktif" : "Pasif"}
          </span>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const supplier = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksiyonlar</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => router.push(`/supplier/${supplier.id}`)}
              >
                Detayı Gör
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleClick(supplier)}>
                Güncelle
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDelete(supplier.id)}
              >
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const excelData = suppliers.map((s) => ({
    "Tedarikçi No": s.id,
    "Firma Adı": s.name,
    "Firma Türü": s.companyType,
  
    "Yetkili Kişi": s.contact?.person || "",
    "E-posta": s.contact?.email || "",
    "Telefon": s.contact?.phone || "",
  
    "Şehir": s.address?.city || "",
    "İlçe": s.address?.district || "",
    "Adres": s.address?.fullAddress || "",
  
    "Ürün Sayısı": s.products?.length || 0,
  
    "Ürünler": s.products
      ?.map(
        (p) =>
          `${p.name} | ₺${p.supplyPrice} | Min: ${p.minOrder} | ${p.leadTimeDays} gün`
      )
      .join(", "),
  
    "Puan": s.rating,
  
    "Durum": s.status === "active"
      ? "Aktif"
      : s.status === "paused"
      ? "Pasif"
      : s.status,
  
    "Kayıt Tarihi": formatDate(s.createdAt),
  }));
  
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Toplam Tedarikçi" value={suppliers.length} />
        <StatCard title="Aktif" value={activeCount} />
        <StatCard title="Pasif" value={pausedCount} />
        <StatCard title="Ortalama Puan" value={averageRating} />
      </div>
      <Dialog
        open={open}
        setOpen={setOpen}
        data={data}
        onSave={(updatedSupplier) => {
          setSuppliers((prev) =>
            prev.map((item) =>
              item.id === updatedSupplier.id ? updatedSupplier : item
            )
          );

          toast.success("Tedarikçi güncellendi");
          setOpen(false);
        }}
      />

      <Table
      excelData={excelData}
      handleCreateSupplier={handleCreateSupplier}
        searchTitle="Firma No ile Filtrele Yöntemi"
        baslik="Tedarikçiler Listesi"
        handleChange={handleChange}
        formData={formData}
        data={suppliers.slice().reverse()}
        columns={columns}
      />
    </div>
  );
}

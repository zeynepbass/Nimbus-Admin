"use client";

import { toast } from "sonner";
import FormSheet from "@/components/common/FormSheet";
import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useForm from "@/hooks/useForm";
import { formatCurrency } from "@/lib/format";
import { getProductRevenue } from "@/lib/products";

const toFormValues = (product) => ({
  name: product.name,
  category: product.category,
  price: product.price,
  stock: product.stock,
  criticalStock: product.criticalStock,
  sold: product.sold,
  status: product.status,
  createdAt: new Date(product.createdAt).toISOString().slice(0, 10),
});

const FIELDS = [
  { name: "name", label: "Ürün Adı" },
  { name: "category", label: "Kategori" },
  { name: "price", label: "Fiyat" },
  { name: "stock", label: "Stok" },
  { name: "criticalStock", label: "Kritik Stok" },
  { name: "sold", label: "Satılan Ürün Sayısı" },
  { name: "status", label: "Durum" },
];

export default function ProductEditSheet({ product }) {
  const { values, setValue } = useForm(toFormValues(product));

  const total = getProductRevenue({
    price: Number(values.price) || 0,
    sold: Number(values.sold) || 0,
  });

  const handleSave = () => toast.success("Kaydedildi!");

  return (
    <FormSheet
      title="Güncelle"
      description="Değişiklikler yapmak için buraya tıklayın. İşleminiz bittiğinde Kaydet'e tıklayın."
      onSave={handleSave}
      trigger={<Button variant="secondary">Güncelle</Button>}
    >
      <div className="grid flex-1 auto-rows-min gap-4 px-4 overflow-y-auto">
        {FIELDS.map(({ name, label }) => (
          <TextField
            key={name}
            label={label}
            value={values[name]}
            onChange={(value) => setValue(name, value)}
          />
        ))}
        <TextField
          label="Tarih"
          type="date"
          value={values.createdAt}
          onChange={(value) => setValue("createdAt", value)}
        />
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Toplam</p>
          <Input value={formatCurrency(total)} readOnly />
        </div>
      </div>
    </FormSheet>
  );
}

"use client";

import FormSheet from "@/components/common/FormSheet";
import TextField from "@/components/common/TextField";
import { EMPTY_SUPPLIER } from "@/components/features/suppliers/supplierForm";
import useForm from "@/hooks/useForm";

const STATUS_OPTIONS = [
  { value: "active", label: "Aktif" },
  { value: "paused", label: "Pasif" },
];

export default function SupplierCreateSheet({ onCreate }) {
  const { values, setValue, reset } = useForm(EMPTY_SUPPLIER);

  const handleSave = () => {
    onCreate(values);
    reset();
  };

  const field = (path, placeholder, current, extra = {}) => (
    <TextField
      placeholder={placeholder}
      value={current}
      onChange={(value) => setValue(path, value)}
      {...extra}
    />
  );

  return (
    <FormSheet
      title="Yeni Tedarikçi"
      description="Tedarikçi bilgilerini doldurun"
      onSave={handleSave}
    >
      <div className="grid grid-cols-1 gap-4 p-4">
        {field("name", "Firma Adı", values.name)}
        {field("companyType", "Firma Türü", values.companyType)}
        {field("contact.person", "Yetkili Kişi", values.contact.person)}
        {field("contact.email", "E-posta", values.contact.email)}
        {field("contact.phone", "Telefon", values.contact.phone)}
        {field("address.city", "Şehir", values.address.city)}
        {field("address.district", "İlçe", values.address.district)}
        {field("address.fullAddress", "Adres", values.address.fullAddress, {
          multiline: true,
          className: "[&_textarea]:resize-none",
        })}

        <div className="flex items-center gap-4 mt-1 justify-center">
          {STATUS_OPTIONS.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value={value}
                checked={values.status === value}
                onChange={(event) => setValue("status", event.target.value)}
                className="h-4 w-4 text-[#102E46] border-gray-300 focus:ring-2 focus:ring-[#628DD0]"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </FormSheet>
  );
}

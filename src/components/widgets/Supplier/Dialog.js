"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SupplierUpdateDialog({ open, setOpen, data, onSave }) {

  const [supplier, setSupplier] = useState(null);


  useEffect(() => {
    if (data) setSupplier(data);
  }, [data]);

  if (!supplier) return null;


  const handleChange = (field, value) => {
    setSupplier((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field, value) => {
    setSupplier((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  const handleAddressChange = (field, value) => {
    setSupplier((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };


  const handleSave = () => {
    if (onSave) onSave(supplier);
    setOpen(false); 

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tedarikçi Güncelle</DialogTitle>
          <DialogDescription>
            Tedarikçi bilgilerini düzenleyin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <label className="text-gray-500">Firma Adı</label>
            <input
              value={supplier.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Firma Türü</label>
            <input
              value={supplier.companyType}
              onChange={(e) => handleChange("companyType", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Yetkili</label>
            <input
              value={supplier.contact.person}
              onChange={(e) => handleContactChange("person", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Email</label>
            <input
              value={supplier.contact.email}
              onChange={(e) => handleContactChange("email", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Telefon</label>
            <input
              value={supplier.contact.phone}
              onChange={(e) => handleContactChange("phone", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Şehir</label>
            <input
              value={supplier.address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">İlçe</label>
            <input
              value={supplier.address.district}
              onChange={(e) => handleAddressChange("district", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Adres</label>
            <input
              value={supplier.address.fullAddress}
              onChange={(e) =>
                handleAddressChange("fullAddress", e.target.value)
              }
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              İptal
            </Button>

            <Button className="bg-[#6C120B] text-white" onClick={handleSave}>
              Kaydet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
import { toast } from "sonner";

export default function EmployeeUpdateDialog({
  open,
  setOpen,

  employees,
  onSave,
}) {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (employees) setEmployee(employees);
  }, [employees]);

  if (!employee) return null;

  const handleChange = (field, value) => {
    setEmployee((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field, value) => {
    setEmployee((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleEducationChange = (field, value) => {
    setEmployee((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value,
      },
    }));
  };

  const handleEmploymentChange = (field, value) => {
    setEmployee((prev) => ({
      ...prev,
      employment: {
        ...prev.employment,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    const updatedEmployee = {
      ...employee,
      fullName: `${employee.firstName} ${employee.lastName}`,
    };

    if (onSave) onSave(updatedEmployee);
    setOpen(false);
    toast("Güncellendi");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Personel Güncelle</DialogTitle>
          <DialogDescription>Personel bilgilerini düzenleyin</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <label className="text-gray-500">Ad</label>
            <input
              value={employee.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Soyad</label>
            <input
              value={employee.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Telefon</label>
            <input
              value={employee.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Departman</label>
            <input
              value={employee.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Pozisyon</label>
            <input
              value={employee.position}
              onChange={(e) => handleChange("position", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">E-posta</label>
            <input
              value={employee.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Şehir</label>
            <input
              value={employee.address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">İlçe</label>
            <input
              value={employee.address.district}
              onChange={(e) => handleAddressChange("district", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Çalışma Tipi</label>
            <input
              value={employee.employment.workType}
              onChange={(e) =>
                handleEmploymentChange("workType", e.target.value)
              }
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div>
            <label className="text-gray-500">Üniversite</label>
            <input
              value={employee.education.university}
              onChange={(e) =>
                handleEducationChange("university", e.target.value)
              }
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="text-gray-500">Fakülte</label>
            <input
              value={employee.education.faculty}
              onChange={(e) => handleEducationChange("faculty", e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div className="col-span-1">
          <label className="text-gray-500">Açık Adres</label>
          <textarea
            value={employee.address.fullAddress}
            onChange={(e) => handleAddressChange("fullAddress", e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            İptal
          </Button>
          <Button className="bg-[#6C120B] text-white" onClick={handleSave}>
            Kaydet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

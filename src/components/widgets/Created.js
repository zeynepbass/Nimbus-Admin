"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SheetDemo({ formData, handleChange, handleSave }) {
  return (
    <Sheet>

      <div className="flex justify-end mb-4">
        <SheetTrigger asChild>
          <Button className="bg-[#628DD0] text-white rounded-l px-4 py-2">
            + Ekle
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent size="lg">
        <SheetHeader>
          <SheetTitle>Yeni Personel Ekle</SheetTitle>
          <SheetDescription>
            Personel bilgilerini girin ve Kaydet'e tıklayın.
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-4 mt-4 p-4">

          <Input
            placeholder="Ad"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <Input
            placeholder="Soyad"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <Input
            placeholder="Departman"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
          />
          <Input
            placeholder="Pozisyon"
            value={formData.position}
            onChange={(e) => handleChange("position", e.target.value)}
          />
          <Input
            placeholder="E-posta"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            placeholder="Telefon"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />


          <Input
            placeholder="Şehir"
            value={formData.address.city}
            onChange={(e) => handleChange("address.city", e.target.value)}
          />
          <Input
            placeholder="İlçe"
            value={formData.address.district}
            onChange={(e) => handleChange("address.district", e.target.value)}
          />
          <Input
            placeholder="Açık Adres"
            value={formData.address.fullAddress}
            onChange={(e) => handleChange("address.fullAddress", e.target.value)}
            className="col-span-2"
          />


          <Input
            placeholder="Üniversite"
            value={formData.education.university}
            onChange={(e) => handleChange("education.university", e.target.value)}
          />
          <Input
            placeholder="Fakülte"
            value={formData.education.faculty}
            onChange={(e) => handleChange("education.faculty", e.target.value)}
          />
          <Input
            placeholder="Derece"
            value={formData.education.degree}
            onChange={(e) => handleChange("education.degree", e.target.value)}
          />


          <Input
            type="date"
            placeholder="İşe Başlama Tarihi"
            value={formData.employment.startDate}
            onChange={(e) => handleChange("employment.startDate", e.target.value)}
          />
          <Input
            placeholder="Çalışma Tipi"
            value={formData.employment.workType}
            onChange={(e) => handleChange("employment.workType", e.target.value)}
          />
        </div>

        <SheetFooter className="flex justify-between mt-6">
          <Button onClick={handleSave} className="bg-[#102E46]">
            Kaydet
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Çık</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

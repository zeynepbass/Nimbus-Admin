"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
          <SheetTitle>Yeni Tedarikçi</SheetTitle>
          <SheetDescription>
            Tedarikçi bilgilerini doldurun
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-1 gap-4  p-4">


          <Input
            placeholder="Firma Adı"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

   
          <Input
            placeholder="Firma Türü"
            value={formData.companyType}
            onChange={(e) => handleChange("companyType", e.target.value)}
          />

 
          <Input
            placeholder="Yetkili Kişi"
            value={formData.contact.person}
            onChange={(e) => handleChange("contact.person", e.target.value)}
          />


          <Input
            placeholder="E-posta"
            value={formData.contact.email}
            onChange={(e) => handleChange("contact.email", e.target.value)}
          />


          <Input
            placeholder="Telefon"
            value={formData.contact.phone}
            onChange={(e) => handleChange("contact.phone", e.target.value)}
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

 
          <Textarea
            placeholder="Adres"
            value={formData.address.fullAddress}
            onChange={(e) =>
              handleChange("address.fullAddress", e.target.value)
            }
            className="w-full resize-none"
          />


          <div className="flex items-center gap-4 mt-1 justify-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="active"
                checked={formData.status === "active"}
                onChange={(e) => handleChange("status", e.target.value)}
                className="h-4 w-4 text-[#102E46] border-gray-300 focus:ring-2 focus:ring-[#628DD0]"
              />
              <span>Aktif</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="paused"
                checked={formData.status === "paused"}
                onChange={(e) => handleChange("status", e.target.value)}
                className="h-4 w-4 text-[#102E46] border-gray-300 focus:ring-2 focus:ring-[#628DD0]"
              />
              <span>Pasif</span>
            </label>
          </div>
        </div>


        <SheetFooter className="mt-1 flex justify-between">
          <Button onClick={handleSave} className="bg-[#102E46]">
            Kaydet
          </Button>
          <SheetClose asChild>
            <Button variant="outline">İptal</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
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

export default function SheetDemo({
  formData,
  handleChangeUser,
  handleSave,
  handleImageChange,
}) {
  return (
    <Sheet>
      <div className="flex justify-end">
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

        <div className="grid grid-cols-1 gap-4 mt-4 p-4">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  formData.resim
                    ? URL.createObjectURL(formData.resim)
                    : undefined
                }
              />
              <AvatarFallback>{formData.name?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>

            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          <Input
            placeholder="Ad Soyad"
            value={formData.name}

            onChange={(e) => handleChangeUser("name",e.target.value)}
          />

          <Input
            placeholder="Email"

            value={formData.email}
            onChange={(e) => handleChangeUser("email",e.target.value)}
          />

          <Input
            placeholder="Telefon"
            value={formData.tel}

            onChange={(e) => handleChangeUser("tel",e.target.value)}
          />

          <Textarea
            placeholder="Adres"
            value={formData.adres}

            onChange={(e) => handleChangeUser("adres",e.target.value)}
            className="w-full resize-none"
          />
        </div>

        <SheetFooter className="flex justify-between mt-2">
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

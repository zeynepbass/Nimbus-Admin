"use client";

import { Button } from "@/components/ui/button";
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

export default function FormSheet({
  title,
  description,
  trigger,
  onSave,
  cancelLabel = "Çık",
  children,
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button className="bg-[#628DD0] text-white rounded-l px-4 py-2">
            + Ekle
          </Button>
        )}
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {children}

        <SheetFooter className="flex justify-between">
          <Button onClick={onSave} className="bg-[#102E46]">
            Kaydet
          </Button>
          <SheetClose asChild>
            <Button variant="outline">{cancelLabel}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

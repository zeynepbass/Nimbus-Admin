"use client";

import { useState, useEffect } from "react";
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
import { toast } from "sonner";
export default function SheetDemo({ order }) {
  const [items, setItems] = useState(order);
  const [total, setTotal] = useState(order.price);
  const [formData, setFormData] = useState({
    name: order.name,
    category: order.category,
    price: order.price,
    stock: order.stock,
    criticalStock: order.criticalStock,
    sold: order.sold,
    status: order.status,
    createdAt: new Date(order.createdAt).toISOString().slice(0, 10),
  });

ü

  useEffect(() => {
    const newTotal = items.price * items.sold;

    setTotal(newTotal);
  }, [items]);

  const handleDelete = (productId) => {
    const updatedItems = items.filter((i) => i.productId !== productId);
    setItems(updatedItems);
    toast.success("Ürün silindi / iade edildi!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const today = new Date();

    const isSameDate =
      new Date(formData.createdAt).toISOString().slice(0, 10) ===
      new Date(order.createdAt).toISOString().slice(0, 10);

    const payload = {
      ...formData,
      items,
      total,
      createdAt: isSameDate ? today : new Date(formData.createdAt),
    };

    console.log("Kaydedilecek veri:", payload);
    toast.success("Değişiklikler kaydedildi!");
  };


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Güncelle</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Güncelle</SheetTitle>
          <SheetDescription>
            Değişiklikler yapmak için buraya tıklayın. İşleminiz bittiğinde
            Kaydet'e tıklayın.
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <Input name="name" value={formData.name} onChange={handleChange} />

          <Input
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <Input name="price" value={formData.price} onChange={handleChange} />
          <Input name="stock" value={formData.stock} onChange={handleChange} />
          <Input
            name="criticalStock"
            value={formData.criticalStock}
            onChange={handleChange}
          />
          <Input name="sold" value={formData.sold} onChange={handleChange} />
          <Input
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
          />

          <Input value={total} readOnly />
        </div>

        <SheetFooter className="flex justify-between">
          <Button onClick={handleSave} className="bg-[#102E46]">Kaydet</Button>
          <SheetClose asChild>
            <Button variant="outline">Çık</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

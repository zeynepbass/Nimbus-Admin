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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
export default function SheetDemo({ order }) {

  const [items, setItems] = useState(
    order?.items.map((item) => ({ ...item, selectedQuantity: item.quantity }))
  );
  const [total, setTotal] = useState(order.totalPrice);
  const [formData, setFormData] = useState({
    customerName: order.customerName,
    paymentMethod: order.paymentMethod,
    createdAt: new Date(order.createdAt).toISOString().slice(0, 10),
  });
  
  const [openMenu, setOpenMenu] = useState(null);


  useEffect(() => {
    const newTotal = items.reduce(
      (sum, i) => sum + i.price * i.selectedQuantity,
      0
    );
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
      createdAt: isSameDate
        ? today
        : new Date(formData.createdAt),
    };
  
    console.log("Kaydedilecek veri:", payload);
    toast.success("Değişiklikler kaydedildi!");
  };
  
  const handleIncrease = (productId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              selectedQuantity: Math.min(
                item.selectedQuantity + 1,
                item.quantity 
              ),
            }
          : item
      )
    );
  };

  const handleDecrease = (productId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              selectedQuantity: Math.max(item.selectedQuantity - 1, 1),
            }
          : item
      )
    );
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
          <Input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />
      <Input
  type="date"
  name="createdAt"
  value={formData.createdAt}
  onChange={handleChange}
/>

          <Input value={total} readOnly />
          <Input
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          />

          <div className="overflow-x-auto max-h-64">
            <Table>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.name}</TableCell>

                    <TableCell className="flex items-center gap-2">
                      <button
                        className="px-2 bg-gray-200 rounded"
                        onClick={() => handleDecrease(item.productId)}
                      >
                        -
                      </button>
                      {item.selectedQuantity} {/* seçilen miktar */}
                      <button
                        className="px-2 bg-gray-200 rounded"
                        onClick={() => handleIncrease(item.productId)}
                      >
                        +
                      </button>
                    </TableCell>

                    <TableCell>₺{item.price}</TableCell>
                    <TableCell>₺{item.price * item.selectedQuantity}</TableCell>

                    <TableCell className="relative">
                      <button
                        className="p-1 rounded hover:bg-gray-100"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === item.productId ? null : item.productId
                          )
                        }
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {openMenu === item.productId && (
                        <div className="absolute right-0 top-6 w-28 bg-white border rounded shadow-md z-10">
                          <button
                            className="px-2 py-1 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleDelete(item.productId)}
                          >
                            İptal / İade
                          </button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

            <SheetFooter className="mt-1 flex justify-between">
          <Button onClick={handleSave} className="bg-[#102E46]">Kaydet</Button>
          <SheetClose asChild>
            <Button variant="outline">Çık</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

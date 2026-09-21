"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import FormSheet from "@/components/common/FormSheet";
import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useForm from "@/hooks/useForm";
import { formatCurrency } from "@/lib/format";
import { sumBy } from "@/lib/stats";

const StepButton = ({ children, ...props }) => (
  <button className="px-2 bg-gray-200 rounded" {...props}>
    {children}
  </button>
);

export default function OrderEditSheet({ order }) {
  const { values, setValue } = useForm({
    customerName: order.customerName,
    paymentMethod: order.paymentMethod,
    createdAt: new Date(order.createdAt).toISOString().slice(0, 10),
  });
  const [items, setItems] = useState(
    order.items.map((item) => ({ ...item, selectedQuantity: item.quantity }))
  );
  const [openMenu, setOpenMenu] = useState(null);

  const total = sumBy(items, (item) => item.price * item.selectedQuantity);

  const changeQuantity = (productId, delta) =>
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              selectedQuantity: Math.min(
                Math.max(item.selectedQuantity + delta, 1),
                item.quantity
              ),
            }
          : item
      )
    );

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
    setOpenMenu(null);
    toast.success("İptal edildi / iade edildi!");
  };

  const handleSave = () => toast.success("Kaydedildi!");

  return (
    <FormSheet
      title="Güncelle"
      description="Değişiklikler yapmak için buraya tıklayın. İşleminiz bittiğinde Kaydet'e tıklayın."
      onSave={handleSave}
      trigger={<Button variant="secondary">Güncelle</Button>}
    >
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <TextField
          placeholder="Müşteri"
          value={values.customerName}
          onChange={(value) => setValue("customerName", value)}
        />
        <TextField
          type="date"
          placeholder="Tarih"
          value={values.createdAt}
          onChange={(value) => setValue("createdAt", value)}
        />
        <Input value={formatCurrency(total)} readOnly />
        <TextField
          placeholder="Ödeme"
          value={values.paymentMethod}
          onChange={(value) => setValue("paymentMethod", value)}
        />

        <div className="overflow-x-auto max-h-64">
          <Table>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell>{item.name}</TableCell>

                  <TableCell className="flex items-center gap-2">
                    <StepButton onClick={() => changeQuantity(item.productId, -1)}>-</StepButton>
                    {item.selectedQuantity}
                    <StepButton onClick={() => changeQuantity(item.productId, 1)}>+</StepButton>
                  </TableCell>

                  <TableCell>{formatCurrency(item.price)}</TableCell>
                  <TableCell>{formatCurrency(item.price * item.selectedQuantity)}</TableCell>

                  <TableCell className="relative">
                    <button
                      className="p-1 rounded hover:bg-gray-100"
                      onClick={() =>
                        setOpenMenu(openMenu === item.productId ? null : item.productId)
                      }
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {openMenu === item.productId && (
                      <div className="absolute right-0 top-6 w-28 bg-white border rounded shadow-md z-10">
                        <button
                          className="px-2 py-1 hover:bg-gray-100 w-full text-left"
                          onClick={() => removeItem(item.productId)}
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
    </FormSheet>
  );
}

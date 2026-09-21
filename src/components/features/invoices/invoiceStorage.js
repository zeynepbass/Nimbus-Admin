import { STORAGE_KEYS } from "@/constants/storage";
import { readStorage, writeStorage } from "@/lib/storage";

export const getInvoices = () => readStorage(STORAGE_KEYS.INVOICES, []);

export function saveInvoice(order) {
  const invoices = getInvoices();

  if (invoices.some((invoice) => invoice.id === order.id)) return;

  writeStorage(STORAGE_KEYS.INVOICES, [
    ...invoices,
    {
      id: order.id,
      customerName: order.customerName,
      paymentMethod: order.paymentMethod,
      items: order.items,
      totalPrice: order.totalPrice,
      timeline: order.timeline,
      createdAt: order.createdAt,
      printedAt: new Date().toISOString(),
    },
  ]);
}

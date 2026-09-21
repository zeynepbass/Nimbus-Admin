import { PAYMENT_LABELS } from "@/constants/status";
import { formatDate } from "@/lib/format";
import { getLastStep } from "@/lib/orders";
import { sumBy } from "@/lib/stats";

export const toOrderRows = (orders) =>
  orders.map((order) => ({
    "Sipariş No": order.id,
    Müşteri: order.customerName,
    "Ürün Sayısı": sumBy(order.items, (item) => item.quantity),
    Ürünler: order.items.map((item) => `${item.name} (${item.quantity} adet)`).join(", "),
    "Toplam Tutar (₺)": order.totalPrice,
    "Ödeme Yöntemi": PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod,
    "Sipariş Durumu": getLastStep(order)?.label ?? "Bilinmiyor",
    "Sipariş Tarihi": formatDate(order.createdAt),
  }));

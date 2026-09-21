import { STATUS } from "@/constants/status";
import { formatDate } from "@/lib/format";

export const toProductRows = (products) =>
  products.map((product) => ({
    "Ürün No": product.id,
    "Ürün Adı": product.name,
    Kategori: product.category,
    Fiyat: product.price,
    Stok: product.stock,
    "Kritik Stok": product.criticalStock,
    Satılan: product.sold,
    Durum: STATUS[product.status]?.label ?? product.status,
    Tarih: formatDate(product.createdAt),
  }));

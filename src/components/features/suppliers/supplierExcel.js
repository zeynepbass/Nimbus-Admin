import { STATUS } from "@/constants/status";
import { formatDate } from "@/lib/format";

export const toSupplierRows = (suppliers) =>
  suppliers.map((supplier) => ({
    "Tedarikçi No": supplier.id,
    "Firma Adı": supplier.name,
    "Firma Türü": supplier.companyType,
    "Yetkili Kişi": supplier.contact?.person ?? "",
    "E-posta": supplier.contact?.email ?? "",
    Telefon: supplier.contact?.phone ?? "",
    Şehir: supplier.address?.city ?? "",
    İlçe: supplier.address?.district ?? "",
    Adres: supplier.address?.fullAddress ?? "",
    "Ürün Sayısı": supplier.products?.length ?? 0,
    Ürünler: (supplier.products ?? [])
      .map(
        (product) =>
          `${product.name} | ₺${product.supplyPrice} | Min: ${product.minOrder} | ${product.leadTimeDays} gün`
      )
      .join(", "),
    Puan: supplier.rating,
    Durum: STATUS[supplier.status]?.label ?? supplier.status,
    "Kayıt Tarihi": formatDate(supplier.createdAt),
  }));

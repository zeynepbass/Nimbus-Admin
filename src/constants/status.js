const GREEN = "bg-green-100 text-green-700";
const YELLOW = "bg-yellow-100 text-yellow-700";
const RED = "bg-red-100 text-red-700";
const GRAY = "bg-gray-100 text-gray-600";

export const STATUS = {
  active: { label: "Aktif", className: GREEN },
  passive: { label: "Pasif", className: GRAY },
  paused: { label: "Pasif", className: YELLOW },
  inactive: { label: "Pasif", className: RED },
  critical: { label: "Kritik", className: RED },
  out_of_stock: { label: "Stok Yok", className: YELLOW },
  completed: { label: "Tamamlandı", className: GREEN },
  pending: { label: "Beklemede", className: YELLOW },
  cancelled: { label: "İptal", className: RED },
};

export const FALLBACK_STATUS_STYLE = GRAY;

export const PAYMENT_LABELS = {
  credit_card: "Kredi Kartı",
  cash: "Nakit",
  transfer: "Havale",
};

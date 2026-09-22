export const TONES = {
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
  gray: "bg-gray-100 text-gray-600",
  blue: "bg-blue-100 text-blue-700",
};

export const PRODUCT_STATUS_LABEL = {
  active: "Aktif",
  out_of_stock: "Stok Yok",
  critical: "Kritik",
};

export const PRODUCT_STATUS_TONE = {
  active: "green",
  out_of_stock: "yellow",
  critical: "red",
};

export const ORDER_STEP_TONE = {
  Tamamlandı: "green",
  Beklemede: "yellow",
  İptal: "red",
};

export const ENTITY_STATUS_LABEL = {
  active: "Aktif",
  passive: "Pasif",
  paused: "Pasif",
  inactive: "Pasif",
};

export const ENTITY_STATUS_TONE = {
  active: "green",
  passive: "gray",
  paused: "yellow",
  inactive: "red",
};

export const PAYMENT_METHOD_LABEL = {
  credit_card: "Kredi Kartı",
  cash: "Nakit",
};

export const ROLE_TONE = {
  TEST: "red",
  USER: "blue",
};

export const LEAVE_TYPE_OPTIONS = [
  { value: "yillik", label: "Yıllık İzin" },
  { value: "mazeret", label: "Mazeret" },
  { value: "rapor", label: "Rapor" },
];

export const EMPLOYEE_STATUS_OPTIONS = [
  { value: "active", label: "Aktif" },
  { value: "passive", label: "Pasif" },
];

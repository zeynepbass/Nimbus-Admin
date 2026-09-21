import { formatDate } from "@/lib/format";

export const toEmployeeRows = (employees) =>
  employees.map((employee) => ({
    "Personel No": employee.id,
    Ad: employee.firstName,
    Soyad: employee.lastName,
    "Ad Soyad": employee.fullName,
    Departman: employee.department,
    Pozisyon: employee.position,
    "E-posta": employee.email,
    Telefon: employee.phone,
    Şehir: employee.address?.city ?? "",
    İlçe: employee.address?.district ?? "",
    Adres: employee.address?.fullAddress ?? "",
    Üniversite: employee.education?.university ?? "",
    Fakülte: employee.education?.faculty ?? "",
    "Eğitim Durumu": employee.education?.degree ?? "",
    "İşe Giriş Tarihi": formatDate(employee.employment?.startDate),
    "Sözleşme Türü": employee.employment?.contractType ?? "",
    "Çalışma Şekli": employee.employment?.workType ?? "",
    "İzin Sayısı": employee.leaveDates?.length ?? 0,
    İzinler: (employee.leaveDates ?? [])
      .map((leave) => `${formatDate(leave.from)} - ${formatDate(leave.to)} (${leave.type})`)
      .join(" / "),
    "Performans Puanı": employee.performanceScore ?? "-",
    Durum: employee.status === "active" ? "Aktif" : "Pasif",
    "Kayıt Tarihi": formatDate(employee.createdAt),
  }));

"use client";

import { DetailActions, DetailPage } from "@/components/common/DetailPage";
import InfoCard from "@/components/common/InfoCard";
import StatusBadge from "@/components/common/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePrint from "@/hooks/usePrint";
import { formatDate } from "@/lib/format";
import { downloadEmployeePDF } from "@/lib/pdf";

export default function EmployeeDetails({ employee }) {
  const { contentRef, print } = usePrint();

  return (
    <DetailPage className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          {employee.firstName} {employee.lastName}
        </h1>
        <p className="text-sm text-gray-500">
          {employee.id} – {employee.position} <StatusBadge status={employee.status} />
        </p>
      </div>

      <div ref={contentRef} className="space-y-6">
        <InfoCard
          title="Kişisel Bilgiler"
          description="Personelin temel bilgileri"
          fields={[
            { label: "Ad Soyad", value: `${employee.firstName} ${employee.lastName}` },
            { label: "Departman", value: employee.department },
            { label: "Pozisyon", value: employee.position },
            { label: "Performans", value: `⭐ ${employee.performanceScore}` },
          ]}
        />

        <InfoCard
          title="İletişim & Adres"
          description="Personelin iletişim bilgileri"
          fields={[
            { label: "Telefon", value: employee.phone },
            { label: "E-posta", value: employee.email },
            { label: "Şehir", value: employee.address.city },
            { label: "İlçe", value: employee.address.district },
            { label: "Açık Adres", value: employee.address.fullAddress, wide: true },
          ]}
        />

        <InfoCard
          title="Eğitim & İş Bilgileri"
          description="Eğitim geçmişi ve çalışma bilgileri"
          fields={[
            { label: "Üniversite", value: employee.education.university },
            { label: "Bölüm", value: employee.education.faculty },
            { label: "İşe Giriş", value: formatDate(employee.employment.startDate) },
            { label: "Çalışma Tipi", value: employee.employment.workType },
          ]}
        />

        <InfoCard title="İzin Geçmişi" description="Personelin kullandığı izinler">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlangıç</TableHead>
                <TableHead>Bitiş</TableHead>
                <TableHead>İzin Türü</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employee.leaveDates.map((leave) => (
                <TableRow key={`${leave.from}-${leave.to}`}>
                  <TableCell>{formatDate(leave.from)}</TableCell>
                  <TableCell>{formatDate(leave.to)}</TableCell>
                  <TableCell>{leave.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoCard>
      </div>

      <DetailActions onPrint={print} onDownload={() => downloadEmployeePDF(employee)} />
    </DetailPage>
  );
}

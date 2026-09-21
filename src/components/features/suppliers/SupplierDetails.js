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
import { formatCurrency, formatDate } from "@/lib/format";
import { downloadSupplierPDF } from "@/lib/pdf";

export default function SupplierDetails({ supplier }) {
  const { contentRef, print } = usePrint();

  return (
    <DetailPage className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{supplier.name}</h1>
        <p className="text-sm text-gray-500">
          {supplier.id} - <StatusBadge status={supplier.status} />
        </p>
      </div>

      <div ref={contentRef} className="space-y-6">
        <InfoCard
          title="Firma Bilgileri"
          description="Tedarikçiye ait temel bilgiler"
          fields={[
            { label: "Firma Türü", value: supplier.companyType },
            { label: "Yetkili", value: supplier.contact.person },
            { label: "Telefon", value: supplier.contact.phone },
            { label: "E-posta", value: supplier.contact.email },
          ]}
        />

        <InfoCard
          title="Adres & Meta"
          description="Konum ve sistem bilgileri"
          fields={[
            { label: "Şehir", value: supplier.address.city },
            { label: "İlçe", value: supplier.address.district },
            { label: "Puan", value: `⭐ ${supplier.rating}` },
            { label: "Kayıt Tarihi", value: formatDate(supplier.createdAt) },
            { label: "Açık Adres", value: supplier.address.fullAddress, wide: true },
          ]}
        />

        <InfoCard
          title="Tedarik Edilen Ürünler"
          description="Bu tedarikçiden temin edilen ürünler"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ürün</TableHead>
                <TableHead className="text-right">Tedarik Fiyatı</TableHead>
                <TableHead className="text-center">Min. Sipariş</TableHead>
                <TableHead className="text-center">Teslim Süresi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplier.products.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(product.supplyPrice)}
                  </TableCell>
                  <TableCell className="text-center">{product.minOrder}</TableCell>
                  <TableCell className="text-center">{product.leadTimeDays} gün</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoCard>
      </div>

      <DetailActions onPrint={print} onDownload={() => downloadSupplierPDF(supplier)} />
    </DetailPage>
  );
}

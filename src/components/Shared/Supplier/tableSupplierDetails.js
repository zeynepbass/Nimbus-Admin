"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {downloadSupplierPDF} from "@/helper/pdf";
import formatDate from "@/helper/formatDate";

export default function SupplierDetailsClient({ supplier }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const statusStyle = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    inactive: "bg-red-100 text-red-700"
  }


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6 max-w-5xl mx-auto space-y-6">

    
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{supplier.name}</h1>
            <p className="text-sm text-gray-500">{supplier.id} - <Badge className={statusStyle[supplier.status]}>
            {supplier.status === "active" ? "Aktif" : "Pasif"}
          </Badge></p>

          </div>

     
        </div>

        <div ref={contentRef} className="space-y-6">


          <Card>
            <CardHeader>
              <CardTitle>Firma Bilgileri</CardTitle>
              <CardDescription>
                Tedarikçiye ait temel bilgiler
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Firma Türü</p>
                <p className="font-medium">{supplier.companyType}</p>
              </div>

              <div>
                <p className="text-gray-500">Yetkili</p>
                <p className="font-medium">
                  {supplier.contact.person}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Telefon</p>
                <p className="font-medium">
                  {supplier.contact.phone}
                </p>
              </div>

              <div>
                <p className="text-gray-500">E-posta</p>
                <p className="font-medium">
                  {supplier.contact.email}
                </p>
              </div>
            </CardContent>
          </Card>

        
          <Card>
            <CardHeader>
              <CardTitle>Adres & Meta</CardTitle>
              <CardDescription>
                Konum ve sistem bilgileri
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Şehir</p>
                <p className="font-medium">
                  {supplier.address.city}
                </p>
              </div>

              <div>
                <p className="text-gray-500">İlçe</p>
                <p className="font-medium">
                  {supplier.address.district}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Puan</p>
                <p className="font-semibold text-lg">
                  ⭐ {supplier.rating}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Kayıt Tarihi</p>
                <p className="font-medium">
                  {formatDate(supplier.createdAt)}
                </p>
              </div>

              <div className="md:col-span-4">
                <p className="text-gray-500">Açık Adres</p>
                <p className="font-medium">
                  {supplier.address.fullAddress}
                </p>
              </div>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle>Tedarik Edilen Ürünler</CardTitle>
              <CardDescription>
                Bu tedarikçiden temin edilen ürünler
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ürün</TableHead>
                    <TableHead className="text-right">
                      Tedarik Fiyatı
                    </TableHead>
                    <TableHead className="text-center">
                      Min. Sipariş
                    </TableHead>
                    <TableHead className="text-center">
                      Teslim Süresi
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {supplier.products.map((product) => (
                    <TableRow key={product.productId}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₺{product.supplyPrice}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.minOrder}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.leadTimeDays} gün
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>


        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button onClick={reactToPrintFn} className="bg-[#6C120B]">
            Yazdır
          </Button>

          <Button
  variant="outline"
  onClick={() => downloadSupplierPDF(supplier)}
>
  PDF İndir
</Button>

        </div>
      </div>
    </div>
  );
}

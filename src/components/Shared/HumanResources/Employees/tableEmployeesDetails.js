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
import {downloadEmployeesPDF} from "@/helper/pdf"
import { Button } from "@/components/ui/button";
import formatDate from "@/helper/formatDate";

export default function UserDetailsClient({ user }) {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const statusStyle = {
    active: "bg-green-100 text-green-700",
    passive: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6 max-w-5xl mx-auto space-y-6">


        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h1>
            <p className="text-sm text-gray-500">
              {user.id} – {user.position}{" "}
              <Badge className={statusStyle[user.status]}>
                {user.status === "active" ? "Aktif" : "Pasif"}
              </Badge>
            </p>
          </div>
        </div>

        <div ref={contentRef} className="space-y-6">


          <Card>
            <CardHeader>
              <CardTitle>Kişisel Bilgiler</CardTitle>
              <CardDescription>
                Personelin temel bilgileri
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Ad Soyad</p>
                <p className="font-medium">{user.firstName} {user.lastName}</p>
              </div>

              <div>
                <p className="text-gray-500">Departman</p>
                <p className="font-medium">{user.department}</p>
              </div>

              <div>
                <p className="text-gray-500">Pozisyon</p>
                <p className="font-medium">{user.position}</p>
              </div>

              <div>
                <p className="text-gray-500">Performans</p>
                <p className="font-semibold text-lg">
                  ⭐ {user.performanceScore}
                </p>
              </div>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle>İletişim & Adres</CardTitle>
              <CardDescription>
                Personelin iletişim bilgileri
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Telefon</p>
                <p className="font-medium">{user.phone}</p>
              </div>

              <div>
                <p className="text-gray-500">E-posta</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-gray-500">Şehir</p>
                <p className="font-medium">{user.address.city}</p>
              </div>

              <div>
                <p className="text-gray-500">İlçe</p>
                <p className="font-medium">{user.address.district}</p>
              </div>

              <div className="md:col-span-4">
                <p className="text-gray-500">Açık Adres</p>
                <p className="font-medium">{user.address.fullAddress}</p>
              </div>
            </CardContent>
          </Card>

  
          <Card>
            <CardHeader>
              <CardTitle>Eğitim & İş Bilgileri</CardTitle>
              <CardDescription>
                Eğitim geçmişi ve çalışma bilgileri
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Üniversite</p>
                <p className="font-medium">
                  {user.education.university}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Bölüm</p>
                <p className="font-medium">
                  {user.education.faculty}
                </p>
              </div>

              <div>
                <p className="text-gray-500">İşe Giriş</p>
                <p className="font-medium">
                  {formatDate(user.employment.startDate)}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Çalışma Tipi</p>
                <p className="font-medium">
                  {user.employment.workType}
                </p>
              </div>
            </CardContent>
          </Card>

        
          <Card>
            <CardHeader>
              <CardTitle>İzin Geçmişi</CardTitle>
              <CardDescription>
                Personelin kullandığı izinler
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlangıç</TableHead>
                    <TableHead>Bitiş</TableHead>
                    <TableHead>İzin Türü</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {user.leaveDates.map((leave, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {formatDate(leave.from)}
                      </TableCell>
                      <TableCell>
                        {formatDate(leave.to)}
                      </TableCell>
                      <TableCell>
                        {leave.type}
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
                <Button variant="outline" onClick={() => downloadEmployeesPDF(user)}>
                      PDF İndir
                    </Button>
        </div>
      </div>
    </div>
  );
}

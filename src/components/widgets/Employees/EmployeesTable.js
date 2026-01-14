"use client";

import { useRouter } from "next/navigation";

import Table from "@/components/widgets/Table";


import initialEmployees from "@/data/employees";

export default function Page() {


const filtredDate=[...initialEmployees].sort((a,b)=>b.performanceScore-  a.performanceScore)
const columns = [
  {
    accessorKey: "performanceScore",
    header: "",
    cell: ({ row }) => (
      <span className={`font-semibold ${row.index === 0 ? "text-[#6C120B]" : "text-green-600"}`}>
        ⭐ {row.getValue("performanceScore")}
      </span>
    ),
  },
    {
      accessorKey: "id",
      header: "Personel No",
      cell: ({ row }) => (
        <span className={`font-semibold ${row.index === 0 ? "text-[#6C120B]" : ""}`}>
          {row.getValue("id")}
        </span>
      ),
    },
    
    {
      accessorKey: "fullName",
      header: "Ad Soyad",
      cell: ({ row }) => (
        <span className={`font-semibold ${row.index === 0 ? "text-[#6C120B]" : ""}`}>
          {row.getValue("fullName")}
        </span>
      ),
    },
    {
      accessorKey: "department",
      header: "Departman",
      cell: ({ row }) => (
        <span className={`${row.index === 0 ? "text-[#6C120B]" : ""}`}>
          {row.getValue("department")}
        </span>
      ),
    },
    {
      accessorKey: "position",
      header: "Pozisyon",
      cell: ({ row }) => (
        <span className={`${row.index === 0 ? "text-[#6C120B]" : ""}`}>
          {row.getValue("position")}
        </span>
      ),
    },

  ];
  

  return (
    <div className=" h-80">
      <Table
      dashboards={false}
        searchTitle="Personel No ile Filtreleme Yöntemi"
        baslik={null}
        data={filtredDate}
        columns={columns}
      />
    </div>
  );
}

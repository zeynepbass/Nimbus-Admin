// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { MoreVertical } from "lucide-react";
// import formatDate from "@/helper/formatDate";
// const statusStyle = {
//   Tamamlandı: "bg-green-100 text-green-700",
//   Beklemede: "bg-yellow-100 text-yellow-700",
//   İptal: "bg-red-100 text-red-700",
// };

// export default function Page({
//   baslik,
//   search,
//   setSearch,
//   filteredOrders,
//   headers,
//   button,
//   totalPrice,
// }) {
//   return (
//     <div className="p-6 space-y-4">
//       <h2 className="text-xl font-semibold">{baslik}</h2>
//       <div className="flex gap-1 justify-between">
//         <Input
//           placeholder="Sipariş no veya müşteri ara..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="max-w-sm mb-4"
//         />
//           <div className="flex items-center gap-2">
//           <span className="text-zinc-500">💰 ₺{totalPrice}</span>
//           <span className="text-zinc-500">📄 {filteredOrders.length}</span>

//             <span
//               className={`h-2 w-2 rounded-full ${
//                 statusStyle["Tamamlandı"].split(" ")[0]
//               }`}
//             ></span>
//             <span
//               className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyle["Tamamlandı"]}`}
//             >
//               {" "}
//               {
//                 filteredOrders.filter((order) => order.status === "Tamamlandı")
//                   .length
//               }{" "}
//             </span>
//             <span
//               className={`h-2 w-2 rounded-full ${
//                 statusStyle["Beklemede"].split(" ")[0]
//               }`}
//             ></span>
//             <span
//               className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyle["Beklemede"]}`}
//             >
//               {" "}
//               {
//                 filteredOrders.filter((order) => order.status === "Beklemede")
//                   .length
//               }{" "}
//             </span>
//             <span
//               className={`h-2 w-2 rounded-full ${
//                 statusStyle["İptal"].split(" ")[0]
//               }`}
//             ></span>
//             <span
//               className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyle["İptal"]}`}
//             >
//               {" "}
//               {
//                 filteredOrders.filter((order) => order.status === "İptal")
//                   .length
//               }{" "}
//             </span>
//         </div>
//       </div>

//       <div className="rounded-xl border bg-background">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               {headers.map((item) => {
//                 return <TableHead key={item}>{item}</TableHead>;
//               })}
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {filteredOrders.map((order) => (
//               <TableRow key={order.id} className="group relative">
//                 <TableCell className="font-medium">{order.id}</TableCell>
//                 <TableCell>{order.customerName}</TableCell>
//                 <TableCell>{formatDate(order.createdAt)}</TableCell>
//                 <TableCell>{order.totalPrice} TL</TableCell>
//                 <TableCell>{order.paymentMethod}</TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-2">
//                     <span
//                       className={`h-2 w-2 rounded-full ${
//                         statusStyle[order.status].split(" ")[0]
//                       }`}
//                     ></span>
//                     <span
//                       className={`px-2 py-1 rounded-md text-xs font-medium ${
//                         statusStyle[order.status]
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 </TableCell>
//                 <TableCell className="relative">
//                   <button className="p-1 rounded hover:bg-gray-100">
//                     <MoreVertical className="h-4 w-4" />
//                   </button>

//                   <div className="absolute right-0 top-6 hidden group-hover:block w-28 bg-white border rounded shadow-md z-10">
//                     {button.map((item) => {
//                       return (
//                         <div key={item.id}>
//                           <button
//                             className="px-2 py-1 hover:bg-gray-100 cursor-pointer w-full text-left"
//                             onClick={() => item.onClick(order.id)}
//                           >
//                             {item.baslik}
//                           </button>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex justify-end gap-2 mt-4 text-sm text-gray-500">
//         <button className="px-2 py-1 rounded hover:bg-gray-100">«</button>
//         <span>1 / 1</span>
//         <button className="px-2 py-1 rounded hover:bg-gray-100">»</button>
//       </div>
//     </div>
//   );
// }

"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"





export default function DataTableDemo({data,columns,baslik}) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="w-full">
      <h1>{baslik}</h1>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Adı Soyadı Yöntemi..."
          value={table.getColumn("customerName")?.getFilterValue() ?? ""}
          onChange={(e) =>
            table.getColumn("customerName")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Veri bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

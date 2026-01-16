"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import Created from "@/components/widgets/Created";
import CreatedUser from "@/components/widgets/User/Created";
import CreatedSupplier from "@/components/widgets/Supplier/CreatedSupplier";
import { Button } from "@/components/ui/button";
import { exportToExcel } from "@/helper/exportExcel";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataTableDemo({
  searchTitle,
  handleCreateSupplier,
  handleCreateUser,
  handleImageChange,
  handleCreate,
  handleChange,
  formData,
  excelData,
  handleChangeUser,
  handleUpdated,
  data,
  columns,
  baslik,
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

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
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1>{baslik}</h1>
        {baslik && (
          <div className="flex gap-1 py-3">
            <Input
              placeholder={searchTitle || "Sipariş No ile filtreleme yöntemi"}
              value={table.getColumn("id")?.getFilterValue() ?? ""}
              onChange={(e) =>
                table.getColumn("id")?.setFilterValue(e.target.value)
              }
              className="w-xs"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Filtrele <ChevronDown />
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
            {excelData && !handleUpdated && (
              <Button
                className="bg-[#6C120B] text-white"
                onClick={() => exportToExcel(excelData, "excel")}
              >
                Excel İndir
              </Button>
            )}

            {handleCreate && (
              <Created
                formData={formData}
                handleChange={handleChange}
                handleSave={handleCreate}
              />
            )}
            {handleCreateSupplier && (
              <CreatedSupplier
                formData={formData}
                handleChange={handleChange}
                handleSave={handleCreateSupplier}
              />
            )}

            {handleUpdated ? (
              <CreatedUser
                formData={formData}
                handleImageChange={handleImageChange}
                handleChangeUser={handleChangeUser}
                handleSave={handleUpdated}
              />
            ) : handleCreateUser ? (
              <CreatedUser
                formData={formData}
                handleImageChange={handleImageChange}
                handleChangeUser={handleChangeUser}
                handleSave={handleCreateUser}
              />
            ) : null}
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
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
                    <TableCell key={cell.id} className="text-center">
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

      <div className="flex justify-end gap-2 py-2">
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
  );
}

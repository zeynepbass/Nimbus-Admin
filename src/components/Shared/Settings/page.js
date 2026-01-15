"use client";
import { useState } from "react";
import Table from "@/components/widgets/Table";
import {SuppliersList} from "@/components/widgets/Dashboards/SuppliersList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Stock from "@/components/Shared/Dashboards/Critical/tableCritical";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import initialUser from "@/data/users"
import initialSuppliers from "@/data/supplier"
import stock from "@/data/product"
export default function TabsDemo() {
    const filteredData=initialUser.filter((item)=>item.role=="USER")
  const [users, setUser] = useState(filteredData);

  const handleDelete = (id) => {
    setUser((prev) => prev.filter((o) => o.id !== id));
    toast.error("Sipariş iptal edildi");
  };

  const column = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
        />
      ),
      enableSorting: false,
    },

    {
      accessorKey: "id",
      header: "Role No",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("id")}</span>
      ),
    },

    {
        accessorKey: "resim",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Resim
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center justify-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.resim} />
  
              </Avatar>
  
            </div>
          );
        },
      },
      {
          accessorKey: "name",
          header: "Ad Soyad",
          cell: ({ row }) => <span>{row.getValue("name")}</span>,
        },

    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.getValue("email")}
        </span>
      ),
    },



    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => {
        const role = row.getValue("role");

        const ROLE_STYLE = {
          TEST: "bg-red-100 text-red-700",
          USER: "bg-blue-100 text-blue-700",
        };

        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold ${
              ROLE_STYLE[role] || ""
            }`}
          >
            {role}
          </span>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksiyon</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.email)}
              >
                Email Kopyala
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleUpdated(user.id)}
              >
                Güncelle
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDelete(user.id)}
              >
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
        />
      ),
      enableSorting: false,
    },

    {
      accessorKey: "id",
      header: "Kullanıcı No",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("id")}</span>
      ),
    },

    {
      accessorKey: "resim",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Resim
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center justify-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.resim} />

            </Avatar>

          </div>
        );
      },
    },
    {
        accessorKey: "name",
        header: "Ad Soyad",
        cell: ({ row }) => <span>{row.getValue("name")}</span>,
      },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.getValue("email")}
        </span>
      ),
    },

    {
      accessorKey: "tel",
      header: "Telefon",
      cell: ({ row }) => <span>{row.getValue("tel")}</span>,
    },
    {
        accessorKey: "adres",
        header: "Adres",
        cell: ({ row }) => <span>{row.getValue("adres")}</span>,
      },
  

    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksiyon</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.email)}
              >
                Email Kopyala
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDelete(user.id)}
              >
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    adres: "",
    tel: "",
    role: "USER",
    resim: null,
  });

  const handleCreateUser = () => {
    const data=users.reduce((sum,item)=>item.id+sum,0)
    const newUser = {
      id: data,
      name: formData.name,
      email: formData.email,
      tel: formData.tel,
      role: formData.role,
      resim: formData.resim
        ? URL.createObjectURL(formData.resim)
        : `https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 90
          )}.jpg`,
    };

    setUser((prev) => [newUser, ...prev]);

    setFormData({
        adres:"",
      name: "",
      email: "",
      tel: "",
      role: "USER",
      resim: null,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      resim: file,
    }));
  };

  const handleUpdated = (id) => {
    setUser((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, role: "TEST" }
          : item
      )
    );
  };
  
  const handleChangeUser = (field, value) => {

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    
  };
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [editingId, setEditingId] = useState(null);
  const [rating, setRating] = useState("");
  

  
  const handleSupplierSave = (id) => {
    setSuppliers((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, rating: rating }
          : item
      )
    );
  
    setEditingId(null);
  };
  const [stocks, setStock] = useState(stock);
  const [editingStock, setEditingStock] = useState(null);
  const [stockValue, setStockValue] = useState("");
  const handleStockSave = (id) => {
    setStock((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stock: Number(stockValue) }
          : item
      )
    );
  
    setEditingStock(null);
    setStockValue("");
  };
  
  
  return (
    <div className="flex w-full  flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Kullanıcılar</TabsTrigger>
          <TabsTrigger value="role">Roller ve Yetkilendirmeler</TabsTrigger>
          <TabsTrigger value="supplier">Tedarikçiler</TabsTrigger>
          <TabsTrigger value="stock">Stok ve Ürün Ayarı</TabsTrigger>
          <TabsTrigger value="leaves">İzinler</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Table
            handleCreateUser={handleCreateUser}
            formData={formData}
            handleChangeUser={handleChangeUser}
            searchTitle="Kullanıcı No ile filtreleme yöntemi"
            baslik="Kullanıcılar Listesi"
            data={users.slice().reverse()}
            columns={columns}
            handleImageChange={handleImageChange}
          />
        </TabsContent>
        <TabsContent value="role">
        <Table
            handleCreateUser={handleCreateUser}
            formData={formData}
            handleChangeUser={handleChangeUser}
            handleUpdated={handleUpdated}
            searchTitle="Role No ile filtreleme yöntemi"
            baslik="Roller Listesi"
            data={users.slice().reverse()}
            columns={column}
            handleImageChange={handleImageChange}
          />
        </TabsContent>
        <TabsContent value="supplier">
        <SuppliersList suppliers={suppliers} editingId={editingId} setEditingId={setEditingId} rating={rating} setRating={setRating} handleSave={handleSupplierSave}/>
        </TabsContent>
        <TabsContent value="stock">
        <Stock stocks={stocks} 
          editingStock={editingStock}
          setEditingStock={setEditingStock}
          setStock={setStock}
          setStockValue={setStockValue}
          handleStockSave={handleStockSave}/>
        </TabsContent>
        <TabsContent value="leaves">
          <Card>
            <CardHeader>
              <CardTitle>Roller ve Yetkilendirmeler</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

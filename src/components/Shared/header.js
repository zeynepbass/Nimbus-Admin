"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { BarChart3, Bell, Moon, Sun, User, Settings } from "lucide-react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Breadcrumb from "../widgets/Breadcrumb";
import { getLastLogin } from "@/helper/last-login";
import product from "@/data/product";

const Header = () => {
  const [open, setOpen] = useState(false);

  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(false);
  const [lastLogin, setLastLogin] = useState(null);
  useEffect(() => {
    setLastLogin(getLastLogin());
  }, []);

  const router = useRouter();
  const filteredStock = product.filter((item) => item.stock <= 10);

  return (
    <>
      <header className="flex  items-center justify-between w-full h-14  border-b ">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div>
            <span className="text-sm font-semibold tracking-wide">
              ERP Dashboard
            </span>
            <span>
              {lastLogin && (
                <div className="text-xs text-muted-foreground mt-1">
                  Son giriş:{" "}
                  <span className="font-medium text-foreground">
                    Bugün {lastLogin.time}
                  </span>
                  {" · "}
                  {lastLogin.browser}
                </div>
              )}
            </span>
          </div>
        </div>

        <div className="relative flex pr-3 items-center gap-3">
          <Command className="relative text-[#102E46]">
            <CommandInput
              placeholder="Search… (⌘K)"
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              className="w-56 placeholder:text-[#102E46] "
            />
            {open &&
              createPortal(
                <CommandList
                  className="
        fixed
        top-16
        right-40
        w-64
        rounded-md
        border
        bg-background
        shadow-lg
        z-[9999]
        
        
      "
                >
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Hızlı Erişim">
                    <CommandItem
                      onSelect={() => router.push("/dashboard/summary")}
                    >
                      Gösterge Paneli
                    </CommandItem>

                    <CommandItem onSelect={() => router.push("/sales/orders")}>
                      Siparişler
                    </CommandItem>

                    <CommandItem
                      onSelect={() => router.push("/sales/invoices")}
                    >
                      Faturalar
                    </CommandItem>
                    <CommandItem
                      onSelect={() => router.push("/humanresources/employees")}
                    >
                      Personel Listesi
                    </CommandItem>
                    <CommandItem
                      onSelect={() => router.push("/humanresources/leaves")}
                    >
                      İzinler
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Ayarlar">
                    <CommandItem onSelect={() => router.push("/settings")}>
                      <User className="mr-2 h-4 w-4" />
                      Profil
                    </CommandItem>

                    <CommandItem onSelect={() => router.push("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Ayarlar
                    </CommandItem>
                  </CommandGroup>
                </CommandList>,
                document.body
              )}
          </Command>

          <button
            onClick={() => window.open("https://app.powerbi.com/", "_blank")}
            className="h-9 w-9 flex items-center justify-center text-[#102E46] "
            title="Power BI Reports"
          >
            <BarChart3 className="h-5 w-5 " />
          </button>

          <button className="relative  h-9 w-9 flex items-center justify-center ">
            <Bell
              className="h-5 w-5 text-[#102E46]"
              onClick={() => setUser(!user)}
            />
            <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-[#6C120B] text-white rounded-full flex items-center justify-center">
              {filteredStock.length}
            </span>
            {user && (
              <div className="absolute right-0 top-11 w-64 rounded-md border bg-background shadow-lg z-50">
                <div className=" py-2 border-b text-sm font-semibold">
                  Bildirimler
                </div>

                <ul className="space-y-2">
                  {filteredStock
                    .slice()
                    .reverse()
                    .map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center px-4 py-2 text-sm  cursor-pointer transition-colors"
                      >
                        <span className="font-medium text-gray-700">
                          {item.name}
                        </span>
                        <span className="text-red-900 font-semibold">
                          Stok: {item.stock}
                        </span>
                      </li>
                    ))}
                </ul>

                <div
                  className=" py-2 p-2 border-t text-xs text-muted-foreground text-center cursor-pointer"
                  onClick={() => router.push("/dashboard/lastOrders")}
                >
                  Stokları görüntüle
                </div>
              </div>
            )}
          </button>

          {/* <button
            onClick={() => setDark(!dark)}
            className="h-9 w-9 flex items-center justify-center pr-3 "
          >
            {dark ? (
              <Sun className="h-5 w-5 text-[#102E46]" />
            ) : (
              <Moon className="h-5 w-5 text-[#102E46]" />
            )}
          </button> */}
        </div>
      </header>
      <div className="flex justify-end py-3 px-3 bg-gray-50">
        <Breadcrumb />
      </div>
    </>
  );
};

export default Header;

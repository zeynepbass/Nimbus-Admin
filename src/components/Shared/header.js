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

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(false);
  const [lastLogin, setLastLogin] = useState(null);
  useEffect(() => {
    setLastLogin(getLastLogin());
  }, []);

  const router = useRouter();

  return (
    <>
      <header className="flex   bg-gray-100 items-center justify-between w-full h-14 px-4 border-b ">
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

        <div className="relative flex items-center gap-3">
          <Command className="relative">
            <CommandInput
              placeholder="Search… (⌘K)"
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              className="w-56"
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
                    <CommandItem onSelect={() => router.push("/dashboard")}>
                      Gösterge Paneli
                    </CommandItem>

                    <CommandItem onSelect={() => router.push("/orders")}>
                      Siparişler
                    </CommandItem>

                    <CommandItem onSelect={() => router.push("/invoices")}>
                      Faturalar
                    </CommandItem>
                  </CommandGroup>

                  <CommandSeparator />

                  <CommandGroup heading="Ayarlar">
                    <CommandItem onSelect={() => router.push("/profile")}>
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
            className="h-9 w-9 flex items-center justify-center "
            title="Power BI Reports"
          >
            <BarChart3 className="h-5 w-5" />
          </button>

          <button className="relative h-9 w-9 flex items-center justify-center ">
            <Bell className="h-5 w-5" onClick={() => setUser(!user)} />
            <span className="absolute -top-1 -right-1 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
              3
            </span>
            {user && (
              <div className="absolute right-0 top-11 w-64 rounded-md border bg-background shadow-lg z-50">
                <div className=" py-2 border-b text-sm font-semibold">
                  Bildirimler
                </div>

                <ul className="max-h-60 ">
                  <li className=" text-left px-2 py-2 text-sm hover:bg-muted cursor-pointer">
                    🚨 Hatalı giriş denemesi (user@gmail.com)
                  </li>
                  <li className=" text-left px-2 py-2 text-sm hover:bg-muted cursor-pointer">
                    🚨 Hatalı giriş denemesi (user@gmail.com)
                  </li>
                  <li className=" text-left px-2 py-2 text-sm hover:bg-muted cursor-pointer">
                    🚨 Hatalı giriş denemesi (user@gmail.com)
                  </li>
                </ul>

                <div className=" py-2 border-t text-xs text-muted-foreground text-center">
                  Tüm bildirimleri görüntüle
                </div>
              </div>
            )}
          </button>

          <button
            onClick={() => setDark(!dark)}
            className="h-9 w-9 flex items-center justify-center "
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>
      <div className="flex justify-end py-3 px-3">
        <Breadcrumb />
      </div>
    </>
  );
};

export default Header;

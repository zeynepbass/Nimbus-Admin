"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Settings, User } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const QUICK_LINKS = [
  { label: "Gösterge Paneli", href: "/dashboard/summary" },
  { label: "Siparişler", href: "/sales/orders" },
  { label: "Faturalar", href: "/sales/invoices" },
  { label: "Personel Listesi", href: "/humanresources/employees" },
  { label: "İzinler", href: "/humanresources/leaves" },
];

const SETTINGS_LINKS = [
  { label: "Profil", href: "/settings", icon: User },
  { label: "Ayarlar", href: "/settings", icon: Settings },
];

export default function SearchCommand() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Command className="relative text-[#102E46]">
      <CommandInput
        placeholder="Ara…"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="w-56 placeholder:text-[#102E46]"
      />

      {open &&
        createPortal(
          <CommandList className="fixed top-16 right-40 w-64 rounded-md border bg-background shadow-lg z-[9999]">
            <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>

            <CommandGroup heading="Hızlı Erişim">
              {QUICK_LINKS.map(({ label, href }) => (
                <CommandItem key={href} onSelect={() => router.push(href)}>
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Ayarlar">
              {SETTINGS_LINKS.map(({ label, href, icon: Icon }) => (
                <CommandItem key={label} onSelect={() => router.push(href)}>
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>,
          document.body
        )}
    </Command>
  );
}

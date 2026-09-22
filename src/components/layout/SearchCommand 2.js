"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { quickLinkGroups } from "@/config/quickLinks.config";

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Command className="relative text-[#102E46]">
      <CommandInput
        placeholder="Search… (⌘K)"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="w-56 placeholder:text-[#102E46]"
      />

      {open &&
        createPortal(
          <CommandList className="fixed top-16 right-40 w-64 rounded-md border bg-background shadow-lg z-9999">
            <CommandEmpty>No results found.</CommandEmpty>

            {quickLinkGroups.map(({ heading, links }, index) => (
              <div key={heading}>
                {index > 0 && <CommandSeparator />}
                <CommandGroup heading={heading}>
                  {links.map(({ label, href, icon: Icon }) => (
                    <CommandItem key={label} onSelect={() => router.push(href)}>
                      {Icon && <Icon className="mr-2 h-4 w-4" />}
                      {label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ))}
          </CommandList>,
          document.body
        )}
    </Command>
  );
}

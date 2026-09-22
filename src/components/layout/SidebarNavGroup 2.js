import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const ICON_CLASS = "text-[#102E46]";

export default function SidebarNavGroup({ group, isOpen, onToggle }) {
  const Icon = group.icon;
  const label = (
    <span className="group-data-[collapsible=icon]:hidden">{group.label}</span>
  );

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          {group.children ? (
            <SidebarMenuButton tooltip={group.label} onClick={onToggle}>
              <Icon className={ICON_CLASS} />
              {label}
              <ChevronDown
                className={cn(
                  "ml-auto transition group-data-[collapsible=icon]:hidden",
                  isOpen && "rotate-180"
                )}
              />
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton tooltip={group.label} asChild>
              <Link href={group.href}>
                <Icon className={ICON_CLASS} />
                {label}
              </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>

        {isOpen &&
          group.children?.map(({ label: childLabel, href, icon: ChildIcon }) => (
            <SidebarMenuItem
              key={childLabel}
              className="ml-8 group-data-[collapsible=icon]:hidden"
            >
              <SidebarMenuButton asChild>
                <Link href={href}>
                  <ChildIcon className={ICON_CLASS} />
                  <span>{childLabel}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

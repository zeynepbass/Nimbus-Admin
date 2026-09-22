"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import NotificationsMenu from "@/components/layout/NotificationsMenu";
import SearchCommand from "@/components/layout/SearchCommand";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getLastLogin } from "@/helper/lastLogin";

const POWER_BI_URL = "https://app.powerbi.com/";

export default function Header() {
  const [lastLogin] = useState(getLastLogin);

  return (
    <>
      <header className="flex items-center justify-between w-full h-14 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div>
            <span className="text-sm font-semibold tracking-wide">
              ERP Dashboard
            </span>
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
          </div>
        </div>

        <div className="relative flex pr-3 items-center gap-3">
          <SearchCommand />

          <button
            onClick={() => window.open(POWER_BI_URL, "_blank")}
            className="h-9 w-9 flex items-center justify-center text-[#102E46]"
            title="Power BI Reports"
          >
            <BarChart3 className="h-5 w-5" />
          </button>

          <NotificationsMenu />
        </div>
      </header>

      <div className="flex justify-end py-3 px-3 bg-gray-50">
        <Breadcrumb />
      </div>
    </>
  );
}

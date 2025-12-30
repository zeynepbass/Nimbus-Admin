"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronsUpDown, Plus } from "lucide-react"

const teams = [
  { name: "Acme Inc", plan: "Enterprise" },
  { name: "Acme Corp.", plan: "Startup" },
  { name: "Evil Corp.", plan: "Free" },
]

export function TeamSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-muted">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white">
            A
          </div>

          <div className="flex flex-col text-left">
            <span className="text-sm font-medium">Acme Inc</span>
            <span className="text-xs text-muted-foreground">
              Enterprise
            </span>
          </div>

          <ChevronsUpDown className="ml-auto h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {teams.map((team) => (
          <DropdownMenuItem key={team.name}>
            {team.name}
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          Add team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

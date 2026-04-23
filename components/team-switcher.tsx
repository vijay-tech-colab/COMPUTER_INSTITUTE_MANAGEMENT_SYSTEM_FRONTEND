"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, Building2, Sparkles } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl transition-all duration-200 hover:bg-primary/5 group"
            >
              <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                <activeTeam.logo className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-bold tracking-tight text-foreground">
                  {activeTeam.name}
                </span>
                <span className="truncate text-[10px] uppercase font-black tracking-widest text-muted-foreground/70">
                  {activeTeam.plan}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-2xl border-border/40 bg-background/95 backdrop-blur-md p-2 shadow-2xl"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={10}
          >
            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-primary/70 flex items-center gap-2">
              <Building2 className="h-3 w-3" />
              Campuses
            </DropdownMenuLabel>
            <div className="space-y-1">
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className={cn(
                    "gap-3 p-2.5 rounded-xl transition-all cursor-pointer",
                    activeTeam.name === team.name ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted"
                  )}
                >
                  <div className={cn(
                    "flex size-8 items-center justify-center rounded-lg border border-border/50",
                    activeTeam.name === team.name ? "bg-primary text-white" : "bg-background"
                  )}>
                    <team.logo className="size-4 shrink-0" />
                  </div>
                  <div className="flex-1">
                     <p className="text-sm">{team.name}</p>
                     <p className="text-[10px] text-muted-foreground">{team.plan}</p>
                  </div>
                  <DropdownMenuShortcut className="text-[10px] font-bold">⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator className="my-2 bg-border/40" />
            <DropdownMenuItem className="gap-3 p-2.5 rounded-xl cursor-not-allowed group/add">
              <div className="flex size-8 items-center justify-center rounded-lg border border-dashed border-border/60 bg-muted/50 group-hover/add:bg-primary/5 transition-colors">
                <Plus className="size-4 text-muted-foreground" />
              </div>
              <div className="font-bold text-xs text-muted-foreground flex items-center gap-2">
                 Add Campus
                 <Sparkles className="h-3 w-3 text-primary animate-pulse" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

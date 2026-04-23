import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"
import { Bell, Search, Settings, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border/40 bg-background/80 backdrop-blur-md px-4 sticky top-0 z-30 transition-all">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
               <SidebarTrigger className="-ml-1 h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-all" />
               <Separator orientation="vertical" className="h-4 opacity-50" />
            </div>
            <DynamicBreadcrumb />
          </div>

          {/* Right Side - Search & Notifications */}
          <div className="flex items-center gap-4">
            <div className="hidden relative lg:flex items-center group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 rounded-xl border-border/50 bg-muted/40 pl-9 pr-10 h-9 text-xs placeholder:text-muted-foreground/60 transition-all duration-300 focus:w-80 focus:border-primary/30 focus:bg-background focus:shadow-md"
              />
              <div className="absolute right-2 px-1.5 py-0.5 rounded border border-border/60 bg-muted text-[10px] font-bold text-muted-foreground pointer-events-none flex items-center gap-0.5">
                 <Command className="h-2.5 w-2.5" /> K
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 group border border-transparent hover:border-primary/10"
              >
                <Bell className="h-4 w-4 transition-transform duration-200 group-hover:rotate-[15deg]" />
                <span className="absolute top-2.5 right-2.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
              </Button>

              <Separator orientation="vertical" className="h-4 opacity-30" />

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 group border border-transparent hover:border-primary/10"
              >
                <Settings className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-6 overflow-auto scroll-smooth">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

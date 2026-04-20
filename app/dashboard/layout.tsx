import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb"
import { Bell, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border/50 bg-background/95 backdrop-blur-sm px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          {/* Left Side */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 opacity-50" />
            <DynamicBreadcrumb />
          </div>

          {/* Right Side - Search & Notifications */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden relative md:flex items-center">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search anything..."
                className="w-56 rounded-full border-border/60 bg-muted/60 pl-9 pr-4 h-8 text-sm placeholder:text-muted-foreground/60 transition-all duration-300 focus:w-72 focus:border-primary/40 focus:bg-background focus:shadow-sm"
              />
            </div>

            <Separator orientation="vertical" className="h-6 opacity-30 hidden md:block" />

            {/* Icon Buttons */}
            <div className="flex items-center gap-1">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
              >
                <Bell className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                {/* Active notification dot */}
                <span className="absolute top-2 right-2 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                </span>
                <span className="sr-only">Notifications</span>
              </Button>

              {/* Settings */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
              >
                <Settings className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 pt-4 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

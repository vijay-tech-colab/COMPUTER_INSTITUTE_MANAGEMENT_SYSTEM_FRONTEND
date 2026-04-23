"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-4 mb-2">
         Main Platform
      </SidebarGroupLabel>
      <SidebarMenu className="px-2">
        {items.map((item) => {
          const isItemActive = pathname === item.url || item.items?.some(sub => sub.url === pathname)
          
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isItemActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    className={cn(
                      "rounded-lg py-5 transition-all duration-200 group relative",
                      isItemActive ? "bg-primary/10 text-primary font-bold shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.icon && <item.icon className={cn("size-4 shrink-0 transition-transform group-hover/collapsible:scale-110", isItemActive ? "text-primary fill-primary/10" : "")} />}
                    <span className="text-[13px] tracking-tight">{item.title}</span>
                    <ChevronRight className={cn("ml-auto size-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90", isItemActive ? "text-primary" : "text-muted-foreground/50")} />
                    
                    {/* Active Bar Indicator */}
                    {isItemActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-primary rounded-full" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className="transition-all duration-300">
                  <SidebarMenuSub className="ml-4 border-l border-border/40 py-1 transition-all">
                    {item.items?.map((subItem) => {
                      const isSubActive = pathname === subItem.url
                      
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className="group/sub">
                            <Link 
                              href={subItem.url} 
                              className={cn(
                                "flex items-center gap-2 py-2 rounded-lg transition-all text-[12px] font-medium",
                                isSubActive ? "text-primary font-bold bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )}
                            >
                              <div className={cn("h-1 w-1 rounded-full shrink-0 transition-all", isSubActive ? "bg-primary scale-150" : "bg-muted-foreground/30 group-hover/sub:bg-muted-foreground")} />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

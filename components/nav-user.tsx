"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User as UserIcon,
  ShieldCheck
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuthContext } from "@/context/AuthContext"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const { logout } = useAuthContext()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl transition-all duration-200 hover:bg-primary/5"
            >
              <Avatar className="h-9 w-9 rounded-xl border border-border/50 shadow-sm">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-bold text-xs">
                   {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-bold text-[13px] text-foreground">{user.name}</span>
                <span className="truncate text-[10px] font-medium text-muted-foreground/80">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground/60" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-2xl border-border/40 bg-background/95 backdrop-blur-md p-2 shadow-2xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={10}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3 text-left">
                <Avatar className="h-10 w-10 rounded-xl border-2 border-background ring-1 ring-border shadow-md">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-xl bg-primary text-white font-bold">
                     {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-black text-foreground tracking-tight">{user.name}</span>
                  <span className="truncate text-[11px] text-muted-foreground font-medium">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/40 mx-2" />
            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem className="gap-3 p-2.5 rounded-xl cursor-default group">
                <Sparkles className="size-4 text-primary animate-pulse" />
                <div className="flex flex-col">
                   <span className="text-xs font-bold">CIMS Premium Plan</span>
                   <span className="text-[10px] text-muted-foreground">Admin Access Level</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/40 mx-2" />
            <DropdownMenuGroup className="p-1 space-y-0.5">
              <DropdownMenuItem className="gap-3 p-2.5 rounded-xl transition-all cursor-pointer hover:bg-primary/10 hover:text-primary">
                <UserIcon className="size-4" />
                <span className="text-xs font-bold">Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 p-2.5 rounded-xl transition-all cursor-pointer hover:bg-primary/10 hover:text-primary">
                <ShieldCheck className="size-4" />
                <span className="text-xs font-bold">Security & Keys</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 p-2.5 rounded-xl transition-all cursor-pointer hover:bg-primary/10 hover:text-primary">
                <CreditCard className="size-4" />
                <span className="text-xs font-bold">Billing Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 p-2.5 rounded-xl transition-all cursor-pointer hover:bg-primary/10 hover:text-primary">
                <Bell className="size-4" />
                <span className="text-xs font-bold">Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-border/40 mx-2" />
            <DropdownMenuItem 
              onClick={() => logout()}
              className="gap-3 p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-all cursor-pointer"
            >
              <LogOut className="size-4" />
              <span className="text-xs font-bold">Sign out from CIMS</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

"use client"

import * as React from "react"
import {
  BookOpen,
  Building2,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
  Wallet,
  Library,
  Bus,
  FileText,
  Bell,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { useAuthContext } from "@/context/AuthContext"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "System Admin",
    email: "admin@cims.edu",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "CIMS Institute",
      logo: Building2,
      plan: "Main Branch",
    },
    {
      name: "CIMS North",
      logo: Building2,
      plan: "North Campus",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "Students",
      url: "/dashboard/students",
      icon: GraduationCap,
      items: [
        {
          title: "Admissions",
          url: "/dashboard/students/admissions",
        },
        {
          title: "Directory",
          url: "/dashboard/students",
        },
        {
          title: "Attendance",
          url: "/dashboard/students/attendance",
        },
      ],
    },
    {
      title: "Staff & Teachers",
      url: "/dashboard/staff",
      icon: Users,
      items: [
        {
          title: "Directory",
          url: "/dashboard/staff",
        },
        {
          title: "Payroll",
          url: "/dashboard/staff/payroll",
        },
        {
          title: "Leave Requests",
          url: "/dashboard/staff/leaves",
        },
      ],
    },
    {
      title: "Academics",
      url: "/dashboard/academics",
      icon: BookOpen,
      items: [
        {
          title: "Courses",
          url: "/dashboard/academics/courses",
        },
        {
          title: "Batches",
          url: "/dashboard/academics/batches",
        },
        {
          title: "Examinations",
          url: "/dashboard/academics/exams",
        },
      ],
    },
    {
      title: "Finance",
      url: "/dashboard/finance",
      icon: Wallet,
      items: [
        {
          title: "Fee Collection",
          url: "/dashboard/finance/fees",
        },
        {
          title: "Expenses",
          url: "/dashboard/finance/expenses",
        },
        {
          title: "Invoices",
          url: "/dashboard/finance/invoices",
        },
        {
          title: "Payments",
          url: "/dashboard/finance/payments",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Books Inventory",
      url: "/dashboard/library/books",
      icon: Library,
    },
    {
      name: "Reports",
      url: "/dashboard/reports",
      icon: FileText,
    },
    {
      name: "Notifications",
      url: "/dashboard/notifications",
      icon: Bell,
    },
    {
      name: "Transport",
      url: "/dashboard/transport",
      icon: Bus,
    },
    {
      name: "System Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthContext();

  const activeUser = {
    name: user?.name || "Loading...",
    email: user?.email || "...",
    avatar: user?.avatar?.url || "/avatars/shadcn.jpg",
  };

  const teams = [
    {
      name: "CIMS Institute",
      logo: Building2,
      plan: user?.branch?.name || "Main Branch",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={activeUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

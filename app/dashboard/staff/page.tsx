"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Download,
  Trash2,
  ArrowUpDown,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Building2,
  Zap,
  Info,
  MapPin,
  Clock,
  UserCheck,
  UserPlus,
  MoreHorizontal,
  ChevronRight,
  Fingerprint,
  Award
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"
import { Pagination } from "@/components/shared/Pagination"

// ─── Mock Data ───────────────────────────────────────────────

const staffData = [
  {
    id: "EMP-101",
    name: "Vikram Malhotra",
    role: "Senior Faculty",
    dept: "Information Tech",
    email: "v.malhotra@cims.com",
    phone: "+91 98765 43210",
    joinDate: "12 Jan 2022",
    status: "Active",
    initials: "VM",
    branch: "New Delhi Main"
  },
  {
    id: "EMP-102",
    name: "Sneha Singh",
    role: "Lead Counselor",
    dept: "Admissions",
    email: "s.singh@cims.com",
    phone: "+91 98765 43211",
    joinDate: "05 Mar 2023",
    status: "Active",
    initials: "SS",
    branch: "Mumbai Sub"
  },
  {
    id: "EMP-103",
    name: "Aarav Sharma",
    role: "System Architect",
    dept: "Tech Ops",
    email: "a.sharma@cims.com",
    phone: "+91 98765 43212",
    joinDate: "20 May 2021",
    status: "Active",
    initials: "AS",
    branch: "New Delhi Main"
  },
  {
    id: "EMP-104",
    name: "Priya Patel",
    role: "Office Admin",
    dept: "Administration",
    email: "p.patel@cims.com",
    phone: "+91 98765 43213",
    joinDate: "15 Oct 2023",
    status: "Probation",
    initials: "PP",
    branch: "Bangalore"
  },
  {
    id: "EMP-105",
    name: "Rohan Mehta",
    role: "Lab Instructor",
    dept: "Information Tech",
    email: "r.mehta@cims.com",
    phone: "+91 98765 43214",
    joinDate: "10 Feb 2024",
    status: "Probation",
    initials: "RM",
    branch: "New Delhi Main"
  }
]

// ─── Sub-Components ──────────────────────────────────────────

function StaffStatCard({ title, value, icon: Icon, color, trend }: any) {
  const { glassEnabled } = useTheme();

  return (
    <Card className={cn(
      "border-border/40 overflow-hidden transition-all duration-300",
      glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card",
      "p-3.5 hover:shadow-lg hover:shadow-primary/5 group border-l-4",
      color.border
    )}>
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-xl shrink-0 transition-transform group-hover:scale-110 shadow-sm", color.bg)}>
          <Icon className={cn("h-4 w-4", color.text)} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate mb-0.5">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-bold tracking-tight">{value}</h3>
            {trend && (
              <span className="text-[9px] font-bold text-emerald-500 flex items-center shrink-0">
                <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

// ─── Main Component ──────────────────────────────────────────

export default function StaffPage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStaff, setSelectedStaff] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedStaff.length === staffData.length) {
      setSelectedStaff([])
    } else {
      setSelectedStaff(staffData.map(s => s.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedStaff.includes(id)) {
      setSelectedStaff(selectedStaff.filter(sid => sid !== id))
    } else {
      setSelectedStaff([...selectedStaff, id])
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-0.5 border-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest"
    switch (status) {
      case "Active":
        return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> Deployed</Badge>
      case "Probation":
        return <Badge className={cn(baseClass, "bg-amber-500/10 text-amber-600")}><Clock className="h-2.5 w-2.5" /> Evaluation</Badge>
      case "Inactive":
        return <Badge className={cn(baseClass, "bg-muted text-muted-foreground/60")}><XCircle className="h-2.5 w-2.5" /> Offline</Badge>
      default:
        return <Badge variant="outline" className="text-[9px]">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6 p-1 pb-10">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Personnel Directory
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <ShieldCheck className="h-2.5 w-2.5 text-primary" />
            Global workforce manifest and role orchestration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
            <Download className="h-3.5 w-3.5" />
            Export Archive
          </Button>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Plus className="h-3.5 w-3.5" />
            Onboard Staff
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StaffStatCard
          title="Total Personnel" value="124" icon={Users}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
          trend="+5"
        />
        <StaffStatCard
          title="Academic Staff" value="84" icon={GraduationCap}
          color={{ bg: "bg-blue-500/10", text: "text-blue-500", border: "border-l-blue-500" }}
        />
        <StaffStatCard
          title="Admin & Ops" value="40" icon={Building2}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
        />
        <StaffStatCard
          title="On-Duty Today" value="118" icon={UserCheck}
          color={{ bg: "bg-purple-500/10", text: "text-purple-500", border: "border-l-purple-500" }}
        />
      </div>

      {/* Staff Ledger Card */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Staff Master Registry</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Unified organizational matrix and identity governance</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Find name, ID or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-7.5 pl-9 bg-muted/10 border-border/40 rounded-lg focus-visible:ring-primary/10 transition-all font-medium text-[11px]"
              />
            </div>
            <Button variant="outline" size="icon" className="h-7.5 w-7.5 rounded-lg shrink-0 border-border/40 hover:bg-primary/5 hover:text-primary shadow-none">
              <Filter className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-[12px] text-left border-collapse">
            <thead>
              <tr className="border-b border-border/30 bg-muted/10">
                <th className="pl-6 pr-2 py-2 w-[40px]">
                  <Checkbox 
                    checked={selectedStaff.length === staffData.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Personnel Profile
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Role & Dept</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Onboarding</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Channels</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Lifecycle</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {staffData.map((staff, idx) => (
                  <motion.tr
                    key={staff.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedStaff.includes(staff.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                       <Checkbox 
                        checked={selectedStaff.includes(staff.id)}
                        onCheckedChange={() => toggleSelect(staff.id)}
                        className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                         <Avatar className="h-8 w-8 ring-1 ring-border/40 group-hover:ring-primary/20 shadow-sm transition-all duration-300">
                           <AvatarFallback className="bg-primary/5 text-primary text-[9px] font-bold">{staff.initials}</AvatarFallback>
                         </Avatar>
                         <div className="flex flex-col min-w-0">
                            <span className="font-bold text-foreground leading-tight truncate">{staff.name}</span>
                            <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest mt-0.5">{staff.id}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                       <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground/80 tracking-tight">
                            {staff.role.includes("Faculty") ? <GraduationCap className="h-2.5 w-2.5 text-blue-500/40" /> : <ShieldCheck className="h-2.5 w-2.5 text-primary/40" />}
                            {staff.role}
                          </div>
                          <div className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest flex items-center gap-1">
                            <Building2 className="h-2 w-2" />
                            {staff.dept}
                          </div>
                       </div>
                    </td>
                    <td className="px-3 py-2.5">
                       <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-foreground/70">
                             <Calendar className="h-3 w-3 text-muted-foreground/40" />
                             {staff.joinDate}
                          </div>
                          <span className="text-[8px] text-muted-foreground/60 font-bold uppercase tracking-widest flex items-center gap-1">
                             <MapPin className="h-2 w-2" />
                             {staff.branch}
                          </span>
                       </div>
                    </td>
                    <td className="px-3 py-2.5">
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60 group-hover:text-primary transition-colors">
                             <Mail className="h-2.5 w-2.5" />
                             {staff.email}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60">
                             <Phone className="h-2.5 w-2.5" />
                             {staff.phone}
                          </div>
                       </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                       <div className="flex justify-center">
                          {getStatusBadge(staff.status)}
                       </div>
                    </td>
                    <td className="px-6 py-2.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-primary/10 text-muted-foreground/50 hover:text-primary">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[170px] rounded-xl border-border/40 shadow-xl backdrop-blur-lg bg-card/90">
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Staff Ops</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Fingerprint className="h-3 w-3" /> View ID Card
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer transition-colors">
                            <Award className="h-3 w-3" /> Assignments
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Info className="h-3 w-3" /> Profile Specs
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
                            <Trash2 className="h-3 w-3" /> Offboard
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </CardContent>

        <Pagination
          currentPage={currentPage}
          totalPages={1}
          totalItems={5}
          pageSize={10}
          onPageChange={setCurrentPage}
          className="border-t border-border/30 bg-muted/5"
        />
      </Card>
    </div>
  )
}

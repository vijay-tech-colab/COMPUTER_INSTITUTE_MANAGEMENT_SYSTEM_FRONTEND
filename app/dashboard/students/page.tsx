"use client"

import React, { useState } from "react"
import {
  Users,
  Search,
  Plus,
  Filter,
  MoreVertical,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  Download,
  UserCheck,
  UserMinus,
  Briefcase,
  Activity,
  TrendingUp
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
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"
import { Pagination } from "@/components/shared/Pagination"
import { StudentAdmissionSheet } from "@/components/shared/StudentAdmissionSheet"

// ─── Mock Data ───────────────────────────────────────────────

const studentsData = [
  {
    id: "STU-2026-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    course: "Full Stack Development",
    batch: "FS-MAR-24",
    joinDate: "12 Mar 2024",
    status: "Active",
    avatar: "AS"
  },
  {
    id: "STU-2026-002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 98765 43211",
    course: "UI/UX Design",
    batch: "UX-APR-24",
    joinDate: "05 Apr 2024",
    status: "Active",
    avatar: "PP"
  },
  {
    id: "STU-2026-003",
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phone: "+91 98765 43212",
    course: "Data Science",
    batch: "DS-FEB-24",
    joinDate: "20 Feb 2024",
    status: "Pending",
    avatar: "RM"
  },
  {
    id: "STU-2026-004",
    name: "Sneha Singh",
    email: "sneha.singh@example.com",
    phone: "+91 98765 43213",
    course: "Cyber Security",
    batch: "CS-JAN-24",
    joinDate: "15 Jan 2024",
    status: "Active",
    avatar: "SS"
  },
  {
    id: "STU-2026-005",
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    phone: "+91 98765 43214",
    course: "Python Pro",
    batch: "PY-MAR-24",
    joinDate: "28 Mar 2024",
    status: "Inactive",
    avatar: "VM"
  },
  {
    id: "STU-2026-006",
    name: "Ishaan Gupta",
    email: "ishaan.g@example.com",
    phone: "+91 98765 43215",
    course: "Mobile App Dev",
    batch: "MD-MAY-24",
    joinDate: "02 May 2024",
    status: "Active",
    avatar: "IG"
  }
]

// ─── Sub-Components ──────────────────────────────────────────

function StudentStatCard({ title, value, icon: Icon, color, trend, iconColor }: any) {
  const { glassEnabled } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className={cn(
        "border-border/40 overflow-hidden transition-all duration-300",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card",
        "p-3 hover:shadow-lg hover:shadow-primary/5 border-l-4",
        color.border
      )}>
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl shrink-0 transition-transform group-hover:scale-110", color.bg)}>
            <Icon className={cn("h-4 w-4", iconColor || color.text)} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate mb-0.5">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-bold tracking-tight">{value}</h3>
              {trend && (
                <span className={cn("text-[9px] font-bold flex items-center shrink-0", trend.positive ? "text-emerald-500" : "text-amber-500")}>
                  <TrendingUp className={cn("h-2.5 w-2.5 mr-0.5", trend.positive ? "" : "rotate-180")} />
                  {trend.value}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// ─── Main Component ──────────────────────────────────────────

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const { glassEnabled } = useTheme()

  const toggleSelectAll = () => {
    if (selectedStudents.length === studentsData.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(studentsData.map(s => s.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(sid => sid !== id))
    } else {
      setSelectedStudents([...selectedStudents, id])
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-0.5 border-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-tighter"
    switch (status) {
      case "Active":
        return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> Active</Badge>
      case "Pending":
        return <Badge className={cn(baseClass, "bg-amber-500/10 text-amber-600")}><Clock className="h-2.5 w-2.5" /> Pending</Badge>
      case "Inactive":
        return <Badge className={cn(baseClass, "bg-red-500/10 text-red-600")}><XCircle className="h-2.5 w-2.5" /> Inactive</Badge>
      default:
        return <Badge variant="outline" className="text-[9px]">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6 p-1 pb-10">

      {/* Header & Stats Overview */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Student Directory
            </h1>
            <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              <Activity className="h-2.5 w-2.5 text-primary" />
              Admission Lifecycle Monitoring
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-2 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button
              size="sm"
              className="h-8 gap-2 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest"
              onClick={() => setIsAdmissionOpen(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Enroll Student
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StudentStatCard
            title="Total Students" value="1,248" icon={Users}
            color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
            trend={{ value: "+12%", positive: true }}
          />
          <StudentStatCard
            title="Active Now" value="956" icon={UserCheck}
            color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
            trend={{ value: "82% Rate", positive: true }}
          />
          <StudentStatCard
            title="Graduated" value="284" icon={Briefcase}
            color={{ bg: "bg-blue-500/10", text: "text-blue-500", border: "border-l-blue-500" }}
            trend={{ value: "98% Placement", positive: true }}
          />
          <StudentStatCard
            title="Dues Pending" value="14" icon={UserMinus}
            color={{ bg: "bg-amber-500/10", text: "text-amber-500", border: "border-l-amber-500" }}
            trend={{ value: "-4% Reduction", positive: true }}
          />
        </div>
      </div>

      {/* Main Table Section */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Active Database</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Real-time Directory Sync</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search Identity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-7.5 pl-9 bg-muted/10 border-border/40 rounded-lg focus-visible:ring-primary/10 transition-all font-medium text-[11px]"
              />
            </div>
            <Button variant="outline" size="icon" className="h-7.5 w-7.5 rounded-lg shrink-0 border-border/40 hover:bg-primary/5 hover:text-primary transition-colors shadow-none">
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
                    checked={selectedStudents.length === studentsData.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Identity
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">UID</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Program Details</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Enrollment</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Status</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {studentsData.map((student, idx) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedStudents.includes(student.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                       <Checkbox 
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => toggleSelect(student.id)}
                        className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 ring-1 ring-border/40 group-hover:ring-primary/30 shadow-sm transition-all duration-300">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                          <AvatarFallback className="bg-primary/5 text-primary text-[9px] font-bold">{student.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-foreground leading-tight truncate">{student.name}</span>
                          <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1 truncate font-medium tracking-tight">
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className="font-mono text-[9px] bg-muted/30 px-1.5 py-0.5 rounded border border-border/30 font-semibold opacity-70 whitespace-nowrap text-primary/80">
                        {student.id}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground/80 tracking-tight">{student.course}</span>
                        <span className="text-[9px] text-muted-foreground/60 font-semibold uppercase tracking-tighter italic">{student.batch}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5 text-muted-foreground/70 font-semibold text-[10px]">
                        <Calendar className="h-3 w-3 text-primary/40" />
                        {student.joinDate}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(student.status)}
                      </div>
                    </td>
                    <td className="px-6 py-2 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-primary/10 text-muted-foreground/50 hover:text-primary transition-all">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] rounded-xl border-border/40 shadow-xl overflow-hidden backdrop-blur-lg bg-card/90">
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2 pb-1 bg-muted/20">Record Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 focus:bg-primary focus:text-white cursor-pointer px-3 font-semibold text-[11px] py-1.5">
                            <Eye className="h-3 w-3" /> Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 focus:bg-primary focus:text-white cursor-pointer px-3 font-semibold text-[11px] py-1.5">
                            <Edit className="h-3 w-3" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer px-3 font-semibold text-[11px] py-1.5">
                            <Trash2 className="h-3 w-3" /> Retire
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {/* Empty State */}
          {studentsData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-muted/5">
              <div className="h-16 w-16 rounded-[2rem] bg-muted/10 flex items-center justify-center mb-5 border border-border/50">
                <Users className="h-8 w-8 text-muted-foreground/20" />
              </div>
              <h3 className="text-sm font-bold text-foreground">No Records Found</h3>
              <p className="text-[10px] text-muted-foreground mt-1.5 text-center max-w-[240px] font-medium leading-relaxed uppercase tracking-wider opacity-60">
                Adjust filters or search parameters
              </p>
            </div>
          )}
        </CardContent>

        {/* Reusable Pagination Implementation */}
        <Pagination
          currentPage={currentPage}
          totalPages={208}
          totalItems={1248}
          pageSize={6}
          onPageChange={setCurrentPage}
          className="border-t border-border/30 bg-muted/5"
        />
      </Card>

      {/* Student Admission Sheet */}
      <StudentAdmissionSheet
        open={isAdmissionOpen}
        onOpenChange={setIsAdmissionOpen}
      />
    </div>
  )
}

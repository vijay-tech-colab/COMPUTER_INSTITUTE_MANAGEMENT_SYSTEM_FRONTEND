"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar as CalendarIcon,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  ChevronRight,
  UserCheck,
  TrendingUp,
  FileText,
  Plus,
  Zap,
  History,
  Download,
  MoreVertical,
  Activity,
  ArrowUpDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"
import { Pagination } from "@/components/shared/Pagination"

// ─── Mock Data ───────────────────────────────────────────────

const attendanceLogs = [
  { id: "LOG-001", date: "22 Apr 2024", batch: "FS-MAR-24", present: 42, absent: 3, late: 1, markedBy: "Rahul V.", time: "10:15 AM" },
  { id: "LOG-002", date: "21 Apr 2024", batch: "UX-APR-24", present: 28, absent: 5, late: 0, markedBy: "Sonia M.", time: "02:30 PM" },
  { id: "LOG-003", date: "21 Apr 2024", batch: "FS-MAR-24", present: 40, absent: 5, late: 1, markedBy: "Rahul V.", time: "10:10 AM" },
  { id: "LOG-004", date: "20 Apr 2024", batch: "DS-FEB-24", present: 35, absent: 2, late: 4, markedBy: "Amit K.", time: "11:00 AM" },
  { id: "LOG-005", date: "19 Apr 2024", batch: "CS-JAN-24", present: 18, absent: 1, late: 0, markedBy: "Priya S.", time: "09:45 AM" },
]

// ─── Sub-Components ──────────────────────────────────────────

function AttendanceStatCard({ title, value, icon: Icon, color, trend }: any) {
  const { glassEnabled } = useTheme();

  return (
    <Card className={cn(
      "border-border/40 overflow-hidden transition-all duration-300",
      glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card",
      "p-3.5 hover:shadow-lg hover:shadow-primary/5 group"
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

export default function StudentsAttendancePage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLogs, setSelectedLogs] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedLogs.length === attendanceLogs.length) {
      setSelectedLogs([])
    } else {
      setSelectedLogs(attendanceLogs.map(l => l.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedLogs.includes(id)) {
      setSelectedLogs(selectedLogs.filter(lid => lid !== id))
    } else {
      setSelectedLogs([...selectedLogs, id])
    }
  }

  return (
    <div className="flex flex-col gap-6 p-1 pb-10">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            Attendance Tracker
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Zap className="h-2.5 w-2.5 text-primary" />
            Live monitoring of student participation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-40 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
              <SelectValue placeholder="All Batches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Global View</SelectItem>
              <SelectItem value="fs-mar">FS-MAR-24</SelectItem>
              <SelectItem value="ux-apr">UX-APR-24</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8 gap-2 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Plus className="h-3.5 w-3.5" />
            Mark Today
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <AttendanceStatCard
          title="Avg. Attendance" value="94.8%" icon={TrendingUp}
          color={{ bg: "bg-primary/10", text: "text-primary" }}
          trend="+2.4%"
        />
        <AttendanceStatCard
          title="Present Today" value="184" icon={CheckCircle2}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500" }}
        />
        <AttendanceStatCard
          title="Total Absentees" value="12" icon={XCircle}
          color={{ bg: "bg-red-500/10", text: "text-red-500" }}
        />
        <AttendanceStatCard
          title="Punctuality" value="91.2%" icon={Clock}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500" }}
        />
      </div>

      {/* Logs Table */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Attendance History</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Daily session records & validation</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search logs by batch or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-7.5 pl-9 bg-muted/10 border-border/40 rounded-lg focus-visible:ring-primary/10 transition-all font-medium text-[11px]"
              />
            </div>
            <Button variant="outline" size="icon" className="h-7.5 w-7.5 rounded-lg shrink-0 border-border/40 hover:bg-primary/5 hover:text-primary transition-colors">
              <Download className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-[12px] text-left border-collapse">
            <thead>
              <tr className="border-b border-border/30 bg-muted/10">
                <th className="pl-6 pr-2 py-2 w-[40px]">
                  <Checkbox
                    checked={selectedLogs.length === attendanceLogs.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Session Date
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Batch Details</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Summary (P/A/L)</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Marked By</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {attendanceLogs.map((log, idx) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedLogs.includes(log.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                      <Checkbox
                        checked={selectedLogs.includes(log.id)}
                        onCheckedChange={() => toggleSelect(log.id)}
                        className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-105">
                          <CalendarIcon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground leading-tight">{log.date}</span>
                          <span className="text-[9px] text-muted-foreground/60 font-medium uppercase tracking-widest mt-0.5">{log.time}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <Badge variant="outline" className="bg-muted/10 border-border/40 text-foreground/70 font-bold text-[9px] px-1.5 py-0">
                        {log.batch}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-bold text-emerald-500">{log.present}</span>
                          <span className="text-[7px] font-black uppercase opacity-40">Pres</span>
                        </div>
                        <div className="w-[1px] h-4 bg-border/40 mx-0.5" />
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-bold text-red-500">{log.absent}</span>
                          <span className="text-[7px] font-black uppercase opacity-40">Abs</span>
                        </div>
                        <div className="w-[1px] h-4 bg-border/40 mx-0.5" />
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] font-bold text-amber-500">{log.late}</span>
                          <span className="text-[7px] font-black uppercase opacity-40">Late</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[8px] font-black bg-primary/10 text-primary">RV</AvatarFallback>
                        </Avatar>
                        <span className="text-[10px] font-semibold text-foreground/80 tracking-tight">{log.markedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-2.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-primary/10 text-muted-foreground/50 hover:text-primary">
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] rounded-xl border-border/40 shadow-xl backdrop-blur-lg bg-card/90">
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Log Context</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <History className="h-3 w-3" /> Full Report
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Plus className="h-3 w-3" /> Edit Record
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
          totalPages={248}
          totalItems={2480}
          pageSize={10}
          onPageChange={setCurrentPage}
          className="border-t border-border/30 bg-muted/5"
        />
      </Card>
    </div>
  )
}

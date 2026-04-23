"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileSignature,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Globe,
  MapPin,
  Download,
  Trash2,
  ArrowUpDown,
  Activity,
  TrendingUp,
  BookOpen,
  Users,
  GraduationCap,
  Target,
  Zap,
  Layout,
  ClipboardCheck,
  ChevronRight,
  Monitor,
  Building
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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

const examsData = [
  {
    id: "EXM-2024-001",
    title: "Mid-Term Assessment",
    course: "Advance Web Stack",
    batch: "AWS-D24-MOR",
    schedule: "22 Apr 2024, 10:00 AM",
    duration: "180 Mins",
    mode: "Digital",
    status: "Ongoing",
    resultStatus: "Pending"
  },
  {
    id: "EXM-2024-002",
    title: "Final Certification",
    course: "UI/UX Mastery",
    batch: "UIX-E24-EVE",
    schedule: "25 Apr 2024, 02:00 PM",
    duration: "240 Mins",
    mode: "Hall",
    status: "Upcoming",
    resultStatus: "-"
  },
  {
    id: "EXM-2024-003",
    title: "Weekly Quiz #4",
    course: "Python DS",
    batch: "PYDS-WEEKEND",
    schedule: "21 Apr 2024, 09:30 AM",
    duration: "60 Mins",
    mode: "Digital",
    status: "Completed",
    resultStatus: "Published"
  },
  {
    id: "EXM-2024-004",
    title: "Logic & Aptitude",
    course: "Foundation Pro",
    batch: "FPRO-ALL",
    schedule: "18 Apr 2024, 11:45 AM",
    duration: "90 Mins",
    mode: "Hall",
    status: "Completed",
    resultStatus: "Published"
  },
  {
    id: "EXM-2024-005",
    title: "React Intermediate",
    course: "React Specialist",
    batch: "RJS-M24",
    schedule: "28 Apr 2024, 10:30 AM",
    duration: "120 Mins",
    mode: "Digital",
    status: "Upcoming",
    resultStatus: "-"
  }
]

// ─── Sub-Components ──────────────────────────────────────────

function ExamStatCard({ title, value, icon: Icon, color, trend }: any) {
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

export default function AcademicsExamsPage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedExams, setSelectedExams] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedExams.length === examsData.length) {
      setSelectedExams([])
    } else {
      setSelectedExams(examsData.map(e => e.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedExams.includes(id)) {
      setSelectedExams(selectedExams.filter(eid => eid !== id))
    } else {
      setSelectedExams([...selectedExams, id])
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-0.5 border-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest"
    switch (status) {
      case "Ongoing":
        return <Badge className={cn(baseClass, "bg-amber-500/10 text-amber-600")}><Activity className="h-2.5 w-2.5" /> Live Now</Badge>
      case "Upcoming":
        return <Badge className={cn(baseClass, "bg-blue-500/10 text-blue-600")}><Calendar className="h-2.5 w-2.5" /> Scheduled</Badge>
      case "Completed":
        return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> Finished</Badge>
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
            <FileSignature className="h-5 w-5 text-primary" />
            Assessment Pipeline
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <GraduationCap className="h-2.5 w-2.5 text-primary" />
            Evaluation schedules and result metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
            <Download className="h-3.5 w-3.5" />
            Evaluation Log
          </Button>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Plus className="h-3.5 w-3.5" />
            Schedule Exam
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <ExamStatCard
          title="Active Exams" value="04" icon={Activity}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
          trend="+2"
        />
        <ExamStatCard
          title="Results Pending" value="12" icon={ClipboardCheck}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500", border: "border-l-amber-500" }}
        />
        <ReportStatCard
          title="Avg. Score" value="78.4%" icon={Target}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
          trend="4.2%"
        />
        <ExamStatCard
          title="Participation Rate" value="94.2%" icon={Users}
          color={{ bg: "bg-blue-500/10", text: "text-blue-500", border: "border-l-blue-500" }}
        />
      </div>

      {/* Examination Card */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Examination Ledger</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Assessment tracking and evaluation audit</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Find exam title or course..."
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
                    checked={selectedExams.length === examsData.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Evaluation Entity
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Instruction Detail</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Time & Format</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Lifecycle</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Results</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {examsData.map((exam, idx) => (
                  <motion.tr
                    key={exam.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedExams.includes(exam.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                       <Checkbox 
                        checked={selectedExams.includes(exam.id)}
                        onCheckedChange={() => toggleSelect(exam.id)}
                        className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col min-w-0">
                         <span className="font-bold text-foreground leading-tight truncate">{exam.title}</span>
                         <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest mt-0.5">{exam.id}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                       <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground/80 tracking-tight">
                            <BookOpen className="h-2.5 w-2.5 text-primary/40" />
                            {exam.course}
                          </div>
                          <div className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest">
                            {exam.batch}
                          </div>
                       </div>
                    </td>
                    <td className="px-3 py-2.5">
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-foreground/70">
                             <Clock className="h-3 w-3 text-muted-foreground/40" />
                             {exam.schedule}
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-[8px] font-bold text-muted-foreground/60 uppercase">{exam.duration}</span>
                             <Badge variant="outline" className={cn("text-[7px] font-bold h-4 px-1 leading-none uppercase", exam.mode === "Digital" ? "border-blue-500/40 text-blue-500 bg-blue-500/5" : "border-amber-500/40 text-amber-500 bg-amber-500/5")}>
                                {exam.mode === "Digital" ? <Monitor className="h-2 w-2 mr-0.5" /> : <Building className="h-2 w-2 mr-0.5" />}
                                {exam.mode}
                             </Badge>
                          </div>
                       </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                       <div className="flex justify-center">
                          {getStatusBadge(exam.status)}
                       </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                       <div className="flex justify-center">
                          <span className={cn(
                            "text-[10px] font-bold tracking-tight",
                            exam.resultStatus === "Published" ? "text-emerald-600" : "text-muted-foreground/40"
                          )}>
                             {exam.resultStatus}
                          </span>
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
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Exam Ops</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Zap className="h-3 w-3" /> Proctored View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <ClipboardCheck className="h-3 w-3" /> Grade Papers
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
                            <Trash2 className="h-3 w-3" /> Cancel Exam
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

function ReportStatCard({ title, value, icon: Icon, color, trend }: any) {
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

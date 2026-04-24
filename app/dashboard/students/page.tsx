"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  GraduationCap,
  Users,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Mail,
  Smartphone,
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
  TrendingUp,
  RefreshCw,
  ChevronRight,
  BookOpen,
  MapPin,
  Building,
  Zap
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"
import { Pagination } from "@/components/shared/Pagination"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchStudents, deleteStudent } from "@/redux/slices/studentSlice"
import { BranchAPI } from "@/api/branch.api"
import { useRouter } from "next/navigation"

// ─── Sub-Components ──────────────────────────────────────────

function StudentStatCard({ title, value, icon: Icon, color, trend }: any) {
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

export default function StudentsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { glassEnabled } = useTheme()
  const { students, loading, totalStudents } = useAppSelector((state) => state.students)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [branches, setBranches] = useState<any[]>([])
  const [filterBranch, setFilterBranch] = useState<string>("all")

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await BranchAPI.getAll()
        setBranches(data.branches || [])
      } catch (err) {
        console.error("Failed to fetch branches", err)
      }
    }
    fetchBranches()
  }, [])

  useEffect(() => {
    dispatch(fetchStudents({ 
      branchId: filterBranch === "all" ? undefined : filterBranch,
      query: `page=${currentPage}&keyword=${searchTerm}` 
    }))
  }, [dispatch, currentPage, searchTerm, filterBranch])

  const toggleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(students.map(s => s._id))
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
    const baseClass = "px-2 py-0.5 border-none flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-wider rounded-md shadow-none"
    switch (status) {
      case "Active": return <Badge className={cn(baseClass, "bg-emerald-100 text-emerald-600")}>Active</Badge>
      case "Pending": return <Badge className={cn(baseClass, "bg-amber-100 text-amber-600")}>Pending</Badge>
      case "Inactive": return <Badge className={cn(baseClass, "bg-rose-100 text-rose-600")}>Inactive</Badge>
      default: return <Badge className={cn(baseClass, "bg-slate-100 text-slate-600")}>{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6 p-1 pb-10">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Student Directory
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Zap className="h-2.5 w-2.5 text-primary" />
            Centralized Academic Lifecycle Management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-2 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button 
            onClick={() => router.push("/dashboard/students/admissions")}
            size="sm" 
            className="h-8 gap-2 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest"
          >
            <Plus className="h-3.5 w-3.5" />
            Register Student
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StudentStatCard
          title="Total Enrolled" value={totalStudents || "0"} icon={Users}
          color={{ bg: "bg-primary/10", text: "text-primary" }}
          trend="+4.2%"
        />
        <StudentStatCard
          title="Active Profiles" value="956" icon={UserCheck}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500" }}
        />
        <StudentStatCard
          title="Placement Ready" value="284" icon={Briefcase}
          color={{ bg: "bg-blue-500/10", text: "text-blue-500" }}
        />
        <StudentStatCard
          title="Outstanding Dues" value="14" icon={UserMinus}
          color={{ bg: "bg-rose-500/10", text: "text-rose-500" }}
        />
      </div>

      {/* Main Table Card */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Active Database</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Real-time student directory & search</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[300px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search by ID, name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-7.5 pl-9 bg-muted/10 border-border/40 rounded-lg focus-visible:ring-primary/10 transition-all font-medium text-[11px]"
              />
            </div>
            <Select value={filterBranch} onValueChange={setFilterBranch}>
              <SelectTrigger className="h-7.5 w-40 bg-muted/10 border-border/40 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-[10px] font-bold uppercase">All Branches</SelectItem>
                {branches.map((b) => <SelectItem key={b._id} value={b._id} className="text-[10px] font-bold uppercase">{b.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button 
              onClick={() => dispatch(fetchStudents({ branchId: filterBranch === "all" ? undefined : filterBranch, query: `page=${currentPage}&keyword=${searchTerm}` }))}
              variant="outline" 
              size="icon" 
              className="h-7.5 w-7.5 rounded-lg shrink-0 border-border/40 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto no-scrollbar">
          <table className="w-full text-[12px] text-left border-collapse">
            <thead>
              <tr className="border-b border-border/30 bg-muted/10">
                <th className="pl-6 pr-2 py-2 w-[40px]">
                  <Checkbox
                    checked={selectedStudents.length === students.length && students.length > 0}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Student Profile
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Registration</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Course & Batch</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Join Date</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Status</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {students.map((student, idx) => (
                  <motion.tr
                    key={student._id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => router.push(`/dashboard/students/${student._id}`)}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200 cursor-pointer",
                      selectedStudents.includes(student._id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedStudents.includes(student._id)}
                        onCheckedChange={() => toggleSelect(student._id)}
                        className="border-border/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 rounded-lg border border-border/40 shadow-sm transition-transform group-hover:scale-105">
                          <AvatarImage src={student.user?.avatar?.url} />
                          <AvatarFallback className="bg-primary/5 text-primary font-black text-[10px]">{student.user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground leading-tight tracking-tight">{student.user?.name}</span>
                          <span className="text-[9px] text-muted-foreground/60 font-medium uppercase tracking-widest mt-0.5">{student.user?.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <Badge variant="outline" className="bg-muted/10 border-border/40 text-foreground/70 font-bold text-[9px] px-2 py-0">
                        {student.registrationNo}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] font-bold text-foreground/80 tracking-tight flex items-center gap-1.5 uppercase">
                          <BookOpen className="h-3 w-3 opacity-30" /> {student.enrolledCourses?.[0]?.name || "N/A"}
                        </span>
                        <span className="text-[9px] text-primary font-black uppercase tracking-widest">{student.currentBatch?.name || "No Batch"}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground/70 uppercase">
                        <Calendar className="h-3 w-3 opacity-30" /> {new Date(student.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      {getStatusBadge(student.status || "Active")}
                    </td>
                    <td className="px-6 py-2.5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-primary/10 text-muted-foreground/50 hover:text-primary">
                            < MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] rounded-xl border-border/40 shadow-xl backdrop-blur-lg bg-card/90">
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Ops Context</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/dashboard/students/${student._id}`)} className="gap-2 px-3 font-semibold text-[11px] py-1.5 cursor-pointer">
                            <Eye className="h-3 w-3" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 cursor-pointer">
                            <Edit className="h-3 w-3" /> Modify Record
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/10" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 text-rose-500 focus:bg-rose-500 focus:text-white cursor-pointer">
                            <Trash2 className="h-3 w-3" /> Retire Account
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

        {loading && students.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-muted/5 gap-3">
             <RefreshCw className="h-8 w-8 text-primary animate-spin opacity-20" />
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Synchronizing Database...</p>
          </div>
        )}

        {students.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-muted/5 gap-2">
             <div className="h-12 w-12 rounded-2xl bg-muted/10 flex items-center justify-center text-muted-foreground/20 border border-border/40 shadow-inner">
                <Users className="h-6 w-6" />
             </div>
             <h3 className="text-[11px] font-bold text-foreground uppercase tracking-widest mt-2">No Records Found</h3>
             <p className="text-[9px] text-muted-foreground uppercase tracking-tighter opacity-60">Adjust search parameters or filters</p>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalStudents / 10)}
          totalItems={totalStudents}
          pageSize={10}
          onPageChange={setCurrentPage}
          className="border-t border-border/30 bg-muted/5"
        />
      </Card>
    </div>
  )
}

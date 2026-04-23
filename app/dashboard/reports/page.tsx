"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FilePieChart,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Trash2,
  ArrowUpDown,
  Activity,
  TrendingUp,
  FileSpreadsheet,
  Users,
  Banknote,
  GraduationCap,
  Briefcase,
  Layers,
  Zap,
  Info,
  RefreshCw,
  HardDrive
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

// ─── Mock Data (Based on Report Schema) ──────────────────────

const reportsData = [
  {
    id: "REP-101",
    title: "Annual Attendance Audit",
    reportType: "Attendance",
    parameters: { format: "PDF" },
    status: "Completed",
    generatedBy: "Vikram Malhotra",
    processedAt: "22 Apr 2024, 10:30 AM",
    branch: "New Delhi Main"
  },
  {
    id: "REP-102",
    title: "Q1 Fee Collection Summary",
    reportType: "Fee Collection",
    parameters: { format: "Excel" },
    status: "Processing",
    generatedBy: "Sneha Singh",
    processedAt: "-",
    branch: "Mumbai Suburban"
  },
  {
    id: "REP-103",
    title: "Batch-2024 Performance Analytics",
    reportType: "Student Performance",
    parameters: { format: "PDF" },
    status: "Completed",
    generatedBy: "Aarav Sharma",
    processedAt: "21 Apr 2024, 04:15 PM",
    branch: "New Delhi Main"
  },
  {
    id: "REP-104",
    title: "Staff Activity Log (Mar)",
    reportType: "Staff Activity",
    parameters: { format: "Excel" },
    status: "Failed",
    generatedBy: "Priya Patel",
    processedAt: "20 Apr 2024, 11:00 AM",
    branch: "Bangalore IT"
  },
  {
    id: "REP-105",
    title: "Weekend Batch Summary",
    reportType: "Batch Summary",
    parameters: { format: "PDF" },
    status: "Pending",
    generatedBy: "Rohan Mehta",
    processedAt: "-",
    branch: "Pune Hub"
  }
]

// ─── Sub-Components ──────────────────────────────────────────

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

// ─── Main Component ──────────────────────────────────────────

export default function ReportsPage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedReports, setSelectedReports] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedReports.length === reportsData.length) {
      setSelectedReports([])
    } else {
      setSelectedReports(reportsData.map(r => r.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter(rid => rid !== id))
    } else {
      setSelectedReports([...selectedReports, id])
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-0.5 border-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest"
    switch (status) {
      case "Completed":
        return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> Ready</Badge>
      case "Processing":
        return <Badge className={cn(baseClass, "bg-blue-500/10 text-blue-600")}><RefreshCw className="h-2.5 w-2.5 animate-spin" /> Working</Badge>
      case "Failed":
        return <Badge className={cn(baseClass, "bg-red-500/10 text-red-600")}><XCircle className="h-2.5 w-2.5" /> Aborted</Badge>
      case "Pending":
        return <Badge className={cn(baseClass, "bg-muted text-muted-foreground")}><Clock className="h-2.5 w-2.5" /> Queued</Badge>
      default:
        return <Badge variant="outline" className="text-[9px]">{status}</Badge>
    }
  }

  const getReportIcon = (type: string) => {
    switch (type) {
      case "Attendance": return <Users className="h-3.5 w-3.5" />
      case "Fee Collection": return <Banknote className="h-3.5 w-3.5" />
      case "Student Performance": return <GraduationCap className="h-3.5 w-3.5" />
      case "Batch Summary": return <Layers className="h-3.5 w-3.5" />
      case "Staff Activity": return <Briefcase className="h-3.5 w-3.5" />
      default: return <FilePieChart className="h-3.5 w-3.5" />
    }
  }

  return (
    <div className="flex flex-col gap-6 p-1 pb-10">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Intelligence Hub
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Zap className="h-2.5 w-2.5 text-primary" />
            Automated insight and audit generation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
            <Download className="h-3.5 w-3.5" />
            Archive
          </Button>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Plus className="h-3.5 w-3.5" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <ReportStatCard
          title="Total Reports" value="184" icon={FilePieChart}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
          trend="+12"
        />
        <ReportStatCard
          title="Success Rate" value="99.2%" icon={CheckCircle2}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
          trend="0.5%"
        />
        <ReportStatCard
          title="Processing" value="02" icon={RefreshCw}
          color={{ bg: "bg-blue-500/10", text: "text-blue-500", border: "border-l-blue-500" }}
        />
        <ReportStatCard
          title="Storage Used" value="1.2 GB" icon={HardDrive}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500", border: "border-l-amber-500" }}
        />
      </div>

      {/* Report Generation Ledger */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Generation Logs</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Audit of automated data extraction</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search report title or requester..."
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
                    checked={selectedReports.length === reportsData.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Insight Entity
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Registry Metadata</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Processed At</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Format</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Status</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {reportsData.map((report, idx) => (
                  <motion.tr
                    key={report.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedReports.includes(report.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                       <Checkbox 
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={() => toggleSelect(report.id)}
                        className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                         <div className="h-8 w-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-105">
                            {getReportIcon(report.reportType)}
                         </div>
                         <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-foreground leading-tight truncate">{report.title}</span>
                            <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest mt-0.5">{report.reportType}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                       <div className="flex items-center gap-2">
                         <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[8px] font-bold bg-primary/10 text-primary uppercase">RQ</AvatarFallback>
                         </Avatar>
                         <div className="flex flex-col">
                            <span className="text-[10px] font-semibold text-foreground/80 tracking-tight">{report.generatedBy}</span>
                            <span className="text-[8px] text-muted-foreground font-medium uppercase tracking-tighter">{report.branch}</span>
                         </div>
                       </div>
                    </td>
                    <td className="px-3 py-2.5">
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-foreground/70">
                          <Clock className="h-3 w-3 text-muted-foreground/40" />
                          {report.processedAt}
                       </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                       <div className="flex justify-center">
                          {report.parameters.format === "PDF" ? (
                            <Badge className="bg-red-500/10 text-red-600 border-0 text-[8px] font-bold uppercase px-2 py-0.5"><FileText className="h-2 w-2 mr-1" /> PDF</Badge>
                          ) : (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-0 text-[8px] font-bold uppercase px-2 py-0.5"><FileSpreadsheet className="h-2 w-2 mr-1" /> XLS</Badge>
                          )}
                       </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                       <div className="flex justify-center">
                          {getStatusBadge(report.status)}
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
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">System Ops</DropdownMenuLabel>
                          {report.status === "Completed" && (
                            <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                              <Download className="h-3 w-3" /> Fetch Asset
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Info className="h-3 w-3" /> View Specs
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer transition-colors">
                            <RefreshCw className="h-3 w-3" /> Re-trigger
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
                            <Trash2 className="h-3 w-3" /> Purge Record
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

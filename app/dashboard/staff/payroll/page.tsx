"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Banknote,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Download,
  Trash2,
  ArrowUpDown,
  History,
  CreditCard,
  Wallet,
  Receipt,
  FileText,
  Zap,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Briefcase,
  ShieldCheck,
  Ban,
  RefreshCw,
  MoreHorizontal,
  ChevronRight,
  HandCoins,
  Gem
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

const payrollData = [
  {
    id: "PAY-2024-001",
    staffName: "Vikram Malhotra",
    designation: "Senior Faculty",
    baseSalary: 45000,
    allowance: 5000,
    deduction: 2000,
    netPayable: 48000,
    status: "Paid",
    period: "Apr 2024",
    initials: "VM"
  },
  {
    id: "PAY-2024-002",
    staffName: "Sneha Singh",
    designation: "Lead Counselor",
    baseSalary: 35000,
    allowance: 3500,
    deduction: 1500,
    netPayable: 37000,
    status: "Processing",
    period: "Apr 2024",
    initials: "SS"
  },
  {
    id: "PAY-2024-003",
    staffName: "Aarav Sharma",
    designation: "Frontend Architect",
    baseSalary: 85000,
    allowance: 12000,
    deduction: 5000,
    netPayable: 92000,
    status: "Paid",
    period: "Apr 2024",
    initials: "AS"
  },
  {
    id: "PAY-2024-004",
    staffName: "Priya Patel",
    designation: "Office Admin",
    baseSalary: 28000,
    allowance: 2000,
    deduction: 1000,
    netPayable: 29000,
    status: "Pending",
    period: "Apr 2024",
    initials: "PP"
  },
  {
    id: "PAY-2024-005",
    staffName: "Rohan Mehta",
    designation: "Lab Assistant",
    baseSalary: 18000,
    allowance: 1500,
    deduction: 500,
    netPayable: 19000,
    status: "Paid",
    period: "Apr 2024",
    initials: "RM"
  }
]

// ─── Sub-Components ──────────────────────────────────────────

function PayrollStatCard({ title, value, icon: Icon, color, trend }: any) {
  const { glassEnabled } = useTheme();

  return (
    <Card className={cn(
      "border-border/40 overflow-hidden transition-all duration-300",
      glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card",
      "p-4 hover:shadow-lg hover:shadow-primary/5 group border-l-4",
      color.border
    )}>
      <div className="flex items-center gap-4">
        <div className={cn("p-2.5 rounded-2xl shrink-0 transition-transform group-hover:scale-110 shadow-sm", color.bg)}>
          <Icon className={cn("h-5 w-5", color.text)} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] truncate mb-0.5">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-bold tracking-tighter">{value}</h3>
            {trend && (
              <span className="text-[10px] font-bold text-emerald-500 flex items-center shrink-0">
                <TrendingUp className="h-3 w-3 mr-0.5" />
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

export default function StaffPayrollPage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedHolders, setSelectedHolders] = useState<string[]>([])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val)
  }

  const toggleSelectAll = () => {
    if (selectedHolders.length === payrollData.length) {
      setSelectedHolders([])
    } else {
      setSelectedHolders(payrollData.map(p => p.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedHolders.includes(id)) {
      setSelectedHolders(selectedHolders.filter(pid => pid !== id))
    } else {
      setSelectedHolders([...selectedHolders, id])
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-0.5 border-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest"
    switch (status) {
      case "Paid":
        return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> Settled</Badge>
      case "Processing":
        return <Badge className={cn(baseClass, "bg-blue-500/10 text-blue-600 animate-pulse")}><RefreshCw className="h-2.5 w-2.5 animate-spin" /> Banking</Badge>
      case "Pending":
        return <Badge className={cn(baseClass, "bg-amber-500/10 text-amber-600")}><Clock className="h-2.5 w-2.5" /> Awaiting</Badge>
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
            <Banknote className="h-5 w-5 text-primary" />
            Treasury Disbursement
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Briefcase className="h-2.5 w-2.5 text-primary" />
            Payroll governance and salary orchestration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
            <History className="h-3.5 w-3.5" />
            Payment History
          </Button>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Zap className="h-3.5 w-3.5" />
            Generate Payroll
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <PayrollStatCard
          title="Payroll Total (MTD)" value="₹12.84L" icon={HandCoins}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
          trend="8.4%"
        />
        <PayrollStatCard
          title="Pending Disburse" value="₹2.45L" icon={Clock}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500", border: "border-l-amber-500" }}
        />
        <PayrollStatCard
          title="Tax & Deductions" value="₹84.2K" icon={Receipt}
          color={{ bg: "bg-red-500/10", text: "text-red-500", border: "border-l-red-500" }}
        />
        <PayrollStatCard
          title="Disbursed Ratio" value="82.4%" icon={CheckCircle2}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
        />
      </div>

      {/* Payroll Management Card */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Staff Salary Ledger</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Monthly compensation auditing and settlement tracking</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Find staff or payment ID..."
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
                    checked={selectedHolders.length === payrollData.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Beneficiary Entity
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Basic Comp.</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Allowances</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Deductions</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Net Payable</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Status</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {payrollData.map((record, idx) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedHolders.includes(record.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                       <Checkbox 
                        checked={selectedHolders.includes(record.id)}
                        onCheckedChange={() => toggleSelect(record.id)}
                        className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                         <Avatar className="h-8 w-8 ring-1 ring-border/40 group-hover:ring-primary/20 shadow-sm transition-all duration-300">
                           <AvatarFallback className="bg-primary/5 text-primary text-[9px] font-bold">{record.initials}</AvatarFallback>
                         </Avatar>
                         <div className="flex flex-col min-w-0">
                            <span className="font-bold text-foreground leading-tight truncate">{record.staffName}</span>
                            <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest mt-0.5">{record.designation}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-foreground/80">
                       {formatCurrency(record.baseSalary)}
                    </td>
                    <td className="px-3 py-2.5 text-emerald-600 font-bold">
                       +{formatCurrency(record.allowance)}
                    </td>
                    <td className="px-3 py-2.5 text-amber-600 font-bold">
                       -{formatCurrency(record.deduction)}
                    </td>
                    <td className="px-3 py-2.5">
                       <div className="flex flex-col">
                          <span className="font-bold text-foreground tracking-tight text-[13px]">{formatCurrency(record.netPayable)}</span>
                          <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-[0.1em]">{record.period}</span>
                       </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                       <div className="flex justify-center">
                          {getStatusBadge(record.status)}
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
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Payroll Ops</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <FileText className="h-3 w-3" /> Export Payslip
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <RefreshCw className="h-3 w-3" /> Recalculate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-emerald-500 focus:text-white text-emerald-600 cursor-pointer">
                            <CreditCard className="h-3 w-3" /> Disburse Now
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
                            <Ban className="h-3 w-3" /> Hold Payment
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

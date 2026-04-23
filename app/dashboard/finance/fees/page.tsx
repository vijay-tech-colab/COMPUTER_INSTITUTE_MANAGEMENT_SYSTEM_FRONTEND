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
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Trash2,
  ArrowUpDown,
  Download,
  Activity,
  TrendingUp,
  Receipt,
  Wallet,
  ArrowUpRight,
  User,
  Edit
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

const feeRecords = [
  {
    id: "TRX-10294",
    studentName: "Aarav Sharma",
    course: "Full Stack Dev",
    category: "Installment #2",
    amount: 15000,
    method: "Online",
    status: "Paid",
    date: "22 Apr 2024",
    initials: "AS"
  },
  {
    id: "TRX-10295",
    studentName: "Priya Patel",
    course: "UI/UX Design",
    category: "Registration",
    amount: 5000,
    method: "Cash",
    status: "Paid",
    date: "21 Apr 2024",
    initials: "PP"
  },
  {
    id: "TRX-10296",
    studentName: "Rohan Mehta",
    course: "Data Science",
    category: "Admission Fee",
    amount: 10000,
    method: "UPI",
    status: "Partial",
    date: "20 Apr 2024",
    initials: "RM"
  },
  {
    id: "TRX-10297",
    studentName: "Sneha Singh",
    course: "Cyber Security",
    category: "Installment #1",
    amount: 12000,
    method: "Bank Transfer",
    status: "Pending",
    date: "19 Apr 2024",
    initials: "SS"
  },
  {
    id: "TRX-10298",
    studentName: "Vikram Malhotra",
    course: "Python Pro",
    category: "Material Fee",
    amount: 2500,
    method: "Cash",
    status: "Paid",
    date: "18 Apr 2024",
    initials: "VM"
  }
]

// ─── Sub-Components ──────────────────────────────────────────

function FinanceStatCard({ title, value, icon: Icon, color, trend }: any) {
  const { glassEnabled } = useTheme();

  return (
    <Card className={cn(
      "border-border/40 overflow-hidden transition-all duration-300",
      glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card",
      "p-3.5 hover:shadow-lg hover:shadow-primary/5 group border-l-4",
      color.border
    )}>
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-xl shrink-0 transition-transform group-hover:scale-110", color.bg)}>
          <Icon className={cn("h-4 w-4", color.text)} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate mb-0.5">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-bold tracking-tight">{value}</h3>
            {trend && (
              <span className={cn("text-[9px] font-bold flex items-center shrink-0", trend.positive ? "text-emerald-500" : "text-amber-500")}>
                <ArrowUpRight className={cn("h-2.5 w-2.5 mr-0.5", !trend.positive && "rotate-90")} />
                {trend.value}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

// ─── Main Component ──────────────────────────────────────────

export default function FinanceFeesPage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedFees, setSelectedFees] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedFees.length === feeRecords.length) {
      setSelectedFees([])
    } else {
      setSelectedFees(feeRecords.map(f => f.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedFees.includes(id)) {
      setSelectedFees(selectedFees.filter(fid => fid !== id))
    } else {
      setSelectedFees([...selectedFees, id])
    }
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-0.5 border-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-tighter"
    switch (status) {
      case "Paid":
        return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> Fully Paid</Badge>
      case "Partial":
        return <Badge className={cn(baseClass, "bg-amber-500/10 text-amber-600")}><Clock className="h-2.5 w-2.5" /> Partially Paid</Badge>
      case "Pending":
        return <Badge className={cn(baseClass, "bg-red-500/10 text-red-600")}><XCircle className="h-2.5 w-2.5" /> Payment Due</Badge>
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
            <Receipt className="h-5 w-5 text-primary" />
            Fee Management
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Activity className="h-2.5 w-2.5 text-primary" />
            Financial Audit & Collection Ledger
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
            <Download className="h-3.5 w-3.5" />
            Ledger
          </Button>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Plus className="h-3.5 w-3.5" />
            Collect Fee
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <FinanceStatCard
          title="Gross Revenue" value="₹12.4M" icon={Banknote}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
          trend={{ value: "14%", positive: true }}
        />
        <FinanceStatCard
          title="Pending Dues" value="₹840K" icon={Wallet}
          color={{ bg: "bg-red-500/10", text: "text-red-500", border: "border-l-red-500" }}
          trend={{ value: "-2%", positive: true }}
        />
        <FinanceStatCard
          title="MTD Collection" value="₹2.1M" icon={TrendingUp}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
          trend={{ value: "22%", positive: true }}
        />
        <FinanceStatCard
          title="Scholarships" value="₹150K" icon={CreditCard}
          color={{ bg: "bg-blue-500/10", text: "text-blue-500", border: "border-l-blue-500" }}
        />
      </div>

      {/* Main Ledger Card */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Financial Transaction Ledger</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Real-time treasury synchronization</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Find transaction or student..."
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
                    checked={selectedFees.length === feeRecords.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Recipient Entity
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Transaction Details</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Amount & Method</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Status</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {feeRecords.map((fee, idx) => (
                  <motion.tr
                    key={fee.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedFees.includes(fee.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                      <Checkbox
                        checked={selectedFees.includes(fee.id)}
                        onCheckedChange={() => toggleSelect(fee.id)}
                        className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 ring-1 ring-border/40 group-hover:ring-primary/20 shadow-sm transition-all duration-300">
                          <AvatarFallback className="bg-primary/5 text-primary text-[9px] font-bold">{fee.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-foreground leading-tight truncate">{fee.studentName}</span>
                          <span className="text-[9px] text-muted-foreground/60 font-medium uppercase tracking-tight truncate mt-0.5">
                            {fee.course}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-semibold text-foreground/80 tracking-tight">{fee.category}</span>
                        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest leading-none">
                          <span className="text-primary/60">{fee.id}</span>
                          <span className="opacity-40">|</span>
                          {fee.date}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-foreground tracking-tight">{formatCurrency(fee.amount)}</span>
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter opacity-60 italic">{fee.method}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(fee.status)}
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
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Treasury Ops</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <FileText className="h-3 w-3" /> Print Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Edit className="h-3 w-3" /> Edit Entry
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
                            <Trash2 className="h-3 w-3" /> Void Transaction
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

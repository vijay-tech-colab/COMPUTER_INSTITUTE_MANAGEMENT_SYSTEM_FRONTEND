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
  ShoppingCart,
  Users,
  Home,
  Zap,
  Tag,
  Paperclip,
  ArrowUpRight,
  TrendingDown
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

const expensesData = [
  {
    id: "EXP-88901",
    category: "Rent & Utilities",
    icon: Home,
    description: "Monthly Office Rent - April",
    amount: 45000,
    method: "Bank Transfer",
    status: "Approved",
    date: "15 Apr 2024"
  },
  {
    id: "EXP-88902",
    category: "Salaries",
    icon: Users,
    description: "Staff Salaries - Batch A",
    amount: 280000,
    method: "Net Banking",
    status: "Approved",
    date: "12 Apr 2024"
  },
  {
    id: "EXP-88903",
    category: "Marketing",
    icon: Tag,
    description: "Google Ads Campaign",
    amount: 15500,
    method: "Credit Card",
    status: "Pending",
    date: "18 Apr 2024"
  },
  {
    id: "EXP-88904",
    category: "Infrastructure",
    icon: Zap,
    description: "New Server Setup",
    amount: 32000,
    method: "UPI",
    status: "Approved",
    date: "10 Apr 2024"
  },
  {
    id: "EXP-88905",
    category: "Supplies",
    icon: ShoppingCart,
    description: "Stationery & Pantry",
    amount: 4200,
    method: "Cash",
    status: "Rejected",
    date: "05 Apr 2024"
  }
]

// ─── Sub-Components ──────────────────────────────────────────

function ExpenseStatCard({ title, value, icon: Icon, color, trend }: any) {
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
              <span className={cn("text-[9px] font-bold flex items-center shrink-0", trend.positive ? "text-emerald-500" : "text-amber-500")}>
                 {trend.positive ? <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> : <TrendingDown className="h-2.5 w-2.5 mr-0.5" />}
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

export default function FinanceExpensesPage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedExpenses.length === expensesData.length) {
      setSelectedExpenses([])
    } else {
      setSelectedExpenses(expensesData.map(e => e.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedExpenses.includes(id)) {
      setSelectedExpenses(selectedExpenses.filter(eid => eid !== id))
    } else {
      setSelectedExpenses([...selectedExpenses, id])
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
    const baseClass = "px-2 py-0.5 border-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest"
    switch (status) {
      case "Approved":
        return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> Approved</Badge>
      case "Pending":
        return <Badge className={cn(baseClass, "bg-amber-500/10 text-amber-600")}><Clock className="h-2.5 w-2.5" /> Pending</Badge>
      case "Rejected":
        return <Badge className={cn(baseClass, "bg-red-500/10 text-red-600")}><XCircle className="h-2.5 w-2.5" /> Rejected</Badge>
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
            Operational Burn
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Activity className="h-2.5 w-2.5 text-primary" />
            Expense reconciliation and outlay audit
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Plus className="h-3.5 w-3.5" />
            File Expense
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <ExpenseStatCard
          title="Total Outlay (MTD)" value="₹8.42L" icon={ShoppingCart}
          color={{ bg: "bg-red-500/10", text: "text-red-500", border: "border-l-red-500" }}
          trend={{ value: "12%", positive: false }}
        />
        <ExpenseStatCard
          title="Fixed Operating Cost" value="₹4.20L" icon={Home}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
        />
        <ExpenseStatCard
          title="Variable Outlay" value="₹1.15L" icon={Tag}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500", border: "border-l-amber-500" }}
          trend={{ value: "-4%", positive: true }}
        />
        <ExpenseStatCard
          title="Budget Utilization" value="74.2%" icon={Activity}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
        />
      </div>

      {/* Expense Ledger Card */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Expense Audit Trail</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Cataloging organizational outflows</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Find category or description..."
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
                    checked={selectedExpenses.length === expensesData.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Category Entity
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Reconciliation Info</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Financial Value</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Status</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {expensesData.map((exp, idx) => (
                  <motion.tr
                    key={exp.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedExpenses.includes(exp.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                       <Checkbox 
                        checked={selectedExpenses.includes(exp.id)}
                        onCheckedChange={() => toggleSelect(exp.id)}
                        className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                         <div className="h-8 w-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                            <exp.icon className="h-3.5 w-3.5" />
                         </div>
                         <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-foreground leading-tight truncate">{exp.category}</span>
                            <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest mt-0.5">{exp.id}</span>
                         </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                       <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-semibold text-foreground/80 tracking-tight">{exp.description}</span>
                          <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest leading-none">
                             {exp.date} <span className="opacity-40">|</span> {exp.method}
                          </div>
                       </div>
                    </td>
                    <td className="px-3 py-2.5">
                       <span className="font-bold text-foreground tracking-tight">{formatCurrency(exp.amount)}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                       <div className="flex justify-center">
                          {getStatusBadge(exp.status)}
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
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Outlay Ops</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Paperclip className="h-3 w-3" /> View Receipt
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer transition-colors">
                            <Activity className="h-3 w-3" /> Audit Log
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
                            <Trash2 className="h-3 w-3" /> Delete Entry
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

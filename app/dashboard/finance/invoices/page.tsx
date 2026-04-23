"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  Trash2,
  ArrowUpDown,
  Activity,
  TrendingUp,
  Receipt,
  Eye,
  Send,
  FileDown,
  AlertCircle
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

const invoicesData = [
  {
    id: "INV-2024-001",
    recipient: "Aarav Sharma",
    course: "Full Stack Dev",
    issueDate: "15 Apr 2024",
    dueDate: "25 Apr 2024",
    amount: 15000,
    status: "Paid",
    initials: "AS"
  },
  {
    id: "INV-2024-002",
    recipient: "Priya Patel",
    course: "UI/UX Design",
    issueDate: "18 Apr 2024",
    dueDate: "28 Apr 2024",
    amount: 25000,
    status: "Sent",
    initials: "PP"
  },
  {
    id: "INV-2024-003",
    recipient: "Rohan Mehta",
    course: "Data Science",
    issueDate: "10 Apr 2024",
    dueDate: "20 Apr 2024",
    amount: 32000,
    status: "Overdue",
    initials: "RM"
  },
  {
    id: "INV-2024-004",
    recipient: "Sneha Singh",
    course: "Cyber Security",
    issueDate: "20 Apr 2024",
    dueDate: "30 Apr 2024",
    amount: 18000,
    status: "Draft",
    initials: "SS"
  },
  {
    id: "INV-2024-005",
    recipient: "Ishaan Gupta",
    course: "Mobile App Dev",
    issueDate: "21 Apr 2024",
    dueDate: "01 May 2024",
    amount: 22000,
    status: "Paid",
    initials: "IG"
  }
]

// ─── Sub-Components ──────────────────────────────────────────

function InvoiceStatCard({ title, value, icon: Icon, color, trend }: any) {
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
                <TrendingUp className={cn("h-2.5 w-2.5 mr-0.5", !trend.positive && "rotate-180")} />
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

export default function FinanceInvoicesPage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedInvoices.length === invoicesData.length) {
      setSelectedInvoices([])
    } else {
      setSelectedInvoices(invoicesData.map(i => i.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedInvoices.includes(id)) {
      setSelectedInvoices(selectedInvoices.filter(iid => iid !== id))
    } else {
      setSelectedInvoices([...selectedInvoices, id])
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
      case "Paid":
        return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> Settled</Badge>
      case "Overdue":
        return <Badge className={cn(baseClass, "bg-red-500/10 text-red-600")}><AlertCircle className="h-2.5 w-2.5" /> Overdue</Badge>
      case "Sent":
        return <Badge className={cn(baseClass, "bg-blue-500/10 text-blue-600")}><Send className="h-2.5 w-2.5" /> Sent</Badge>
      case "Draft":
        return <Badge className={cn(baseClass, "bg-muted text-muted-foreground")}><Clock className="h-2.5 w-2.5" /> Draft</Badge>
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
            Billing & Invoices
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Activity className="h-2.5 w-2.5 text-primary" />
            Generating and managing client billing nodes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
            <FileDown className="h-3.5 w-3.5" />
            Batch Export
          </Button>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Plus className="h-3.5 w-3.5" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <InvoiceStatCard
          title="Overdue" value="₹240K" icon={AlertCircle}
          color={{ bg: "bg-red-500/10", text: "text-red-500", border: "border-l-red-500" }}
          trend={{ value: "+5%", positive: false }}
        />
        <InvoiceStatCard
          title="Net Invoiced" value="₹8.2M" icon={FileText}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
          trend={{ value: "12%", positive: true }}
        />
        <InvoiceStatCard
          title="Paid (MTD)" value="₹1.4M" icon={CreditCard}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
          trend={{ value: "18%", positive: true }}
        />
        <InvoiceStatCard
          title="Active Drafts" value="08" icon={Clock}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500", border: "border-l-amber-500" }}
        />
      </div>

      {/* Invoice Ledger Card */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Invoice Repository</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Automated billing and revenue tracking</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Find invoice # or student..."
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
                    checked={selectedInvoices.length === invoicesData.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Invoice Node
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Recipient Entity</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Lifecycle Dates</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Financial Value</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Status</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {invoicesData.map((invoice, idx) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedInvoices.includes(invoice.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                       <Checkbox 
                        checked={selectedInvoices.includes(invoice.id)}
                        onCheckedChange={() => toggleSelect(invoice.id)}
                        className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-foreground leading-tight tracking-tight">{invoice.id}</span>
                        <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest mt-0.5">Academic Billing</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 ring-1 ring-border/40 group-hover:ring-primary/20 shadow-sm transition-all duration-300">
                           <AvatarFallback className="bg-primary/5 text-primary text-[9px] font-bold">{invoice.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-foreground leading-tight truncate">{invoice.recipient}</span>
                          <span className="text-[9px] text-muted-foreground/60 font-medium uppercase tracking-tight truncate mt-0.5">
                            {invoice.course}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-foreground/70">
                          <span className="opacity-40 uppercase text-[8px] tracking-widest">Issued:</span> {invoice.issueDate}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-red-500/70">
                          <span className="opacity-40 uppercase text-[8px] tracking-widest">Due:</span> {invoice.dueDate}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-bold text-foreground tracking-tight">{formatCurrency(invoice.amount)}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(invoice.status)}
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
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Billing Ops</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Eye className="h-3 w-3" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Download className="h-3 w-3" /> Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
                            <Trash2 className="h-3 w-3" /> Void Invoice
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

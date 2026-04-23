"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CreditCard,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpDown,
  Download,
  Activity,
  TrendingUp,
  Wallet,
  Smartphone,
  Banknote,
  RotateCcw,
  Zap,
  ShieldCheck,
  Globe,
  Trash2
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

const paymentsData = [
  {
    txnId: "TXN-8829-192",
    gatewayId: "pay_xyz_123",
    payer: "Aarav Sharma",
    method: "UPI",
    methodIcon: Smartphone,
    amount: 15000,
    status: "Successful",
    timestamp: "22 Apr 2024, 02:30 PM",
    initials: "AS"
  },
  {
    txnId: "TXN-8829-193",
    gatewayId: "card_abc_456",
    payer: "Priya Patel",
    method: "Visa Card",
    methodIcon: CreditCard,
    amount: 5000,
    status: "Failed",
    timestamp: "22 Apr 2024, 01:15 PM",
    initials: "PP"
  },
  {
    txnId: "TXN-8829-194",
    gatewayId: "cash_001",
    payer: "Rohan Mehta",
    method: "Cash",
    methodIcon: Banknote,
    amount: 10000,
    status: "Successful",
    timestamp: "21 Apr 2024, 11:45 AM",
    initials: "RM"
  },
  {
    txnId: "TXN-8829-195",
    gatewayId: "pay_mno_789",
    payer: "Sneha Singh",
    method: "Net Banking",
    methodIcon: Globe,
    amount: 12000,
    status: "Refunded",
    timestamp: "20 Apr 2024, 04:20 PM",
    initials: "SS"
  },
  {
    txnId: "TXN-8829-196",
    gatewayId: "pay_pqr_111",
    payer: "Ishaan Gupta",
    method: "UPI",
    methodIcon: Smartphone,
    amount: 22000,
    status: "Successful",
    timestamp: "19 Apr 2024, 09:10 AM",
    initials: "IG"
  }
]

// ─── Sub-Components ──────────────────────────────────────────

function PaymentStatCard({ title, value, icon: Icon, color, trend }: any) {
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

export default function FinancePaymentsPage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTxns, setSelectedTxns] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedTxns.length === paymentsData.length) {
      setSelectedTxns([])
    } else {
      setSelectedTxns(paymentsData.map(p => p.txnId))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedTxns.includes(id)) {
      setSelectedTxns(selectedTxns.filter(tid => tid !== id))
    } else {
      setSelectedTxns([...selectedTxns, id])
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
      case "Successful":
        return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> Approved</Badge>
      case "Failed":
        return <Badge className={cn(baseClass, "bg-red-500/10 text-red-600")}><XCircle className="h-2.5 w-2.5" /> Declined</Badge>
      case "Refunded":
        return <Badge className={cn(baseClass, "bg-amber-500/10 text-amber-600")}><RotateCcw className="h-2.5 w-2.5" /> Reverted</Badge>
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
            <ShieldCheck className="h-5 w-5 text-primary" />
            Transaction Logs
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Zap className="h-2.5 w-2.5 text-primary" />
            Real-time multi-gateway treasury flow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
            <Download className="h-3.5 w-3.5" />
            Export Logs
          </Button>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Plus className="h-3.5 w-3.5" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <PaymentStatCard
          title="Success Rate" value="98.4%" icon={CheckCircle2}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
          trend={{ value: "0.2%", positive: true }}
        />
        <PaymentStatCard
          title="Net Volume" value="₹1.24Cr" icon={Wallet}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
          trend={{ value: "14%", positive: true }}
        />
        <PaymentStatCard
          title="Active Gateways" value="03" icon={Globe}
          color={{ bg: "bg-blue-500/10", text: "text-blue-500", border: "border-l-blue-500" }}
        />
        <PaymentStatCard
          title="Refunded" value="₹84K" icon={RotateCcw}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500", border: "border-l-amber-500" }}
        />
      </div>

      {/* Ledger Card */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Financial Treasury flow</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Cross-gateway synchronization & audit</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Find TXN ID or Payer..."
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
                    checked={selectedTxns.length === paymentsData.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Transaction ID
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Payer Entity</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Method & Origin</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Value</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Status</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {paymentsData.map((txn, idx) => (
                  <motion.tr
                    key={txn.txnId}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedTxns.includes(txn.txnId) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                      <Checkbox
                        checked={selectedTxns.includes(txn.txnId)}
                        onCheckedChange={() => toggleSelect(txn.txnId)}
                        className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-foreground leading-tight tracking-tight">{txn.txnId}</span>
                        <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest mt-0.5">{txn.gatewayId}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 ring-1 ring-border/40 group-hover:ring-primary/20 shadow-sm transition-all duration-300">
                          <AvatarFallback className="bg-primary/5 text-primary text-[9px] font-bold">{txn.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-foreground leading-tight truncate">{txn.payer}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-muted/30 text-muted-foreground">
                          <txn.methodIcon className="h-3 w-3" />
                        </div>
                        <span className="text-[10px] font-bold text-foreground/70 uppercase tracking-tight">{txn.method}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-bold text-foreground tracking-tight">{formatCurrency(txn.amount)}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(txn.status)}
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
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Gateway Ops</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Activity className="h-3 w-3" /> View Trace
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-amber-500 focus:text-white cursor-pointer">
                            <RotateCcw className="h-3 w-3" /> Initiate Refund
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
                            <Trash2 className="h-3 w-3" /> Flag Txn
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

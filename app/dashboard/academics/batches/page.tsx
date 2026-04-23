"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  ArrowUpDown,
  Download,
  Activity,
  TrendingUp,
  ShieldCheck,
  Globe
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

// ─── Mock Data (Based on Branch Schema) ──────────────────────

const branchesData = [
  {
    id: "BR-DEL-01",
    name: "New Delhi Main",
    code: "DELHI-CENTRAL",
    address: "12/A, Connaught Place, New Delhi",
    phone: "+91 11 2345 6789",
    email: "delhi.main@cims.com",
    manager: "Suresh Khanna",
    status: "Active",
    established: "15 Jan 2020"
  },
  {
    id: "BR-MUM-02",
    name: "Mumbai Suburban",
    code: "MUM-WEST",
    address: "B-402, Trade Square, Andheri West, Mumbai",
    phone: "+91 22 9876 5432",
    email: "mumbai.west@cims.com",
    manager: "Anjali Deshmukh",
    status: "Active",
    established: "10 Feb 2021"
  },
  {
    id: "BR-BLR-03",
    name: "Bangalore Tech Park",
    code: "BLR-IT",
    address: "Tech Tower, Electronic City, Bangalore",
    phone: "+91 80 4567 8901",
    email: "blr.tech@cims.com",
    manager: "Karthik R.",
    status: "Active",
    established: "22 May 2022"
  },
  {
    id: "BR-PNE-04",
    name: "Pune Hub",
    code: "PNE-CENTRAL",
    address: "Shivaji Nagar, Pune, Maharashtra",
    phone: "+91 20 1234 5678",
    email: "pune.hub@cims.com",
    manager: "Vikram S.",
    status: "Inactive",
    established: "05 Nov 2022"
  },
]

// ─── Sub-Components ──────────────────────────────────────────

function BranchStatCard({ title, value, icon: Icon, color, trend }: any) {
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

export default function AcademicsBranchesPage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBranches, setSelectedBranches] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedBranches.length === branchesData.length) {
      setSelectedBranches([])
    } else {
      setSelectedBranches(branchesData.map(b => b.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedBranches.includes(id)) {
      setSelectedBranches(selectedBranches.filter(bid => bid !== id))
    } else {
      setSelectedBranches([...selectedBranches, id])
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-0.5 border-0 flex items-center gap-1 text-[9px] font-bold uppercase tracking-tighter"
    if (status === "Active") {
      return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> Active</Badge>
    }
    return <Badge className={cn(baseClass, "bg-red-500/10 text-red-600")}><XCircle className="h-2.5 w-2.5" /> Inactive</Badge>
  }

  return (
    <div className="flex flex-col gap-6 p-1 pb-10">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Branch Network
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <Globe className="h-2.5 w-2.5 text-primary" />
            Multi-branch geographic management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-2 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
            <Download className="h-3.5 w-3.5" />
            Export Data
          </Button>
          <Button size="sm" className="h-8 gap-2 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Plus className="h-3.5 w-3.5" />
            Register Branch
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <BranchStatCard
          title="Total Branches" value="12" icon={Building2}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
          trend="+2"
        />
        <BranchStatCard
          title="Active Units" value="10" icon={ShieldCheck}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
        />
        <BranchStatCard
          title="Avg. Revenue" value="₹4.2M" icon={Activity}
          color={{ bg: "bg-blue-500/10", text: "text-blue-500", border: "border-l-blue-500" }}
          trend="8.1%"
        />
        <BranchStatCard
          title="Branch Managers" value="12" icon={User}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500", border: "border-l-amber-500" }}
        />
      </div>

      {/* Main Table Card */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Geographic Directory</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Infrastructure & Node Management</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search branch code or name..."
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
                    checked={selectedBranches.length === branchesData.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Branch Entity
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Communication</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Management</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Status</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {branchesData.map((branch, idx) => (
                  <motion.tr
                    key={branch.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedBranches.includes(branch.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                       <Checkbox 
                        checked={selectedBranches.includes(branch.id)}
                        onCheckedChange={() => toggleSelect(branch.id)}
                        className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                           <Building2 className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-foreground leading-tight truncate">{branch.name}</span>
                          <span className="text-[9px] text-muted-foreground/60 flex items-center gap-1 font-bold uppercase tracking-widest mt-0.5">
                            {branch.code}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-[10px] text-foreground/80 font-medium">
                          <Mail className="h-2.5 w-2.5 text-primary/40" />
                          {branch.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                          <Phone className="h-2.5 w-2.5 text-primary/40" />
                          {branch.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                           <AvatarFallback className="text-[8px] font-bold bg-primary/10 text-primary">BM</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-semibold text-foreground/80 tracking-tight">{branch.manager}</span>
                           <span className="text-[8px] text-muted-foreground font-medium uppercase tracking-tighter">Branch Manager</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(branch.status)}
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
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Infrastructure</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer transition-colors">
                            <Edit className="h-3 w-3" /> Update Config
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer transition-colors">
                            <MapPin className="h-3 w-3" /> View Address
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
                            <Trash2 className="h-3 w-3" /> Decommission
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
          totalItems={4}
          pageSize={10}
          onPageChange={setCurrentPage}
          className="border-t border-border/30 bg-muted/5"
        />
      </Card>
    </div>
  )
}

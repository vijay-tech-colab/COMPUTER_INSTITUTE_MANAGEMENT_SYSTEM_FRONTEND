"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Users,
  GraduationCap,
  Banknote,
  Activity,
  History,
  Filter,
  Download,
  Calendar,
  Layers,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  MousePointer2,
  PieChart,
  LineChart,
  Map,
  MoreHorizontal,
  ChevronRight,
  Sparkle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ─── Sub-Components ──────────────────────────────────────────

function AnalyticsKPI({ title, value, subValue, icon: Icon, color, trend }: any) {
  const { glassEnabled } = useTheme();

  return (
    <Card className={cn(
      "border-border/40 overflow-hidden relative group transition-all duration-500",
      glassEnabled ? "bg-card/40 backdrop-blur-xl" : "bg-card",
      "p-4 hover:shadow-2xl hover:shadow-primary/10 border-l-4",
      color.border
    )}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tighter">{value}</h3>
            {trend && (
              <span className={cn("text-[10px] font-bold flex items-center", trend.positive ? "text-emerald-500" : "text-amber-500")}>
                {trend.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
                {trend.value}
              </span>
            )}
          </div>
          <p className="text-[10px] font-semibold text-muted-foreground/60">{subValue}</p>
        </div>
        <div className={cn("p-2.5 rounded-2xl transition-transform group-hover:scale-110 shadow-sm", color.bg)}>
          <Icon className={cn("h-5 w-5", color.text)} />
        </div>
      </div>
      {/* Visual underline for high density */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </Card>
  )
}

function MiniSparkline({ color }: { color: string }) {
  return (
    <div className="h-10 w-full flex items-end gap-[2px] opacity-30">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${Math.random() * 100}%` }}
          transition={{ delay: i * 0.05, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className={cn("flex-1 rounded-t-[1px]", color)}
        />
      ))}
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────

export default function AnalyticsPage() {
  const { glassEnabled } = useTheme()
  const [timeRange, setTimeRange] = useState("Last 30 Days")

  return (
    <div className="flex flex-col gap-6 p-1 pb-10">

      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tight flex items-center gap-3"
          >
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="h-6 w-6" />
            </div>
            Intelligence Matrix
          </motion.h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-5 px-2 bg-primary/5 border-primary/20 text-[9px] font-bold uppercase tracking-widest text-primary animate-pulse">
              System Live
            </Badge>
            <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
              Advanced cross-branch data aggregation enabled
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2 rounded-xl border-border/40 bg-card/40 backdrop-blur-md text-[11px] font-bold">
                <Calendar className="h-4 w-4 text-primary" />
                {timeRange}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] rounded-xl border-border/40 backdrop-blur-xl bg-card/90">
              {["Last 7 Days", "Last 30 Days", "Fiscal Year", "All Time"].map((range) => (
                <DropdownMenuItem key={range} onClick={() => setTimeRange(range)} className="text-[11px] font-semibold py-2 cursor-pointer">
                  {range}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-border/40 hover:bg-primary/5">
            <Download className="h-4 w-4" />
          </Button>
          <Button size="sm" className="h-9 gap-2 rounded-xl shadow-xl shadow-primary/20 font-bold px-5 text-[11px] uppercase tracking-widest">
            <Sparkle className="h-4 w-4" />
            AI Insight
          </Button>
        </div>
      </div>

      {/* KPI Overlays */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsKPI
          title="Total Treasury" value="₹2.84 Cr" subValue="Across all 5 branches" icon={Banknote}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
          trend={{ value: "12.4%", positive: true }}
        />
        <AnalyticsKPI
          title="Active Students" value="4,829" subValue="84% Engagement rate" icon={Users}
          color={{ bg: "bg-blue-500/10", text: "text-blue-500", border: "border-l-blue-500" }}
          trend={{ value: "4.1%", positive: true }}
        />
        <AnalyticsKPI
          title="Conversion" value="68.2%" subValue="Enquiry to Admission" icon={Target}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
          trend={{ value: "2.5%", positive: true }}
        />
        <AnalyticsKPI
          title="Deficit Risk" value="₹4.2L" subValue="Pending overdue fees" icon={Activity}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500", border: "border-l-amber-500" }}
          trend={{ value: "1.2%", positive: false }}
        />
      </div>

      {/* Deep Dive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Financial velocity chart placeholder */}
        <Card className={cn(
          "lg:col-span-2 border-border/40 overflow-hidden flex flex-col shadow-xl",
          glassEnabled ? "bg-card/40 backdrop-blur-xl" : "bg-card shadow-sm"
        )}>
          <CardHeader className="px-6 py-4 border-b border-border/30 bg-muted/5 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold tracking-tight">Financial Velocity</CardTitle>
              <CardDescription className="text-[10px] font-semibold uppercase tracking-widest opacity-60">Revenue vs. Operating Outlay (12 Months)</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary" /> <span className="text-[9px] font-bold uppercase tracking-tighter">Net</span></div>
              <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-blue-500" /> <span className="text-[9px] font-bold uppercase tracking-tighter">Target</span></div>
            </div>
          </CardHeader>
          <CardContent className="p-8 flex flex-col justify-end min-h-[340px] relative">
            <div className="flex-1 flex items-end gap-3 px-2">
              {[40, 65, 45, 80, 55, 90, 75, 45, 60, 85, 95, 70].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-1 items-center group cursor-pointer">
                  <motion.div
                    className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden flex items-end"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                  >
                    <div className="w-full bg-primary h-[80%] rounded-t-lg transition-all group-hover:brightness-125" />
                  </motion.div>
                  <span className="text-[8px] font-bold text-muted-foreground/50 uppercase tracking-tighter">
                    {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                  </span>
                </div>
              ))}
            </div>
            {/* Value tooltips layer */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity">
              <Layers className="h-32 w-32" />
            </div>
          </CardContent>
        </Card>

        {/* Course distribution */}
        <Card className={cn(
          "border-border/40 shadow-xl overflow-hidden",
          glassEnabled ? "bg-card/40 backdrop-blur-xl" : "bg-card"
        )}>
          <CardHeader className="px-6 py-4 border-b border-border/30">
            <CardTitle className="text-base font-bold tracking-tight">Academic Integrity</CardTitle>
            <CardDescription className="text-[10px] font-semibold uppercase tracking-widest opacity-60">Distribution across verticals</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {[
              { name: "Web Stack Pro", count: 1240, color: "bg-primary", pct: 85 },
              { name: "UI/UX Mastery", count: 840, color: "bg-blue-500", pct: 60 },
              { name: "Python AI/DS", count: 620, color: "bg-emerald-500", pct: 45 },
              { name: "Foundation", count: 480, color: "bg-amber-500", pct: 30 }
            ].map((course, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-[11px] font-bold tracking-tight">
                  <span>{course.name}</span>
                  <span className="text-muted-foreground">{course.count}</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.pct}%` }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                    className={cn("h-full rounded-full transition-all", course.color)}
                  />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-border/30">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                <span>Performance Index</span>
                <ChevronRight className="h-3 w-3" />
              </div>
              <div className="flex gap-1">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={cn("h-6 flex-1 rounded-sm", i < 9 ? "bg-emerald-500/20" : "bg-amber-500/20")} />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Tertiary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Branch Velocity */}
        <Card className={cn(
          "border-border/40 shadow-xl",
          glassEnabled ? "bg-card/40 backdrop-blur-xl" : "bg-card shadow-sm"
        )}>
          <CardHeader className="px-6 py-4 border-b border-border/30 bg-muted/5">
            <CardTitle className="text-sm font-bold tracking-tight uppercase tracking-[0.1em]">Branch Performance Matrix</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-muted/10 border-b border-border/20">
                  <th className="px-6 py-3 font-bold text-muted-foreground uppercase text-[9px] tracking-widest">Branch Node</th>
                  <th className="px-6 py-3 font-bold text-muted-foreground uppercase text-[9px] tracking-widest">Load</th>
                  <th className="px-6 py-3 font-bold text-muted-foreground uppercase text-[9px] tracking-widest">Revenue</th>
                  <th className="px-6 py-3 font-bold text-muted-foreground uppercase text-[9px] tracking-widest text-right">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/10">
                {[
                  { node: "New Delhi Main", load: "1,240", rev: "₹82L", health: 98 },
                  { node: "Mumbai Sub", load: "842", rev: "₹54L", health: 94 },
                  { node: "Bangalore", load: "620", rev: "₹42L", health: 89 }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-3 font-bold">{row.node}</td>
                    <td className="px-6 py-3 font-semibold text-muted-foreground">{row.load}</td>
                    <td className="px-6 py-3 font-bold text-primary">{row.rev}</td>
                    <td className="px-6 py-3 text-right">
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-0 text-[10px] uppercase font-bold py-0 h-5">
                        {row.health}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Intelligence Feed */}
        <Card className={cn(
          "border-border/40 shadow-xl",
          glassEnabled ? "bg-card/40 backdrop-blur-xl" : "bg-card shadow-sm"
        )}>
          <CardHeader className="px-6 py-4 border-b border-border/30 bg-muted/5 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold tracking-tight uppercase tracking-[0.1em] flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-primary" />
              Recent Intelligence
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/10">
              {[
                { msg: "Revenue anomaly detected in Batch C-4 (Delhi)", category: "TREASURY", time: "2m ago", color: "text-amber-500" },
                { msg: "Admission spike (24%) after Google Ads rollout", category: "MARKETING", time: "14m ago", color: "text-emerald-500" },
                { msg: "Branch New Delhi exceeded capacity threshold", category: "OPERATIONS", time: "1h ago", color: "text-blue-500" }
              ].map((log, i) => (
                <div key={i} className="px-6 py-3 flex items-start gap-4 hover:bg-muted/10 transition-colors">
                  <div className={cn("mt-1.5 h-1.5 w-1.5 rounded-full shrink-0", log.color.replace("text", "bg"))} />
                  <div className="flex-1 space-y-0.5">
                    <p className="text-[11px] font-semibold text-foreground tracking-tight">{log.msg}</p>
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      <span className={log.color}>{log.category}</span>
                      <span className="opacity-40">•</span>
                      <span>{log.time}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground/20 group-hover:text-primary" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

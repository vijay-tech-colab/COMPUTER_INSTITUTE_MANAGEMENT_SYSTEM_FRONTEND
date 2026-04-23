"use client"

import React from "react"
import {
  Users,
  GraduationCap,
  Wallet,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Bell,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2 as Building,
  Layers,
  BadgeAlert,
  UserCheck,
  ChevronRight,
  Search,
  LayoutDashboard
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"

// ─── Mock Data ───────────────────────────────────────────────

const enrollmentData = [
  { month: "Aug", students: 120, staff: 18 },
  { month: "Sep", students: 145, staff: 20 },
  { month: "Oct", students: 160, staff: 20 },
  { month: "Nov", students: 155, staff: 22 },
  { month: "Dec", students: 130, staff: 22 },
  { month: "Jan", students: 170, staff: 24 },
  { month: "Feb", students: 190, staff: 25 },
  { month: "Mar", students: 220, staff: 25 },
  { month: "Apr", students: 248, staff: 27 },
]

const recentActivities = [
  { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", text: "Aarav Sharma enrolled in CS batch", time: "2m ago" },
  { icon: Bell, color: "text-primary", bg: "bg-primary/10", text: "Fee payment received — Priya Patel ₹25k", time: "18m ago" },
  { icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", text: "Exam scheduled: Web Dev final on 25th Apr", time: "1h ago" },
  { icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10", text: "3 students have pending fee dues", time: "3h ago" },
]

const recentStudents = [
  { name: "Aarav Sharma", course: "Computer Science", status: "Active", initials: "AS" },
  { name: "Priya Patel", course: "Web Development", status: "Active", initials: "PP" },
  { name: "Rohan Mehta", course: "Data Science", status: "Pending", initials: "RM" },
  { name: "Sneha Singh", course: "Cyber Security", status: "Active", initials: "SS" },
]

// ─── Sub-Components ──────────────────────────────────────────

const MiniTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border/50 bg-background/80 backdrop-blur-md px-3 py-2 shadow-xl text-[10px]">
      <p className="font-bold text-foreground mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
            <span className="text-muted-foreground">{p.name}</span>
          </div>
          <span className="font-bold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

function StatCard({ title, value, change, icon: Icon, color, positive = true }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className="border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden p-3.5 hover:shadow-lg hover:shadow-primary/5 transition-all">
        <div className="flex items-center justify-between mb-2">
          <div className={cn("p-2 rounded-lg", color.bg)}>
            <Icon className={cn("h-4 w-4", color.text)} />
          </div>
          <div className={cn("flex items-center text-[10px] font-bold", positive ? "text-emerald-500" : "text-red-500")}>
            {positive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
            {change}
          </div>
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
          <p className="text-xl font-bold tracking-tight">{value}</p>
        </div>
      </Card>
    </motion.div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuthContext();
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col gap-6 p-1 pb-10 scrollbar-hide">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            Welcome back, {user?.name.split(' ')[0] || "Admin"}
          </h1>
          <p className="text-xs text-muted-foreground font-medium">{today} · <span className="text-primary italic">Branch: {user?.branch?.name || "Main Campus"}</span></p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search data..."
              className="h-9 w-[200px] lg:w-[300px] pl-9 bg-card/50 border-border/50 rounded-xl focus-visible:ring-primary/20"
            />
          </div>
          <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl border-border/50 bg-card/50">
            <Calendar className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students" value="1,248" change="+12.5%" icon={GraduationCap}
          color={{ bg: "bg-primary/10", text: "text-primary" }}
        />
        <StatCard
          title="Active Staff" value="84" change="+2.4%" icon={Users}
          color={{ bg: "bg-blue-500/10", text: "text-blue-500" }}
        />
        <StatCard
          title="Monthly Revenue" value="₹4.2L" change="+18.2%" icon={Wallet}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500" }}
        />
        <StatCard
          title="Course Batches" value="32" change="-5.1%" icon={Layers}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500" }}
          positive={false}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Main Chart Column */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-border/30">
              <div className="space-y-0.5">
                <CardTitle className="text-base font-bold">Enrollment Analytics</CardTitle>
                <CardDescription className="text-[11px]">Overview of staff & student growth per month</CardDescription>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 font-bold text-[10px]">REAL-TIME</Badge>
            </CardHeader>
            <CardContent className="p-6 pt-8">
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={enrollmentData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip content={<MiniTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="students"
                      name="Students"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      fill="url(#primaryGradient)"
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="staff"
                      name="Staff"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="transparent"
                      opacity={0.4}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Admissions Card */}
            <Card className="border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden">
              <CardHeader className="px-5 py-4 border-b border-border/30 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold">New Admissions</CardTitle>
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <UserCheck className="h-3.5 w-3.5" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/20">
                  {recentStudents.map((s, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-primary/5 transition-colors group">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 ring-1 ring-border shadow-sm group-hover:scale-110 transition-transform">
                          <AvatarFallback className="bg-muted text-[10px] font-bold text-primary">{s.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate">{s.name}</p>
                          <p className="text-[10px] text-muted-foreground font-medium truncate">{s.course}</p>
                        </div>
                      </div>
                      <Badge className={cn(
                        "h-5 text-[9px] font-bold px-2 border-0",
                        s.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                      )}>
                        {s.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border/20 text-center">
                  <button className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 mx-auto">
                    VIEW DIRECTORY <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Fee Status Card */}
            <Card className="border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden">
              <CardHeader className="px-5 py-4 border-b border-border/30 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold">Fee Tracking</CardTitle>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
              </CardHeader>
              <CardContent className="p-5 flex flex-col items-center justify-center space-y-4">
                <div className="relative h-32 w-32 flex items-center justify-center">
                  <svg className="h-full w-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-muted/20" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={364} strokeDashoffset={72} strokeLinecap="round" className="text-primary transition-all duration-1000" />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-lg font-black leading-none">82%</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase">Collected</p>
                  </div>
                </div>
                <div className="flex gap-6 w-full justify-between">
                  <div className="text-center">
                    <p className="text-xs font-bold">₹12.5L</p>
                    <p className="text-[9px] font-medium text-muted-foreground uppercase">Target</p>
                  </div>
                  <div className="h-8 w-px bg-border/40" />
                  <div className="text-center">
                    <p className="text-xs font-bold text-primary">₹10.2L</p>
                    <p className="text-[9px] font-medium text-muted-foreground uppercase">Paid</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Sidebar */}
        <div className="space-y-6">
          <Card className="border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden h-full">
            <CardHeader className="px-5 py-4 border-b border-border/30 bg-muted/20 flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-bold">Live Stream</CardTitle>
                <CardDescription className="text-[10px]">Recent activity & system alerts</CardDescription>
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-sm" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-dashed divide-border/30">
                {recentActivities.map((a, i) => (
                  <div key={i} className="p-4 hover:bg-muted/30 transition-colors relative group">
                    <div className="flex gap-3">
                      <div className={cn("h-8 w-8 shrink-0 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", a.bg)}>
                        <a.icon className={cn("h-4 w-4", a.color)} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-[11px] font-black text-foreground leading-snug">{a.text}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground uppercase tracking-tight">
                          <Clock className="h-2.5 w-2.5" /> {a.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border/20">
                <button className="w-full py-2.5 rounded-xl bg-primary text-white text-[11px] font-black tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all">
                  FULL AUDIT LOG
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/90 to-primary text-white shadow-xl border-none p-5 overflow-hidden relative">
            <div className="relative z-10 space-y-3 pt-6">
              <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <BadgeAlert className="h-5 w-5 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm">System Update v1.02</h3>
                <p className="text-[10px] text-white/80 leading-relaxed font-medium">New student attendance module is now active for Main Campus. Check permissions settings to enable.</p>
              </div>
              <button className="w-full py-2 bg-white text-primary rounded-lg text-[10px] font-bold hover:bg-opacity-90 transition-colors">
                LEARN WHAT&apos;S NEW
              </button>
            </div>
            <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-24 w-24 bg-black/10 rounded-full blur-2xl" />
          </Card>
        </div>

      </div>
    </div>
  )
}

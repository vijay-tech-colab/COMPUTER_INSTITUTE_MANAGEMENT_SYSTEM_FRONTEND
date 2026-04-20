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
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

const revenueData = [
  { month: "Aug", fees: 180, expenses: 75 },
  { month: "Sep", fees: 220, expenses: 82 },
  { month: "Oct", fees: 205, expenses: 90 },
  { month: "Nov", fees: 195, expenses: 88 },
  { month: "Dec", fees: 165, expenses: 95 },
  { month: "Jan", fees: 240, expenses: 80 },
  { month: "Feb", fees: 260, expenses: 85 },
  { month: "Mar", fees: 280, expenses: 92 },
  { month: "Apr", fees: 295, expenses: 88 },
]

const courseDistribution = [
  { name: "CS", value: 38, color: "#6366f1" },
  { name: "Web Dev", value: 27, color: "#8b5cf6" },
  { name: "Data Science", value: 18, color: "#a78bfa" },
  { name: "Cyber Sec", value: 12, color: "#c4b5fd" },
  { name: "Others", value: 5, color: "#e5e7eb" },
]

const attendanceData = [
  { day: "Mon", p: 92 },
  { day: "Tue", p: 88 },
  { day: "Wed", p: 95 },
  { day: "Thu", p: 90 },
  { day: "Fri", p: 85 },
  { day: "Sat", p: 70 },
]

const recentStudents = [
  { name: "Aarav Sharma", course: "Computer Science", status: "active" },
  { name: "Priya Patel", course: "Web Dev", status: "active" },
  { name: "Rohan Mehta", course: "Data Science", status: "pending" },
  { name: "Sneha Singh", course: "Cyber Security", status: "active" },
  { name: "Vikram Joshi", course: "CS", status: "inactive" },
]

const recentActivities = [
  { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "Aarav Sharma enrolled in CS batch", time: "2m ago" },
  { icon: Bell, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/40", text: "Fee payment received — Priya Patel ₹25k", time: "18m ago" },
  { icon: Clock, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40", text: "Exam scheduled: Web Dev final on 25th Apr", time: "1h ago" },
  { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/40", text: "3 students have pending fee dues", time: "3h ago" },
  { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "Staff leave approved: Rahul Kumar", time: "Yesterday" },
]

// ─── Tiny Tooltip ─────────────────────────────────────────────

const MiniTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-background/95 backdrop-blur-sm px-2.5 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-0.5">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="flex items-center gap-1.5" style={{ color: p.color }}>
          <span className="h-1.5 w-1.5 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <span className="font-medium text-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

// ─── Slim Stat Card ─────────────────────────────────────────────

function StatCard({ title, value, change, icon: Icon, color, positive = true }: {
  title: string; value: string; change: string; icon: React.ElementType
  color: { dot: string; bg: string; text: string }; positive?: boolean
}) {
  return (
    <Card className="border-border/40 hover:border-border/80 hover:shadow-sm transition-all duration-200 group">
      <CardContent className="px-3.5 py-3">
        <div className="flex items-center gap-2.5">
          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${color.bg}`}>
            <Icon className={`h-3.5 w-3.5 ${color.text}`} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium truncate">{title}</p>
            <div className="flex items-end justify-between gap-1">
              <p className="text-base font-bold leading-tight tracking-tight">{value}</p>
              <div className={`flex items-center gap-0.5 text-[10px] font-medium shrink-0 ${positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                {positive ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                {change}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Page ─────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-4">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-5 py-3.5 text-white shadow">
        <div className="relative z-10">
          <p className="text-[10px] font-medium text-indigo-200 uppercase tracking-wider">Monday, 21 April 2026</p>
          <h1 className="mt-0.5 text-base font-bold">Welcome back, Admin 👋</h1>
          <p className="text-[11px] text-indigo-100/90 max-w-sm">
            <span className="font-semibold text-white">3 pending tasks</span> · <span className="font-semibold text-white">5 admissions</span> awaiting approval
          </p>
        </div>
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute right-10 -bottom-4 h-14 w-14 rounded-full bg-white/5" />
        <div className="absolute right-28 top-2 h-7 w-7 rounded-full bg-white/10" />
      </div>

      {/* Stats — 8 slim cards */}
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 xl:grid-cols-8">
        <StatCard title="Students" value="248" change="+12%" icon={GraduationCap}
          color={{ dot: "", bg: "bg-indigo-100 dark:bg-indigo-950/50", text: "text-indigo-600 dark:text-indigo-400" }} positive />
        <StatCard title="Staff" value="27" change="+2" icon={Users}
          color={{ dot: "", bg: "bg-violet-100 dark:bg-violet-950/50", text: "text-violet-600 dark:text-violet-400" }} positive />
        <StatCard title="Revenue" value="₹2.95L" change="+5.4%" icon={Wallet}
          color={{ dot: "", bg: "bg-emerald-100 dark:bg-emerald-950/50", text: "text-emerald-600 dark:text-emerald-400" }} positive />
        <StatCard title="Courses" value="14" change="-1" icon={BookOpen}
          color={{ dot: "", bg: "bg-amber-100 dark:bg-amber-950/50", text: "text-amber-600 dark:text-amber-400" }} positive={false} />
        <StatCard title="Branches" value="3" change="+1" icon={Building}
          color={{ dot: "", bg: "bg-sky-100 dark:bg-sky-950/50", text: "text-sky-600 dark:text-sky-400" }} positive />
        <StatCard title="Batches" value="18" change="+3" icon={Layers}
          color={{ dot: "", bg: "bg-pink-100 dark:bg-pink-950/50", text: "text-pink-600 dark:text-pink-400" }} positive />
        <StatCard title="Pending Fees" value="₹41k" change="+8k" icon={BadgeAlert}
          color={{ dot: "", bg: "bg-red-100 dark:bg-red-950/50", text: "text-red-500 dark:text-red-400" }} positive={false} />
        <StatCard title="Attendance" value="89%" change="+2%" icon={UserCheck}
          color={{ dot: "", bg: "bg-teal-100 dark:bg-teal-950/50", text: "text-teal-600 dark:text-teal-400" }} positive />
      </div>


      {/* Charts Row 1 */}
      <div className="grid gap-3 lg:grid-cols-3">
        {/* Area Chart */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="p-4 pb-1">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Enrollment Trend</CardTitle>
                <CardDescription className="text-[11px]">Monthly students & staff count</CardDescription>
              </div>
              <Badge variant="secondary" className="gap-1 text-[10px] px-1.5 py-0.5 h-5">
                <TrendingUp className="h-2.5 w-2.5 text-emerald-500" /> +23% YTD
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={enrollmentData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="gs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gst" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip content={<MiniTooltip />} />
                <Area type="monotone" dataKey="students" name="Students" stroke="#6366f1" strokeWidth={2} fill="url(#gs)" dot={false} activeDot={{ r: 3 }} />
                <Area type="monotone" dataKey="staff" name="Staff" stroke="#8b5cf6" strokeWidth={1.5} fill="url(#gst)" dot={false} activeDot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="border-border/50">
          <CardHeader className="p-4 pb-1">
            <CardTitle className="text-sm font-semibold">Course Mix</CardTitle>
            <CardDescription className="text-[11px]">Students by course</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <ResponsiveContainer width="100%" height={130}>
              <PieChart>
                <Pie data={courseDistribution} cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={3} dataKey="value">
                  {courseDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-1 gap-1">
              {courseDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className="text-muted-foreground truncate">{item.name}</span>
                  </div>
                  <span className="font-semibold ml-2">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-3 lg:grid-cols-3">
        {/* Bar Chart */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="p-4 pb-1">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Revenue vs Expenses</CardTitle>
                <CardDescription className="text-[11px]">Monthly in ₹ thousands</CardDescription>
              </div>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 h-5">Net +₹2.07L</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={revenueData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip content={<MiniTooltip />} />
                <Bar dataKey="fees" name="Revenue (₹k)" fill="#6366f1" radius={[3, 3, 0, 0]} maxBarSize={22} />
                <Bar dataKey="expenses" name="Expenses (₹k)" fill="#e2e8f0" radius={[3, 3, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance */}
        <Card className="border-border/50">
          <CardHeader className="p-4 pb-1">
            <CardTitle className="text-sm font-semibold">Attendance</CardTitle>
            <CardDescription className="text-[11px]">This week (%) </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={attendanceData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip content={<MiniTooltip />} />
                <Bar dataKey="p" name="Present %" fill="#10b981" radius={[3, 3, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-3 lg:grid-cols-3">
        {/* Recent Students */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Recent Admissions</CardTitle>
                <CardDescription className="text-[11px]">Latest enrolled students</CardDescription>
              </div>
              <span className="text-[11px] text-indigo-500 hover:underline cursor-pointer font-medium">View all →</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-0.5">
              {recentStudents.map((s, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg px-2.5 py-2 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-indigo-100 text-indigo-700 text-[10px] font-bold dark:bg-indigo-950 dark:text-indigo-300">
                        {s.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-medium leading-none">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.course}</p>
                    </div>
                  </div>
                  <Badge
                    className={`text-[10px] px-1.5 py-0 h-4 capitalize font-medium border ${
                      s.status === "active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : s.status === "pending"
                        ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                    variant="outline"
                  >
                    {s.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-border/50">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold">Activity</CardTitle>
            <CardDescription className="text-[11px]">Latest system events</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${a.bg}`}>
                    <a.icon className={`h-3 w-3 ${a.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-foreground leading-snug">{a.text}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5" /> {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

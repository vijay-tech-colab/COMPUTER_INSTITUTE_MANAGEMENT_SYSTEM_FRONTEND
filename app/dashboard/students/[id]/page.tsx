"use client"

import React, { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Mail,
  Smartphone,
  MapPin,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  PhoneCall,
  Download,
  Share2,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  CreditCard,
  Building,
  GraduationCap,
  History,
  FileText,
  User,
  Zap,
  Activity,
  Award,
  Database,
  Fingerprint
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchStudentById, clearCurrentStudent } from "@/redux/slices/studentSlice"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTheme } from "@/context/ThemeContext"

export default function StudentDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { glassEnabled } = useTheme()
  const { currentStudent: student, loading } = useAppSelector((state) => state.students)

  useEffect(() => {
    if (id) dispatch(fetchStudentById(id as string))
    return () => { dispatch(clearCurrentStudent()) }
  }, [id, dispatch])

  if (loading && !student) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <div className="h-6 w-6 rounded-full border-2 border-primary/10 border-t-primary animate-spin" />
        <p className="text-[8px] font-black tracking-[0.2em] text-slate-300 uppercase">SYNCHRONIZING</p>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-100"><GraduationCap className="h-5 w-5" /></div>
        <h2 className="text-[8px] font-black tracking-[0.3em] uppercase text-slate-300">NULL_REFERENCE</h2>
        <Button onClick={() => router.back()} variant="ghost" className="h-7 text-[8px] font-black uppercase tracking-widest border border-slate-100 rounded-lg">RESTORE</Button>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "px-1.5 py-0 border-none flex items-center gap-1 text-[6.5px] font-black uppercase tracking-[0.15em] rounded-full shadow-sm"
    switch (status?.toLowerCase()) {
      case "active": return <Badge className={cn(baseClass, "bg-emerald-500 text-white")}>ACTIVE</Badge>
      case "pending": return <Badge className={cn(baseClass, "bg-amber-500 text-white")}>PENDING</Badge>
      case "inactive": return <Badge className={cn(baseClass, "bg-rose-500 text-white")}>INACTIVE</Badge>
      default: return <Badge className={cn(baseClass, "bg-slate-900 text-white")}>{status?.toUpperCase() || "ACTIVE"}</Badge>
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="px-4 md:px-8 py-3 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-all border border-slate-100">
              <ArrowLeft className="h-3 w-3" />
            </button>
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 rounded-xl border border-slate-100 shadow-sm ring-2 ring-slate-50">
                <AvatarImage src={student.user?.avatar?.url === "default-url" ? "" : student.user?.avatar?.url} />
                <AvatarFallback className="bg-slate-50 text-slate-400 font-black text-[10px]">{student.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-xs font-black tracking-tighter text-slate-900 uppercase truncate max-w-[120px] sm:max-w-none">{student.user?.name}</h1>
                  {getStatusBadge(student.user?.status)}
                </div>
                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                   {student.registrationNo} • {student.branch?.name?.toUpperCase() || student.branch?.toUpperCase() || "MAIN"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
             <Button variant="outline" className="h-7 px-3 rounded-lg border-slate-100 text-[8px] font-black uppercase tracking-widest gap-1.5 bg-white shadow-sm">
                <Edit className="h-3 w-3" /> <span className="hidden sm:inline">EDIT</span>
             </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="outline" size="icon" className="h-7 w-7 rounded-lg border-slate-100 text-slate-300 hover:text-primary bg-white shadow-sm">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                   </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px] rounded-xl border-slate-100 p-1.5 shadow-2xl backdrop-blur-lg bg-white/90">
                   <DropdownMenuItem className="gap-2 text-[8.5px] font-black uppercase p-2 rounded-lg cursor-pointer"><FileText className="h-3.5 w-3.5" /> ID_CARD</DropdownMenuItem>
                   <DropdownMenuItem className="gap-2 text-[8.5px] font-black uppercase p-2 rounded-lg cursor-pointer"><Share2 className="h-3.5 w-3.5" /> EXPORT</DropdownMenuItem>
                   <DropdownMenuSeparator className="bg-slate-100/50" />
                   <DropdownMenuItem className="gap-2 text-[8.5px] font-black uppercase p-2 rounded-lg cursor-pointer text-rose-500 focus:text-white focus:bg-rose-500"><Trash2 className="h-3.5 w-3.5" /> DELETE</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[1400px] mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* DATA SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="space-y-4">
              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest px-1">STUDENT_MANIFEST</p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: "EMAIL", value: student.user?.email, icon: Mail, color: "text-indigo-500", bg: "bg-indigo-50" },
                  { label: "PHONE", value: student.user?.phone, icon: Smartphone, color: "text-emerald-500", bg: "bg-emerald-50" },
                  { label: "JOINED", value: new Date(student.createdAt).toLocaleDateString(), icon: Calendar, color: "text-amber-500", bg: "bg-amber-50" },
                  { label: "LOCATION", value: typeof student.address === "object" ? student.address?.current : student.address || "N/A", icon: MapPin, color: "text-rose-500", bg: "bg-rose-50" },
                ].map((info, i) => (
                  <div key={i} className="flex gap-3 group">
                    <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center border border-slate-100 shrink-0 shadow-sm transition-transform group-hover:scale-105", info.bg, info.color)}><info.icon className="h-3 w-3" /></div>
                    <div className="space-y-0 overflow-hidden">
                      <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-tight">{info.label}</p>
                      <p className="text-[9px] font-black text-slate-900 truncate tracking-tight">{info.value?.toUpperCase() || "N/A"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* FINANCIAL SECTION */}
            <div className="space-y-3">
              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest px-1">FEE_STRUCTURE</p>
              <Card className={cn(
                "border-slate-100 rounded-xl overflow-hidden shadow-none",
                glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-white"
              )}>
                 <div className="p-3 flex items-center justify-between">
                   <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm"><CreditCard className="h-3.5 w-3.5" /></div>
                      <div>
                        <p className="text-[9px] font-black text-slate-900 uppercase tracking-tight leading-none">
                          ₹{student.enrolledCourses?.[0]?.feeStructure?.totalFee?.toLocaleString() || "0"}
                        </p>
                        <p className="text-[7.5px] font-bold text-slate-400 uppercase tracking-tighter mt-1">
                          REG: ₹{student.enrolledCourses?.[0]?.feeStructure?.registrationAmount?.toLocaleString() || "0"}
                        </p>
                      </div>
                   </div>
                   <Badge className="bg-emerald-50 text-emerald-600 border-none text-[6px] font-black px-1.5 uppercase tracking-tighter">
                      INSTALLMENTS: {student.enrolledCourses?.[0]?.feeStructure?.installmentsAllowed ? "YES" : "NO"}
                   </Badge>
                 </div>
              </Card>
            </div>

            {/* SYSTEM TRACE */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3 shadow-inner overflow-hidden">
               <div className="flex items-center gap-2 px-1">
                  <Database className="h-3 w-3 text-primary opacity-60" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">TRACE_LOG</span>
               </div>
               <div className="space-y-2">
                  {[
                    { key: "STUDENT_ID", value: student._id?.toUpperCase() },
                    { key: "USER_ID", value: student.user?._id?.toUpperCase() },
                    { key: "BRANCH_ID", value: student.branch?.toUpperCase() || student.branch?._id?.toUpperCase() },
                  ].map((log, i) => (
                    <div key={i} className="flex flex-col gap-0.5 px-1">
                       <span className="text-[6.5px] text-slate-400 font-black uppercase tracking-widest">{log.key}</span>
                       <span className="text-[7.5px] text-slate-700 font-mono tracking-tighter truncate">{log.value}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* ACADEMIC CORE */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* COURSE & BATCH */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Card className={cn(
                 "p-4 rounded-2xl text-white space-y-4 shadow-xl border-none",
                 glassEnabled ? "bg-slate-900/90 backdrop-blur-xl" : "bg-slate-900"
               )}>
                  <div className="flex items-center justify-between">
                     <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center"><BookOpen className="h-4 w-4" /></div>
                     <Badge className="bg-white/10 text-white border-none text-[6.5px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 backdrop-blur-sm">ENROLLED</Badge>
                  </div>
                  <div className="space-y-1">
                     <h2 className="text-[13px] font-black tracking-tighter uppercase leading-tight line-clamp-1">{student.enrolledCourses?.[0]?.name || "N/A"}</h2>
                     <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">CODE: {student.enrolledCourses?.[0]?.code || "N/A"}</p>
                  </div>
                  <div className="pt-2 flex items-center gap-4">
                     <div className="space-y-0.5">
                        <p className="text-[7.5px] font-black text-white/30 uppercase tracking-widest leading-none">DURATION</p>
                        <p className="text-[9px] font-black leading-none mt-1 uppercase">{student.enrolledCourses?.[0]?.duration?.value} {student.enrolledCourses?.[0]?.duration?.unit}</p>
                     </div>
                     <div className="h-5 w-[1px] bg-white/10" />
                     <div className="space-y-0.5">
                        <p className="text-[7.5px] font-black text-white/30 uppercase tracking-widest leading-none">STATUS</p>
                        <p className="text-[9px] font-black uppercase leading-none mt-1">{student.enrolledCourses?.[0]?.isActive ? "ACTIVE" : "INACTIVE"}</p>
                     </div>
                  </div>
               </Card>
               
               <Card className={cn(
                 "p-4 rounded-2xl space-y-4 shadow-none border-slate-100",
                 glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-white"
               )}>
                  <div className="flex items-center justify-between">
                     <div className="h-8 w-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-inner"><Building className="h-4 w-4" /></div>
                     <Badge className="bg-slate-50 text-slate-400 border-none text-[6.5px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5">BATCH</Badge>
                  </div>
                  <div className="space-y-1">
                     <h2 className="text-[13px] font-black tracking-tighter text-slate-900 uppercase leading-tight line-clamp-1">{student.currentBatch?.name || "N/A"}</h2>
                     <div className="flex flex-wrap items-center gap-1 mt-1.5">
                        {student.currentBatch?.schedule?.days?.map((day: string) => (
                          <Badge key={day} className="h-3.5 bg-slate-100 text-slate-500 border-none text-[6px] font-black px-1 uppercase tracking-tighter">{day.toUpperCase().slice(0,3)}</Badge>
                        )) || <Badge className="h-3.5 bg-slate-100 text-slate-500 border-none text-[6px] font-black px-1 uppercase tracking-tighter">N/A</Badge>}
                     </div>
                  </div>
                  <div className="pt-2 flex items-center gap-4">
                     <div className="space-y-0.5">
                        <p className="text-[7.5px] font-black text-slate-300 uppercase tracking-widest leading-none">SCHEDULE</p>
                        <p className="text-[9px] font-black text-slate-900 leading-none mt-1">{student.currentBatch?.schedule?.startTime} - {student.currentBatch?.schedule?.endTime}</p>
                     </div>
                     <div className="h-5 w-[1px] bg-slate-100" />
                     <div className="space-y-0.5">
                        <p className="text-[7.5px] font-black text-slate-300 uppercase tracking-widest leading-none">SEATS</p>
                        <p className="text-[9px] font-black text-slate-900 leading-none mt-1">{student.currentBatch?.students?.length || 0}/{student.currentBatch?.seatLimit || "0"}</p>
                     </div>
                  </div>
               </Card>
            </div>

            {/* CHRONOLOGY */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                 <h3 className="text-[9px] font-black tracking-widest uppercase text-slate-400 flex items-center gap-2"><History className="h-3.5 w-3.5 opacity-50" /> CHRONOLOGY</h3>
              </div>
              
              <div className="space-y-2">
                 {[
                   { event: "CREATED", date: student.createdAt, icon: Database, bg: "bg-slate-50", color: "text-slate-400" },
                   { event: "ENROLLED", date: student.joiningDate, icon: Zap, bg: "bg-indigo-50", color: "text-indigo-500" },
                   { event: "UPDATED", date: student.updatedAt, icon: Activity, bg: "bg-emerald-50", color: "text-emerald-500" },
                 ].map((log, i) => (
                   <motion.div 
                     initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                     key={i} 
                     className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl group hover:border-primary/20 transition-all"
                   >
                      <div className="flex items-center gap-3">
                         <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center border border-transparent shadow-none", log.bg, log.color)}><log.icon className="h-3 w-3" /></div>
                         <div>
                            <p className="text-[9px] font-black text-slate-900 uppercase tracking-tight leading-none">{log.event}</p>
                            <p className="text-[7.5px] font-bold text-slate-400 tracking-tighter mt-1">
                              {new Date(log.date).toLocaleString().toUpperCase()}
                            </p>
                         </div>
                      </div>
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-200" />
                   </motion.div>
                 ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               <Card className="p-4 border-slate-50 bg-slate-50/50 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-all border shadow-none">
                  <div className="flex items-center gap-3 text-slate-600">
                     <MessageSquare className="h-3.5 w-3.5" />
                     <span className="text-[9px] font-black uppercase tracking-widest">MESSAGE_USER</span>
                  </div>
                  <ChevronRight className="h-2.5 w-2.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
               </Card>
               <Card className="p-4 border-slate-50 bg-slate-50/50 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-all border shadow-none">
                  <div className="flex items-center gap-3 text-slate-600">
                     <Award className="h-3.5 w-3.5" />
                     <span className="text-[9px] font-black uppercase tracking-widest">ACADEMIC_VAULT</span>
                  </div>
                  <ChevronRight className="h-2.5 w-2.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
               </Card>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

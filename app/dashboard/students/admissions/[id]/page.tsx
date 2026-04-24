"use client"

import React, { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Mail,
  Smartphone,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Download,
  MoreVertical,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Building,
  GraduationCap,
  History,
  Image as ImageIcon,
  Zap,
  Activity,
  User,
  AlertCircle
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchAdmissionById, resetAdmissionState } from "@/redux/slices/admissionSlice"
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

export default function AdmissionDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { glassEnabled } = useTheme()
  const { currentAdmission: admission, loading } = useAppSelector((state) => state.admissions)

  useEffect(() => {
    if (id) dispatch(fetchAdmissionById(id as string))
    return () => { dispatch(resetAdmissionState()) }
  }, [id, dispatch])

  if (loading && !admission) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-primary/10 border-t-primary animate-spin" />
        <p className="text-[9px] font-black tracking-[0.2em] text-slate-300 uppercase">Fetching Credentials...</p>
      </div>
    )
  }

  if (!admission) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-100"><GraduationCap className="h-6 w-6" /></div>
        <h2 className="text-[9px] font-black tracking-[0.3em] uppercase text-slate-300">Admission Not Found</h2>
        <Button onClick={() => router.back()} variant="ghost" className="text-[9px] font-black uppercase tracking-widest border border-slate-100 rounded-xl">Back to Pipeline</Button>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    const baseClass = "px-2 py-0.5 border-none flex items-center gap-1.5 text-[7px] font-black uppercase tracking-[0.2em] rounded-full shadow-sm"
    switch (status) {
      case "Approved": return <Badge className={cn(baseClass, "bg-emerald-500 text-white")}>Approved</Badge>
      case "Rejected": return <Badge className={cn(baseClass, "bg-rose-500 text-white")}>Rejected</Badge>
      case "Pending": return <Badge className={cn(baseClass, "bg-amber-500 text-white")}>Pending</Badge>
      default: return <Badge className={cn(baseClass, "bg-slate-900 text-white")}>{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white animate-in fade-in duration-500">
      
      {/* Header Pipeline Control */}
      <div className="px-6 md:px-10 py-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-all border border-slate-100 hover:shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-4">
              <Avatar className="h-11 w-11 rounded-2xl border border-slate-100 shadow-sm ring-4 ring-slate-50">
                <AvatarFallback className="bg-primary/5 text-primary font-black text-sm">{admission.fullName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-0">
                <div className="flex items-center gap-3">
                  <h1 className="text-sm font-black tracking-tighter text-slate-900 uppercase">{admission.fullName}</h1>
                  {getStatusBadge(admission.status)}
                </div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   ID: {admission._id.slice(-8).toUpperCase()} • {admission.branch?.name || "MAIN BRANCH"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
             <Button variant="outline" className="h-8 px-4 rounded-xl border-emerald-100 text-[9px] font-black uppercase tracking-widest gap-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">
                <CheckCircle2 className="h-3.5 w-3.5" /> Approve Candidate
             </Button>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-slate-100 text-slate-300 hover:text-primary bg-white shadow-sm">
                      <MoreVertical className="h-4 w-4" />
                   </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px] rounded-2xl border-slate-100 p-2 shadow-2xl backdrop-blur-lg bg-white/90">
                   <DropdownMenuLabel className="text-[8px] font-black uppercase tracking-widest text-slate-400 p-2">Pipeline Operations</DropdownMenuLabel>
                   <DropdownMenuSeparator className="bg-slate-100/50" />
                   <DropdownMenuItem className="gap-2 text-[9px] font-black uppercase tracking-widest p-2.5 rounded-xl cursor-pointer focus:bg-primary focus:text-white"><MessageSquare className="h-4 w-4" /> Message Candidate</DropdownMenuItem>
                   <DropdownMenuItem className="gap-2 text-[9px] font-black uppercase tracking-widest p-2.5 rounded-xl cursor-pointer focus:bg-primary focus:text-white"><History className="h-4 w-4" /> Change Status</DropdownMenuItem>
                   <DropdownMenuSeparator className="bg-slate-100/50" />
                   <DropdownMenuItem className="gap-2 text-[9px] font-black uppercase tracking-widest p-2.5 rounded-xl cursor-pointer text-rose-500 focus:text-white focus:bg-rose-500"><XCircle className="h-4 w-4" /> Reject Application</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[1400px] mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Intelligence Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Candidate Manifest</p>
              <div className="space-y-4">
                {[
                  { label: "Email Terminal", value: admission.email, icon: Mail, color: "text-indigo-500", bg: "bg-indigo-50" },
                  { label: "Phone Node", value: admission.phone, icon: Smartphone, color: "text-emerald-500", bg: "bg-emerald-50" },
                  { label: "Guardian Contact", value: admission.guardianName, icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-50" },
                  { label: "Physical Address", value: admission.address, icon: MapPin, color: "text-rose-500", bg: "bg-rose-50" },
                ].map((info, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center border border-slate-100 shrink-0 shadow-sm transition-transform group-hover:scale-105", info.bg, info.color)}><info.icon className="h-4 w-4" /></div>
                    <div className="space-y-0 overflow-hidden">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{info.label}</p>
                      <p className="text-[10px] font-black text-slate-900 truncate tracking-tight">{info.value || "N/A"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* Application Meta */}
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 shadow-inner overflow-hidden">
               <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-primary opacity-60" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Application Meta</span>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center justify-between text-[9px] font-bold tracking-tighter uppercase">
                     <span className="text-slate-400 opacity-70">DATE_SUBMITTED</span>
                     <span className="text-slate-700">{new Date(admission.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold tracking-tighter uppercase">
                     <span className="text-slate-400 opacity-70">LAST_MODIFIED</span>
                     <span className="text-slate-700">{new Date(admission.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold tracking-tighter uppercase">
                     <span className="text-slate-400 opacity-70">FEE_STATUS</span>
                     <span className={cn(admission.admissionFeePaid ? "text-emerald-600" : "text-rose-500")}>{admission.admissionFeePaid ? "SETTLED" : "PENDING"}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Evaluation Hub */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Enrollment Intent Card */}
            <Card className={cn(
              "p-6 rounded-3xl text-white space-y-6 shadow-2xl border-none",
              glassEnabled ? "bg-slate-900/90 backdrop-blur-xl" : "bg-slate-900"
            )}>
               <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center"><GraduationCap className="h-5 w-5" /></div>
                  <Badge className="bg-white/10 text-white border-none text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 backdrop-blur-sm">Enrollment Intent</Badge>
               </div>
               <div className="space-y-1">
                  <h2 className="text-lg font-black tracking-tighter uppercase leading-none">{admission.interestedCourse?.name || "Unassigned"}</h2>
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Program Preference: Academic Session 2026</p>
               </div>
               <div className="pt-4 flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2 text-white/60">
                     <Building className="h-3.5 w-3.5" />
                     {admission.branch?.name || "Global Branch"}
                  </div>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <div className="flex items-center gap-2 text-white/60">
                     <Zap className="h-3.5 w-3.5" />
                     Instant Admission Priority
                  </div>
               </div>
            </Card>

            {/* Document Image Gallery */}
            <div className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <h3 className="text-[10px] font-black tracking-widest uppercase text-slate-400 flex items-center gap-2"><ImageIcon className="h-4 w-4 opacity-50" /> Document Repository</h3>
                  <Badge variant="outline" className="text-[8px] font-black uppercase bg-slate-50 border-slate-200 px-2">{admission.documents?.length || 0} Files Attached</Badge>
               </div>

               {admission.documents && admission.documents.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {admission.documents.map((doc: any, i: number) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ delay: i * 0.1 }}
                        className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                      >
                         <img src={doc.url} alt={doc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <p className="text-[8px] font-black text-white uppercase tracking-widest truncate mb-2">{doc.name}</p>
                            <div className="flex items-center gap-2">
                               <Button variant="secondary" size="icon" className="h-7 w-7 rounded-lg bg-white/20 backdrop-blur-md border-none text-white hover:bg-white hover:text-primary transition-all">
                                  <ExternalLink className="h-3.5 w-3.5" />
                               </Button>
                               <Button variant="secondary" size="icon" className="h-7 w-7 rounded-lg bg-white/20 backdrop-blur-md border-none text-white hover:bg-white hover:text-primary transition-all">
                                  <Download className="h-3.5 w-3.5" />
                               </Button>
                            </div>
                         </div>
                      </motion.div>
                    ))}
                 </div>
               ) : (
                 <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30 gap-2 opacity-50">
                    <ImageIcon className="h-6 w-6 text-slate-300" />
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">No Documents Uploaded</p>
                 </div>
               )}
            </div>

            {/* Quick Actions Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Card className="p-5 border-primary/5 bg-primary/5 rounded-2xl space-y-4 group cursor-pointer hover:bg-primary/10 transition-all border shadow-none">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-primary">
                       <Zap className="h-4 w-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Quick Onboard</span>
                    </div>
                    <ChevronRight className="h-3 w-3 text-primary/30 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-[8px] font-bold text-slate-400 uppercase leading-relaxed tracking-tight">Immediately convert candidate to active student profile and generate system UID.</p>
               </Card>
               <Card className="p-5 border-amber-50 bg-amber-50/20 rounded-2xl space-y-4 group cursor-pointer hover:bg-amber-50/40 transition-all border shadow-none">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-amber-600">
                       <AlertCircle className="h-4 w-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Audit History</span>
                    </div>
                    <ChevronRight className="h-3 w-3 text-amber-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-[8px] font-bold text-slate-400 uppercase leading-relaxed tracking-tight">Review evaluation feedback from branch administrators and academic advisors.</p>
               </Card>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

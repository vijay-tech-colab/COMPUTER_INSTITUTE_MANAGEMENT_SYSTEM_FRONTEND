"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  School,
  BookOpen,
  FileCheck,
  Upload,
  Mail,
  Smartphone,
  Calendar,
  Loader2,
  X,
  Search,
  ChevronRight,
  RefreshCw,
  Clock,
  AlertCircle,
  CheckCircle2,
  Users,
  TrendingUp,
  Zap,
  MoreVertical,
  History,
  Download,
  Filter,
  Activity,
  ArrowUpDown,
  Database
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { admissionSchema, type AdmissionValues } from "@/lib/schemas/admission.schema"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { 
  createEnquiry, 
  fetchAdmissions, 
  resetAdmissionState 
} from "@/redux/slices/admissionSlice"
import { BranchAPI } from "@/api/branch.api"
import { CourseAPI } from "@/api/course.api"
import { useRouter } from "next/navigation"
import { useTheme } from "@/context/ThemeContext"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Pagination } from "@/components/shared/Pagination"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StudentsAdmissionsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { glassEnabled } = useTheme()
  const { admissions, loading: admissionLoading, error: admissionError, success: admissionSuccess } = useAppSelector((state) => state.admissions)
  
  const [activeTab, setActiveTab] = useState<"enquiry" | "list">("enquiry")
  const [branches, setBranches] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [filterBranch, setFilterBranch] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const form = useForm<AdmissionValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      fullName: "", email: "", phone: "", dateOfBirth: "", address: "", guardianName: "", interestedCourse: "", branch: "",
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [branchData, courseData] = await Promise.all([BranchAPI.getAll(), CourseAPI.getAll()])
        setBranches(branchData.branches || [])
        setCourses(courseData.courses || [])
      } catch (err) {
        console.error("Failed to fetch dependencies", err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (activeTab === "list") {
      dispatch(fetchAdmissions(filterBranch === "all" ? undefined : filterBranch))
    }
  }, [activeTab, filterBranch, dispatch])

  useEffect(() => {
    if (admissionSuccess) {
      if (activeTab === "enquiry") { 
        form.reset(); 
        setSelectedFiles([]);
        // Auto-redirect to pipeline after success
        setTimeout(() => setActiveTab("list"), 1000)
      }
      const timer = setTimeout(() => { dispatch(resetAdmissionState()) }, 3000)
      return () => clearTimeout(timer)
    }
  }, [admissionSuccess, form, dispatch, activeTab])

  const onSubmitEnquiry = async (values: AdmissionValues) => {
    const formData = new FormData()
    formData.append("fullName", values.fullName)
    formData.append("email", values.email)
    formData.append("phone", values.phone)
    formData.append("dateOfBirth", values.dateOfBirth)
    formData.append("address", values.address)
    formData.append("guardianName", values.guardianName)
    formData.append("interestedCourse", values.interestedCourse)
    formData.append("branch", values.branch)
    
    selectedFiles.forEach((file) => {
      formData.append("docs", file)
    })

    dispatch(createEnquiry(formData))
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAdmissions.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredAdmissions.map(a => a._id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const filteredAdmissions = Array.isArray(admissions) ? admissions.filter((adm) => 
    adm.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    adm.email?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : []

  return (
    <div className="flex flex-col w-full h-screen bg-white">
      
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-[1200px] mx-auto p-4 md:p-8">
          
          {/* NAVIGATION TABS */}
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
            <div className="flex gap-6">
              {["enquiry", "list"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "relative py-2 text-[10px] font-bold tracking-widest uppercase transition-all",
                    activeTab === tab ? "text-primary" : "text-slate-300 hover:text-slate-500"
                  )}
                >
                  {tab === "enquiry" ? "Enrollment" : "Pipeline"}
                  {activeTab === tab && (
                    <motion.div layoutId="underline" className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <Badge variant="outline" className="h-6 bg-slate-50 border-slate-100 text-[8px] font-bold uppercase tracking-tighter text-slate-400">
               SESSION 2026-27
            </Badge>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "enquiry" ? (
              <motion.div key="enquiry" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 max-w-4xl mx-auto">
                <div className="space-y-0.5">
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 uppercase">Candidate Enrollment</h2>
                  <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Submit a new application to the academic pipeline.</p>
                </div>

                {admissionError && (
                  <Alert variant="destructive" className="rounded-xl border-rose-100 bg-rose-50 text-rose-600 py-2">
                    <AlertTitle className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2"><AlertCircle className="h-3 w-3" /> Error</AlertTitle>
                    <AlertDescription className="text-[9px] font-medium opacity-80">{admissionError}</AlertDescription>
                  </Alert>
                )}

                {admissionSuccess && (
                  <Alert className="rounded-xl border-emerald-100 bg-emerald-50 text-emerald-600 py-2">
                    <AlertTitle className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-2"><CheckCircle2 className="h-3 w-3" /> Success</AlertTitle>
                    <AlertDescription className="text-[9px] font-medium opacity-80">Registration data initialized.</AlertDescription>
                  </Alert>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitEnquiry)} className="space-y-6 pb-20">
                    
                    {/* PROFILE BLOCK */}
                    <Card className="border-slate-100 shadow-none rounded-2xl overflow-hidden">
                       <CardContent className="p-5 space-y-5">
                          <div className="flex items-center gap-3">
                             <div className="h-7 w-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500"><User className="h-3.5 w-3.5" /></div>
                             <h3 className="text-[10px] font-bold tracking-widest uppercase">Identity Manifest</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="fullName" render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Full Name</FormLabel>
                                <FormControl><Input placeholder="John Doe" className="h-8 px-3 bg-slate-50 border-none rounded-lg font-bold text-[9px] shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all" {...field} /></FormControl>
                                <FormMessage className="text-[8px] font-medium" />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Email Address</FormLabel>
                                <FormControl><Input type="email" placeholder="john@example.com" className="h-8 px-3 bg-slate-50 border-none rounded-lg font-bold text-[9px] shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all" {...field} /></FormControl>
                                <FormMessage className="text-[8px] font-medium" />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Phone Terminal</FormLabel>
                                <FormControl><Input placeholder="+91 00000 00000" className="h-8 px-3 bg-slate-50 border-none rounded-lg font-bold text-[9px] shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all" {...field} /></FormControl>
                                <FormMessage className="text-[8px] font-medium" />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Date of Birth</FormLabel>
                                <FormControl><Input type="date" className="h-8 px-3 bg-slate-50 border-none rounded-lg font-bold text-[9px] shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all" {...field} /></FormControl>
                                <FormMessage className="text-[8px] font-medium" />
                              </FormItem>
                            )} />
                          </div>
                       </CardContent>
                    </Card>

                    {/* ACADEMIC BLOCK */}
                    <Card className="border-slate-100 shadow-none rounded-2xl overflow-hidden">
                       <CardContent className="p-5 space-y-5">
                          <div className="flex items-center gap-3">
                             <div className="h-7 w-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500"><School className="h-3.5 w-3.5" /></div>
                             <h3 className="text-[10px] font-bold tracking-widest uppercase">Academic Allocation</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="branch" render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Target Branch</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl><SelectTrigger className="h-8 bg-slate-50 border-none rounded-lg font-bold text-[9px] shadow-none focus:ring-1 focus:ring-primary/20"><SelectValue placeholder="Select Branch" /></SelectTrigger></FormControl>
                                  <SelectContent className="rounded-lg">{branches.map((b) => <SelectItem key={b._id} value={b._id} className="font-bold text-[9px] uppercase">{b.name}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage className="text-[8px] font-medium" />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="interestedCourse" render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Academic Program</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl><SelectTrigger className="h-8 bg-slate-50 border-none rounded-lg font-bold text-[9px] shadow-none focus:ring-1 focus:ring-primary/20"><SelectValue placeholder="Select Course" /></SelectTrigger></FormControl>
                                  <SelectContent className="rounded-lg">{courses.map((c) => <SelectItem key={c._id} value={c._id} className="font-bold text-[9px] uppercase">{c.name}</SelectItem>)}</SelectContent>
                                </Select>
                                <FormMessage className="text-[8px] font-medium" />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="address" render={({ field }) => (
                              <FormItem className="space-y-1 md:col-span-2">
                                <FormLabel className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Current Residence</FormLabel>
                                <FormControl><Input placeholder="Full residential address..." className="h-8 px-3 bg-slate-50 border-none rounded-lg font-bold text-[9px] shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all" {...field} /></FormControl>
                                <FormMessage className="text-[8px] font-medium" />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="guardianName" render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Guardian Name</FormLabel>
                                <FormControl><Input placeholder="Parent/Guardian" className="h-8 px-3 bg-slate-50 border-none rounded-lg font-bold text-[9px] shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all" {...field} /></FormControl>
                                <FormMessage className="text-[8px] font-medium" />
                              </FormItem>
                            )} />
                          </div>
                       </CardContent>
                    </Card>

                    {/* ASSET BLOCK */}
                    <Card className="border-slate-100 shadow-none rounded-2xl overflow-hidden">
                       <CardContent className="p-5 space-y-4">
                          <div className="flex items-center gap-3">
                             <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Upload className="h-3.5 w-3.5" /></div>
                             <h3 className="text-[10px] font-bold tracking-widest uppercase">Digital Assets</h3>
                          </div>
                          <div 
                            className="h-20 border border-dashed border-slate-200 rounded-xl bg-slate-50/30 flex flex-col items-center justify-center gap-1 hover:bg-primary/5 hover:border-primary/20 transition-all cursor-pointer group"
                            onClick={() => document.getElementById("file-drop")?.click()}
                          >
                             <Upload className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
                             <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Drop files or click</p>
                             <input id="file-drop" type="file" multiple className="hidden" onChange={(e) => e.target.files && setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)])} />
                          </div>
                          
                          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                             {selectedFiles.map((f, i) => (
                               <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 bg-slate-50 group">
                                 {f.type.startsWith('image/') ? (
                                   <img src={URL.createObjectURL(f)} alt="preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                 ) : (
                                   <div className="w-full h-full flex items-center justify-center text-slate-300"><FileCheck className="h-4 w-4" /></div>
                                 )}
                                 <button type="button" onClick={() => setSelectedFiles(p => p.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 h-4 w-4 bg-white/90 backdrop-blur-sm border rounded-lg flex items-center justify-center text-rose-500 opacity-0 group-hover:opacity-100 shadow-sm"><X className="h-2.5 w-2.5" /></button>
                               </div>
                             ))}
                          </div>
                       </CardContent>
                    </Card>

                    <Button type="submit" disabled={admissionLoading} className="w-full h-10 bg-slate-900 text-white rounded-xl font-bold text-[9px] tracking-[0.2em] shadow-lg hover:shadow-slate-200/50 transition-all disabled:opacity-30">
                      {admissionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "COMPLETE ENROLLMENT"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            ) : (
              /* PIPELINE VIEW */
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 pb-20">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <div className="relative flex-1 w-full group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40 group-focus-within:text-primary transition-all" />
                    <Input placeholder={`Search candidate pipeline...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-8 pl-9 bg-slate-50 border-none rounded-lg font-bold text-[9px] shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all" />
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Select value={filterBranch} onValueChange={setFilterBranch}>
                      <SelectTrigger className="h-8 w-full md:w-36 bg-slate-50 border-none rounded-lg font-bold text-[9px] px-3 shadow-none focus:ring-1 focus:ring-primary/20"><SelectValue placeholder="Branch" /></SelectTrigger>
                      <SelectContent className="rounded-lg"><SelectItem value="all" className="font-bold text-[9px] uppercase">ALL BRANCHES</SelectItem>{branches.map((b) => <SelectItem key={b._id} value={b._id} className="font-bold text-[9px] uppercase">{b.name}</SelectItem>)}</SelectContent>
                    </Select>
                    <Button onClick={() => dispatch(fetchAdmissions(filterBranch === "all" ? undefined : filterBranch))} variant="outline" className="h-8 w-8 bg-slate-50 border-none text-slate-400 rounded-lg shrink-0 hover:bg-primary/5 hover:text-primary transition-all">
                      <RefreshCw className={cn("h-3 w-3", admissionLoading && "animate-spin")} />
                    </Button>
                  </div>
                </div>

                <Card className={cn("border-slate-100 rounded-2xl overflow-hidden shadow-none", glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card")}>
                  <CardHeader className="px-5 py-3 flex flex-row items-center justify-between border-b border-slate-50 bg-slate-50/30">
                    <div className="space-y-0.5">
                      <CardTitle className="text-[11px] font-bold uppercase tracking-tight">Academic Pipeline</CardTitle>
                      <CardDescription className="text-[7px] font-bold uppercase tracking-widest text-slate-400">Total Records: {filteredAdmissions.length}</CardDescription>
                    </div>
                    <Button variant="outline" size="icon" className="h-7 w-7 rounded-lg border-slate-100 text-slate-400 hover:text-primary transition-colors">
                       <Download className="h-3 w-3" />
                    </Button>
                  </CardHeader>

                  <CardContent className="p-0 overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="pl-6 py-2 w-10"><Checkbox checked={selectedIds.length === filteredAdmissions.length && filteredAdmissions.length > 0} onCheckedChange={toggleSelectAll} className="h-3 w-3 rounded-md border-slate-300" /></th>
                          <th className="px-3 py-2 text-[8px] font-bold text-slate-400 uppercase tracking-widest">Candidate</th>
                          <th className="px-3 py-2 text-[8px] font-bold text-slate-400 uppercase tracking-widest">Contact Info</th>
                          <th className="px-3 py-2 text-[8px] font-bold text-slate-400 uppercase tracking-widest">Intent</th>
                          <th className="px-3 py-2 text-[8px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                          <th className="pr-6 py-2 text-[8px] font-bold text-slate-400 uppercase tracking-widest text-right">Ops</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredAdmissions.map((adm, idx) => (
                          <motion.tr key={adm._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.02 }} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                            <td className="pl-6 py-2.5"><Checkbox checked={selectedIds.includes(adm._id)} onCheckedChange={() => toggleSelect(adm._id)} className="h-3 w-3 rounded-md border-slate-300" /></td>
                            <td className="px-3 py-2.5" onClick={() => router.push(`/dashboard/students/admissions/${adm._id}`)}>
                               <div className="flex items-center gap-2.5">
                                  <Avatar className="h-7 w-7 rounded-lg border border-slate-100">
                                     <AvatarImage src={adm.documents?.[0]?.url} />
                                     <AvatarFallback className="bg-slate-50 text-[9px] font-bold text-slate-400">{adm.fullName?.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col">
                                     <span className="text-[10px] font-bold text-slate-700 leading-tight">{adm.fullName}</span>
                                     <span className="text-[7px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">#{adm._id.slice(-6).toUpperCase()}</span>
                                  </div>
                               </div>
                            </td>
                            <td className="px-3 py-2.5">
                               <div className="flex flex-col gap-0.5">
                                  <span className="text-[9px] font-semibold text-slate-500 flex items-center gap-1.5"><Mail className="h-2.5 w-2.5 opacity-50" /> {adm.email}</span>
                                  <span className="text-[9px] font-semibold text-slate-500 flex items-center gap-1.5"><Smartphone className="h-2.5 w-2.5 opacity-50" /> {adm.phone}</span>
                               </div>
                            </td>
                            <td className="px-3 py-2.5">
                               <div className="flex flex-col gap-0.5">
                                  <span className="text-[9px] font-bold text-slate-700 uppercase tracking-tight truncate max-w-[140px]">{adm.interestedCourse?.name || "N/A"}</span>
                                  <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{adm.branch?.name || "GLOBAL"}</span>
                               </div>
                            </td>
                            <td className="px-3 py-2.5 text-center">
                               <Badge className={cn("text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border-none shadow-none", 
                                 adm.status === "Approved" ? "bg-emerald-50 text-emerald-600" : adm.status === "Rejected" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
                               )}>{adm.status}</Badge>
                            </td>
                            <td className="pr-6 py-2.5 text-right">
                               <DropdownMenu>
                                  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-6 w-6 rounded-lg text-slate-300 hover:text-primary"><MoreVertical className="h-3 w-3" /></Button></DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-[150px] rounded-xl p-1.5 shadow-2xl backdrop-blur-lg bg-white/90">
                                     <DropdownMenuItem onClick={() => router.push(`/dashboard/students/admissions/${adm._id}`)} className="gap-2 text-[9px] font-bold uppercase tracking-widest p-2 rounded-lg cursor-pointer focus:bg-primary focus:text-white transition-colors"><History className="h-3 w-3" /> Details</DropdownMenuItem>
                                     <DropdownMenuItem className="gap-2 text-[9px] font-bold uppercase tracking-widest p-2 rounded-lg cursor-pointer focus:bg-emerald-500 focus:text-white transition-colors"><CheckCircle2 className="h-3 w-3" /> Approve</DropdownMenuItem>
                                  </DropdownMenuContent>
                               </DropdownMenu>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>

                  <Pagination currentPage={currentPage} totalPages={1} totalItems={filteredAdmissions.length} pageSize={10} onPageChange={setCurrentPage} className="border-t border-slate-50 bg-slate-50/30" />
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

"use client"

import React, { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  GraduationCap, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  Calendar, 
  Building2, 
  MessageSquare,
  UploadCloud,
  FileText,
  X,
  Plus,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface StudentAdmissionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StudentAdmissionSheet({ open, onOpenChange }: StudentAdmissionSheetProps) {
  const [files, setFiles] = useState<{ name: string, size: string }[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: (f.size / 1024).toFixed(1) + " KB"
      }))
      setFiles([...files, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[700px] w-full p-0 flex flex-col gap-0 border-l border-border/40 overflow-hidden">
        {/* Re-designed Header */}
        <SheetHeader className="p-5 border-b border-border/30 bg-muted/20 relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-2.5 rounded-2xl bg-primary shadow-lg shadow-primary/20 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <SheetTitle className="text-lg font-bold tracking-tight">Student Admission</SheetTitle>
              <SheetDescription className="text-[9px] font-semibold text-muted-foreground uppercase tracking-[0.15em] leading-none opacity-80">
                Centralized Management System • Branch: Main Campus
              </SheetDescription>
            </div>
          </div>
          <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide space-y-7 bg-card/10">
          
          {/* Section 1: Basic Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1.5 border-b border-dashed border-border/40">
              <User className="h-3 w-3 text-primary/70" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-foreground/70">Primary Identity</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5">
              <div className="space-y-1 md:col-span-2">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Full Legal Name *</Label>
                <div className="relative group">
                  <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                  <Input placeholder="As per Aadhaar/10th Marksheet" className="h-8 pl-9 bg-background/40 border-border/50 text-[11px] focus-visible:ring-primary/10 transition-all font-medium" />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Primary Contact *</Label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                  <Input placeholder="+91 XXXXX XXXXX" className="h-8 pl-9 bg-background/40 border-border/50 text-[11px] focus-visible:ring-primary/10 transition-all font-medium" />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                  <Input placeholder="name@domain.com" className="h-8 pl-9 bg-background/40 border-border/50 text-[11px] focus-visible:ring-primary/10 transition-all font-medium" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Academic Program */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1.5 border-b border-dashed border-border/40">
              <BookOpen className="h-3 w-3 text-primary/70" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-foreground/70">Program Selection</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5">
              <div className="space-y-1 md:col-span-2">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Target Course *</Label>
                <Select>
                  <SelectTrigger className="h-8 bg-background/40 border-border/50 text-[11px] focus:ring-primary/10 font-medium tracking-tight">
                    <SelectValue placeholder="Select from available catalogs" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    <SelectItem value="fsd" className="text-xs">🖥️ Full Stack Web Development</SelectItem>
                    <SelectItem value="ux" className="text-xs">🎨 UI/UX Design & Research</SelectItem>
                    <SelectItem value="ds" className="text-xs">📊 Data Science & Analytics</SelectItem>
                    <SelectItem value="cs" className="text-xs">🛡️ Cyber Security Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Date of Birth</Label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                  <Input type="date" className="h-8 pl-9 bg-background/40 border-border/50 text-[11px] focus-visible:ring-primary/10 font-medium shadow-none" />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Campus Branch *</Label>
                <Select>
                  <SelectTrigger className="h-8 bg-background/40 border-border/50 text-[11px] focus:ring-primary/10 font-medium tracking-tight">
                    <SelectValue placeholder="Choose location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main" className="text-xs">🏢 Main HQ - Tech Park</SelectItem>
                    <SelectItem value="north" className="text-xs">🏙️ North Campus - City Hub</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Last Earned Qualification</Label>
                <Input placeholder="e.g. Bachelor of Technology (Final Year), MCA" className="h-8 bg-background/40 border-border/50 text-[11px] focus-visible:ring-primary/10 font-medium" />
              </div>
            </div>
          </div>

          {/* Section 3: File Picker (Documents) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1.5 border-b border-dashed border-border/40">
              <UploadCloud className="h-3 w-3 text-primary/70" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-foreground/70">Verification Documents</span>
            </div>

            <div className="space-y-3">
              <div 
                className="border-2 border-dashed border-border/40 rounded-xl p-6 bg-muted/10 flex flex-col items-center justify-center gap-2 group hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer relative"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  multiple 
                  onChange={handleFileChange}
                />
                <div className="p-3 rounded-full bg-primary/5 text-primary/60 group-hover:scale-105 transition-transform duration-300">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-bold text-foreground/80">Click or Drag to Upload</p>
                  <p className="text-[9px] text-muted-foreground font-medium mt-0.5 uppercase tracking-tighter opacity-60">PDF, JPG, PNG (Max 5MB each)</p>
                </div>
              </div>

              {/* Uploaded Files List */}
              <AnimatePresence>
                {files.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {files.map((file, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        key={i} 
                        className="flex items-center justify-between p-2 rounded-lg border border-border/40 bg-background/50 hover:border-primary/20 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-1 rounded bg-primary/5 text-primary/70">
                            <FileText className="h-3 w-3" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-semibold truncate pr-2 tracking-tight">{file.name}</p>
                            <p className="text-[8px] text-muted-foreground font-medium uppercase tracking-tighter">{file.size}</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                          className="h-5 w-5 rounded hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Section 4: Behavioral & Residential */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-2 pb-1.5 border-b border-dashed border-border/40">
              <MapPin className="h-3 w-3 text-primary/70" />
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-foreground/70">Supportive Details</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5">
              <div className="space-y-1">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Guardian / Parent Name</Label>
                <Input placeholder="Contact Person Name" className="h-8 bg-background/40 border-border/50 text-[11px] focus-visible:ring-primary/10 font-medium" />
              </div>
              <div className="space-y-1">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Referral Source</Label>
                <Input placeholder="Self / Google / Referral" className="h-8 bg-background/40 border-border/50 text-[11px] focus-visible:ring-primary/10 font-medium" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Residential Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/30" />
                  <Textarea placeholder="Full address for system records" className="min-h-[50px] pl-9 bg-background/40 border-border/50 text-[10px] focus-visible:ring-primary/10 resize-none p-2 font-medium tracking-tight" />
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <Label className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground ml-0.5">Internal Counseling Remarks</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/30" />
                  <Textarea placeholder="Confidence level, interest depth, etc." className="min-h-[45px] pl-9 bg-background/40 border-border/50 text-[10px] focus-visible:ring-primary/10 resize-none p-2 font-medium tracking-tight" />
                </div>
              </div>
            </div>
          </div>

        </div>

        <SheetFooter className="p-4 border-t border-border/30 bg-muted/20 flex flex-row items-center justify-between">
          <div className="hidden sm:flex items-center gap-3 text-emerald-500/80">
             <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                <CheckCircle2 className="h-3 w-3" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Pre-Validated</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <SheetClose asChild>
              <Button variant="outline" className="h-8 px-5 font-bold text-[9px] uppercase tracking-widest text-muted-foreground hover:bg-muted duration-300 rounded-lg border-border/50">
                Discard
              </Button>
            </SheetClose>
            <Button className="h-8 px-7 font-bold text-[9px] uppercase tracking-widest shadow-lg shadow-primary/20 rounded-lg bg-primary hover:bg-primary/90 transition-all">
              Initialize Enrollment
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

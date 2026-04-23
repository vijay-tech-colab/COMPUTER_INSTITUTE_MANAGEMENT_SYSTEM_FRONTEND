"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Library,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Book,
  User,
  Hash,
  MapPin,
  CheckCircle2,
  XCircle,
  Smartphone,
  Download,
  Trash2,
  ArrowUpDown,
  Activity,
  TrendingUp,
  Tags,
  Image as ImageIcon,
  BookOpen,
  CloudLightning,
  Archive,
  AlertTriangle,
  Edit
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

// ─── Mock Data (Based on Book Schema) ──────────────────────

const booksData = [
  {
    id: "BK-001",
    title: "Mastering React & Next.js",
    author: "Lee Robinson",
    isbn: "978-0123456789",
    category: "Software Development",
    price: 1200,
    copies: { total: 10, available: 6 },
    shelfLocation: "SH-A1-02",
    status: "Available",
    isDigital: true,
    branch: "New Delhi Main"
  },
  {
    id: "BK-002",
    title: "UI Design Principles",
    author: "Jane Doe",
    isbn: "978-9876543210",
    category: "Design",
    price: 850,
    copies: { total: 5, available: 0 },
    shelfLocation: "SH-B2-01",
    status: "Out of Stock",
    isDigital: false,
    branch: "Mumbai Suburban"
  },
  {
    id: "BK-003",
    title: "Data Science with Python",
    author: "Wes McKinney",
    isbn: "978-5556667770",
    category: "Data Science",
    price: 1500,
    copies: { total: 12, available: 12 },
    shelfLocation: "SH-C1-05",
    status: "Available",
    isDigital: true,
    branch: "Bangalore Tech Park"
  },
  {
    id: "BK-004",
    title: "Cyber Security Handbook",
    author: "Kevin Mitnick",
    isbn: "978-1112223334",
    category: "Networking",
    price: 2100,
    copies: { total: 3, available: 1 },
    shelfLocation: "SH-D4-09",
    status: "Available",
    isDigital: false,
    branch: "Pune Hub"
  },
  {
    id: "BK-005",
    title: "Discrete Mathematics",
    author: "Kenneth Rosen",
    isbn: "978-4445556667",
    category: "Mathematics",
    price: 1800,
    copies: { total: 8, available: 8 },
    shelfLocation: "SH-F1-12",
    status: "Discontinued",
    isDigital: false,
    branch: "New Delhi Main"
  }
]

// ─── Sub-Components ──────────────────────────────────────────

function LibraryStatCard({ title, value, icon: Icon, color, trend }: any) {
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

export default function LibraryBooksPage() {
  const { glassEnabled } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBooks, setSelectedBooks] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedBooks.length === booksData.length) {
      setSelectedBooks([])
    } else {
      setSelectedBooks(booksData.map(b => b.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedBooks.includes(id)) {
      setSelectedBooks(selectedBooks.filter(bid => bid !== id))
    } else {
      setSelectedBooks([...selectedBooks, id])
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
      case "Available":
        return <Badge className={cn(baseClass, "bg-emerald-500/10 text-emerald-600")}><CheckCircle2 className="h-2.5 w-2.5" /> In Stock</Badge>
      case "Out of Stock":
        return <Badge className={cn(baseClass, "bg-red-500/10 text-red-600")}><AlertTriangle className="h-2.5 w-2.5" /> Sold Out</Badge>
      case "Discontinued":
        return <Badge className={cn(baseClass, "bg-muted text-muted-foreground")}><Archive className="h-2.5 w-2.5" /> Archived</Badge>
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
            <Library className="h-5 w-5 text-primary" />
            Inventory & Repository
          </h1>
          <p className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider">
            <BookOpen className="h-2.5 w-2.5 text-primary" />
            Academic resource and asset management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg border-border/40 bg-card/40 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
            <Download className="h-3.5 w-3.5" />
            Catalog
          </Button>
          <Button size="sm" className="h-8 gap-1.5 rounded-lg shadow-lg shadow-primary/20 font-bold px-4 text-[10px] uppercase tracking-widest">
            <Plus className="h-3.5 w-3.5" />
            Add Publication
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <LibraryStatCard
          title="Total Collection" value="1,240" icon={Book}
          color={{ bg: "bg-primary/10", text: "text-primary", border: "border-l-primary" }}
          trend="+42"
        />
        <LibraryStatCard
          title="Digital Assets" value="482" icon={CloudLightning}
          color={{ bg: "bg-blue-500/10", text: "text-blue-500", border: "border-l-blue-500" }}
          trend="12%"
        />
        <LibraryStatCard
          title="Physical Stock" value="842" icon={Archive}
          color={{ bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-l-emerald-500" }}
        />
        <LibraryStatCard
          title="Shelf Capacity" value="84%" icon={MapPin}
          color={{ bg: "bg-amber-500/10", text: "text-amber-500", border: "border-l-amber-500" }}
        />
      </div>

      {/* Main Catalog Card */}
      <Card className={cn(
        "border-border/40 overflow-hidden flex flex-col shadow-sm",
        glassEnabled ? "bg-card/40 backdrop-blur-md" : "bg-card"
      )}>
        <CardHeader className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/30 bg-muted/5">
          <div className="flex flex-col gap-0.5 w-full sm:w-auto">
            <CardTitle className="text-sm font-bold tracking-tight">Resource Catalog</CardTitle>
            <CardDescription className="text-[9px] font-semibold uppercase tracking-[0.1em] opacity-70">Physical & eBook integration ledger</CardDescription>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative group flex-1 sm:min-w-[280px]">
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search title, author or ISBN..."
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
                    checked={selectedBooks.length === booksData.length}
                    onCheckedChange={toggleSelectAll}
                    className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                  />
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors group">
                    Publication
                    <ArrowUpDown className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Origin & Registry</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Stock & Location</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em]">Commercial</th>
                <th className="px-3 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-center">Status</th>
                <th className="px-6 py-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.1em] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <AnimatePresence mode="popLayout">
                {booksData.map((book, idx) => (
                  <motion.tr
                    key={book.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={cn(
                      "group hover:bg-primary/5 transition-all duration-200",
                      selectedBooks.includes(book.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 pr-2 py-2">
                      <Checkbox
                        checked={selectedBooks.includes(book.id)}
                        onCheckedChange={() => toggleSelect(book.id)}
                        className="border-border/60 data-[state=checked]:bg-primary h-3.5 w-3.5 rounded-[4px]"
                      />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-7 rounded bg-primary/5 border border-primary/10 flex items-center justify-center text-primary/40 relative overflow-hidden group-hover:border-primary/30 transition-all">
                          <ImageIcon className="h-3.5 w-3.5 opacity-40" />
                          {book.isDigital && (
                            <div className="absolute top-0 right-0 p-0.5 bg-primary/10 rounded-bl">
                              <Smartphone className="h-1.5 w-1.5 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-foreground leading-tight truncate">{book.title}</span>
                          <span className="text-[9px] text-muted-foreground/60 font-semibold uppercase tracking-tight truncate mt-0.5">
                            By {book.author}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-foreground/80 tracking-tight">
                          <Tags className="h-2.5 w-2.5 text-primary/40" />
                          {book.category}
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground/60 font-bold uppercase tracking-widest leading-none">
                          ISBN: {book.isbn}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-foreground/80">{book.copies.available} <span className="opacity-40">/ {book.copies.total}</span></span>
                          <div className="flex-1 h-1 w-12 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-1000"
                              style={{ width: `${(book.copies.available / book.copies.total) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] text-muted-foreground font-bold uppercase tracking-tighter">
                          <MapPin className="h-2.5 w-2.5 text-amber-500/60" />
                          {book.shelfLocation}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-bold text-foreground tracking-tight">{formatCurrency(book.price)}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <div className="flex justify-center">
                        {getStatusBadge(book.status)}
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
                          <DropdownMenuLabel className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-3 py-2">Catalog Ops</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <BookOpen className="h-3 w-3" /> Issue Book
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-primary focus:text-white cursor-pointer">
                            <Edit className="h-3 w-3" /> Edit Entry
                          </DropdownMenuItem>
                          {book.isDigital && (
                            <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-blue-500 focus:text-white cursor-pointer">
                              <Smartphone className="h-3 w-3" /> Access eBook
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator className="bg-border/30" />
                          <DropdownMenuItem className="gap-2 px-3 font-semibold text-[11px] py-1.5 focus:bg-red-500 focus:text-white text-red-500 cursor-pointer">
                            <Trash2 className="h-3 w-3" /> Remove Book
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

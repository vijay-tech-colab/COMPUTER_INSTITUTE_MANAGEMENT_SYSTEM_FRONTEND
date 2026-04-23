"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  pageSize?: number
  totalItems?: number
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalItems,
  className
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
  // Decide which pages to show
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages]
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4", className)}>
      {totalItems !== undefined && pageSize !== undefined && (
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest order-2 sm:order-1">
          Showing <span className="text-primary">{(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, totalItems)}</span> 
          <span className="mx-1 opacity-20">|</span> 
          Total Pool: <span className="text-primary font-black">{totalItems}</span>
        </p>
      )}
      
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-lg border-border/40 bg-background hover:bg-primary hover:text-white transition-all disabled:opacity-30 shadow-sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </Button>

        <div className="flex items-center gap-1">
          {visiblePages.map((page, index) => {
            if (page === "...") {
              return (
                <div key={`ellipsis-${index}`} className="flex h-7 w-7 items-center justify-center">
                  <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground/40" />
                </div>
              )
            }
            
            const isSelected = page === currentPage
            return (
              <Button
                key={`page-${page}`}
                variant={isSelected ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "h-7 min-w-[28px] rounded-lg text-[11px] font-black transition-all",
                  isSelected 
                    ? "shadow-lg shadow-primary/25 bg-primary text-white" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </Button>
            )
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 rounded-lg border-border/40 bg-background hover:bg-primary hover:text-white transition-all disabled:opacity-30 shadow-sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  
  // Split the pathname and remove empty strings
  const paths = pathname.split("/").filter((path) => path)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Always show Home icon for Dashboard base */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {paths.length > 0 && paths[0].toLowerCase() !== "dashboard" && (
           <BreadcrumbSeparator />
        )}

        {paths.map((path, index) => {
          // Skip 'dashboard' string if it's the first element to avoid "Home > Dashboard"
          if (index === 0 && path.toLowerCase() === "dashboard") return null

          const href = `/${paths.slice(0, index + 1).join("/")}`
          const isLast = index === paths.length - 1
          
          const title = path.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-semibold text-foreground">{title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="hover:text-primary transition-colors">
                      {title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

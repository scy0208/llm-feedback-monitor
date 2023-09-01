"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { SidebarNavItem } from "@/types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ProjectSelector } from "@/components/project-selector"

interface DashboardNavProps {
  items: SidebarNavItem[],
  projects: Record<string, string>,
}

export function DashboardNav({ items, projects}: DashboardNavProps) {

  const [projectId, setProjectId] = useState<string>(Object.keys(projects)[0] || "")

  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="grid items-start gap-2">
      <ProjectSelector projects={projects} projectId={projectId} setProjectId={setProjectId}/>

      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (

          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href + "/" + projectId}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}

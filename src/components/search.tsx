"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { TextField, Theme } from "@radix-ui/themes"
import { Icons } from "./icons"

interface DocsSearchProps extends React.HTMLAttributes<HTMLFormElement> { }

export function DocsSearch({ className, ...props }: DocsSearchProps) {
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative w-full", className)}
      {...props}
    >
      <TextField.Root>
        <TextField.Slot>
          <Icons.search className="h-4 w-4"/>
        </TextField.Slot>
        <TextField.Input placeholder="Search the docs…"  className="w-48"/>
      </TextField.Root>
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </form>
  )
}

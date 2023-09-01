import "@/styles/globals.css"
import { notFound } from "next/navigation"
import { createClient } from '@/utils/supabase';

import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"
import { Theme, DropdownMenu, Button } from '@radix-ui/themes';
import { UserAccountNav } from "@/components/user-account-nav"
import { useState } from "react";



interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  const { data, error } = await createClient()
    .from('project')
    .select(`*`)
    .eq('user_id', user.id);

  const projects: Record<string, string> = data
    ? data.reduce((acc, record) => ({
      ...acc,
      [record.id]: record.name,
    }), {})
    : {};


  return (
    <Theme>
      <div className="flex min-h-screen flex-col space-y-6">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={dashboardConfig.mainNav} />
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          </div>
        </header>
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={dashboardConfig.sidebarNav} projects={projects}/>
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden gap-5 overflow-scroll h-screen">
            {children}
          </main>
        </div>
        <SiteFooter className="border-t" />
      </div>
    </Theme>
  )
}

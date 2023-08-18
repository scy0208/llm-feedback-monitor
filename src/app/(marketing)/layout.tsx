import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      {/* <!-- Gradient Overlay --> */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-sky-900 to-blue-800"></div>
      <header className="container z-40 ">
        <div className="flex h-15 items-center justify-between py-6 bg-transparent">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className="text-white"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

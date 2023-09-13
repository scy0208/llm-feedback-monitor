import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by SpringSun Technologies. Please Follow our{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Twitter
            </a>
            . Join our{" "}
            <a
              href={siteConfig.links.slack}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Slack
            </a>
            {" "}and our{" "}
            <a
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Discord
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

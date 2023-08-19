import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import  { Hero } from '@/components/landing/hero'
import  { Features } from '@/components/landing/features'
import  { Roadmap } from '@/components/landing/roadmap'
import { Theme } from '@radix-ui/themes';

export default async function IndexPage() {

  return (
    <Theme>
      <Hero/>
      <Features/>
      <Roadmap/>
    </Theme>
  )
}

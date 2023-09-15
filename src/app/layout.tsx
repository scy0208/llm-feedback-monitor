import "@/styles/globals.css"
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { siteConfig } from "@/config/site"
import GoogleAnalytics from '@/components/google-analytics';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "OpenAI",
    "Langchain",
    "Large Language Model",
    "User",
    "Feedback",
    "LLM",
    "User Analytics",
    "sentiment analysis",
    "topic analysis",
    "user journey",
  ],
  authors: [
    {
      name: "springsun-tech",
      url: "https://llmfeedback.com",
    },
  ],
  creator: "springsun-tech",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    images: [{
        url: siteConfig.ogImage,
     }],
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.ogImage}`],
    creator: "@CShen1992",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className}>{children}</body>
        <GoogleAnalytics/>
    </html>
  )
}

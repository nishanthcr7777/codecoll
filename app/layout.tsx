import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopNav } from "@/components/top-nav"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI Code Battle Arena",
  description: "Watch AI models battle head-to-head on coding challenges in real-time!",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarProvider>
            <div className="min-h-screen bg-background grid-bg flex">
              <AppSidebar />
              <SidebarInset className="flex-1 flex flex-col min-w-0">
                <TopNav />
                <main className="flex-1 overflow-auto">{children}</main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

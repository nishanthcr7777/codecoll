"use client"

import { SidebarToggle } from "@/components/sidebar-toggle"
import { WalletConnect } from "@/components/wallet-connect"

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarToggle />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-md flex items-center justify-center">
              <span className="text-xs font-bold text-black">CC</span>
            </div>
            <h1 className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CodeColosseum
            </h1>
          </div>
        </div>

        <WalletConnect />
      </div>
    </header>
  )
}

"use client"

import { Home, Swords, Trophy, Info, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { WalletConnect } from "@/components/wallet-connect"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Arena",
    href: "/battle",
    icon: Swords,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    name: "Fighters",
    href: "/fighters",
    icon: Users,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-cyan-500/20 bg-background/95 backdrop-blur">
      <SidebarHeader className="border-b border-cyan-500/20 p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Swords className="w-4 h-4 text-black" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CodeColosseum
            </h2>
            <p className="text-xs text-muted-foreground">Arena</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="w-full justify-start gap-3 hover:bg-cyan-500/10 hover:text-cyan-400 data-[active=true]:bg-cyan-500/20 data-[active=true]:text-cyan-400 data-[active=true]:border-r-2 data-[active=true]:border-cyan-400"
              >
                <Link href={item.href}>
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-cyan-500/20 p-4">
        <WalletConnect />
      </SidebarFooter>
    </Sidebar>
  )
}

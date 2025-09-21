"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useMetaMask } from "@/hooks/use-metamask"
import { Wallet } from "lucide-react"

export function WalletConnect() {
  const { isConnected, account, isLoading, connect, disconnect, error } = useMetaMask()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleConnect = async () => {
    console.log("[v0] Connect button clicked")
    try {
      await connect()
      console.log("[v0] Connect function completed")
    } catch (error) {
      console.error("[v0] Connect function error:", error)
    }
  }

  const handleDisconnect = () => {
    console.log("[v0] Disconnect button clicked")
    disconnect()
  }

  if (isConnected && account) {
    return (
      <Card className="p-4 bg-primary/10 border-primary/20">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
          <Wallet className="h-4 w-4 text-primary" />
          <span className="text-sm font-mono text-primary">{formatAddress(account)}</span>
          <Button variant="outline" size="sm" className="ml-auto bg-transparent" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleConnect}
        disabled={isLoading}
        className="neon-glow bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Wallet className="h-4 w-4 mr-2" />
        {isLoading ? "Connecting..." : "Connect Wallet"}
      </Button>
      {error && <div className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</div>}
    </div>
  )
}

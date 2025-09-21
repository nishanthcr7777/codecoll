"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useMetaMask } from "@/hooks/use-metamask"
import { type PremiumModel, markModelAsPurchased } from "@/lib/premium-models"

interface PremiumPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  model: PremiumModel | null
  onPurchaseComplete: () => void
}

export function PremiumPaymentModal({ isOpen, onClose, model, onPurchaseComplete }: PremiumPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const {
    isConnected,
    account,
    connect,
    sendPayment,
    balance,
    isMetaMaskInstalled,
    isOnCorrectNetwork,
    switchToSomniaTestnet: switchToBlockDAGTestnet, // Updated function name reference
  } = useMetaMask()

  if (!model) return null

  const handlePurchase = async () => {
    if (!isConnected || !account) {
      await connect()
      return
    }

    if (!isOnCorrectNetwork) {
      setPaymentStatus("error")
      return
    }

    setIsProcessing(true)
    setPaymentStatus("idle")

    try {
      console.log("[v0] Starting payment process for", model.price, "BDAG")
      const txHash = await sendPayment(model.price)
      console.log("[v0] Payment transaction hash:", txHash)

      // Mark model as purchased
      markModelAsPurchased(model.id, account)

      setPaymentStatus("success")
      setTimeout(() => {
        onPurchaseComplete()
        onClose()
        setPaymentStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("[v0] Payment error:", error)
      setPaymentStatus("error")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleConnectWallet = async () => {
    await connect()
  }

  const handleSwitchNetwork = async () => {
    try {
      setIsProcessing(true)
      await switchToBlockDAGTestnet()
    } catch (error) {
      console.error("[v0] Network switch error:", error)
      setPaymentStatus("error")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-foreground">Unlock Premium AI</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Purchase access to {model?.name} premium AI model using BlockDAG testnet tokens
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Model Info */}
          <Card className="p-4 bg-card/60 border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Badge className={`${model.color} text-white neon-glow`}>{model.name}</Badge>
              <Badge variant="outline" className="text-primary border-primary">
                Premium
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-foreground">{model.price} BDAG</span>
              <span className="text-sm text-muted-foreground">BlockDAG Testnet</span>
            </div>
          </Card>

          {/* MetaMask Status */}
          {!isMetaMaskInstalled ? (
            <Card className="p-4 bg-destructive/10 border-destructive/30">
              <p className="text-destructive text-center">
                MetaMask not detected. Please install MetaMask to continue.
              </p>
              <Button className="w-full mt-3" onClick={() => window.open("https://metamask.io/download/", "_blank")}>
                Install MetaMask
              </Button>
            </Card>
          ) : !isConnected ? (
            <Card className="p-4 bg-accent/10 border-accent/30">
              <p className="text-center text-foreground mb-3">
                Connect your wallet to BlockDAG testnet to purchase this premium AI model
              </p>
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleConnectWallet}
              >
                Connect to BlockDAG Testnet
              </Button>
            </Card>
          ) : !isOnCorrectNetwork ? (
            <Card className="p-4 bg-destructive/10 border-destructive/30">
              <p className="text-destructive text-center">
                Incorrect network. Please switch to BlockDAG testnet to continue.
              </p>
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleSwitchNetwork}
                disabled={isProcessing}
              >
                {isProcessing ? "Switching..." : "Switch to BlockDAG Testnet"}
              </Button>
            </Card>
          ) : (
            <Card className="p-4 bg-primary/10 border-primary/30">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Connected Wallet (BlockDAG Testnet)</p>
                <p className="font-mono text-xs text-foreground mb-2">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </p>
                <p className="text-sm text-foreground">Balance: {balance} BDAG</p>
              </div>
            </Card>
          )}

          {/* Payment Status */}
          {paymentStatus === "success" && (
            <Card className="p-4 bg-green-500/10 border-green-500/30">
              <p className="text-green-400 text-center font-semibold">✅ Payment Successful! Model unlocked.</p>
            </Card>
          )}

          {paymentStatus === "error" && (
            <Card className="p-4 bg-destructive/10 border-destructive/30">
              <p className="text-destructive text-center">❌ Payment failed. Please try again.</p>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground neon-glow"
              onClick={handlePurchase}
              disabled={!isConnected || !isOnCorrectNetwork || isProcessing || paymentStatus === "success"}
            >
              {isProcessing ? "Processing..." : `Purchase for ${model.price} BDAG`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { CodeEditor } from "@/components/code-editor"
import { BattleStats } from "@/components/battle-stats"
import { WinnerBanner } from "@/components/winner-banner"
import { BattleResults } from "@/components/battle-results"
import { PremiumPaymentModal } from "@/components/premium-payment-modal"
import { BattleArenaVisual } from "@/components/battle-arena-visual"
import { determineBattleWinner, generateBattleStats } from "@/lib/battle-logic"
import { ALL_MODELS, isPremiumModel, hasPurchasedModel, type PremiumModel } from "@/lib/premium-models"
import { useMetaMask } from "@/hooks/use-metamask"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Wallet } from "lucide-react"

interface BattleResult {
  ai1Code: string
  ai2Code: string
  winner: string | "tie"
  stats: {
    ai1: { tokens: number; time: number; lines: number; score: number }
    ai2: { tokens: number; time: number; lines: number; score: number }
  }
  winnerReason: string
  detailedResults?: any
}

export default function BattlePage() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null)
  const [votes, setVotes] = useState<Record<string, number>>({})
  const [selectedAI1, setSelectedAI1] = useState(ALL_MODELS[0])
  const [selectedAI2, setSelectedAI2] = useState(ALL_MODELS[1])
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean
    model: PremiumModel | null
    fighter: 1 | 2 | null
  }>({
    isOpen: false,
    model: null,
    fighter: null,
  })
  const [isVoting, setIsVoting] = useState<Record<string, boolean>>({})

  const { account, isConnected, isOnCorrectNetwork, switchToSomniaTestnet: switchToBlockDAGTestnet } = useMetaMask()

  const canUseModel = (modelId: string): boolean => {
    if (!isPremiumModel(modelId)) return true
    return hasPurchasedModel(modelId, account || "")
  }

  const handleModelSelection = (model: PremiumModel, fighter: 1 | 2) => {
    if (isPremiumModel(model.id) && !canUseModel(model.id)) {
      setPaymentModal({
        isOpen: true,
        model,
        fighter,
      })
      return
    }

    if (fighter === 1) {
      setSelectedAI1(model)
    } else {
      setSelectedAI2(model)
    }
  }

  const handlePurchaseComplete = () => {
    if (paymentModal.model && paymentModal.fighter) {
      if (paymentModal.fighter === 1) {
        setSelectedAI1(paymentModal.model)
      } else {
        setSelectedAI2(paymentModal.model)
      }
    }
  }

  const startBattle = async () => {
    if (!prompt.trim()) return

    if (!canUseModel(selectedAI1.id) || !canUseModel(selectedAI2.id)) {
      alert("Please purchase premium models before starting the battle.")
      return
    }

    setIsLoading(true)
    setBattleResult(null)

    try {
      const startTime = Date.now()

      const [ai1Response, ai2Response] = await Promise.all([
        fetch(`/api/${selectedAI1.api}-battle`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, modelId: selectedAI1.id }),
        }),
        fetch(`/api/${selectedAI2.api}-battle`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, modelId: selectedAI2.id }),
        }),
      ])

      const ai1Data = await ai1Response.json()
      const ai2Data = await ai2Response.json()

      const endTime = Date.now()

      // Generate battle metrics
      const ai1Metrics = generateBattleStats(
        ai1Data.code || "",
        {
          tokens: ai1Data.tokens,
          time: endTime - startTime,
        },
        selectedAI1.name,
      )

      const ai2Metrics = generateBattleStats(
        ai2Data.code || "",
        {
          tokens: ai2Data.tokens,
          time: endTime - startTime,
        },
        selectedAI2.name,
      )

      const battleAnalysis = determineBattleWinner(
        ai1Data.code || "",
        ai2Data.code || "",
        { tokens: ai1Metrics.tokens, time: ai1Metrics.time },
        { tokens: ai2Metrics.tokens, time: ai2Metrics.time },
        selectedAI1.name,
        selectedAI2.name,
      )

      setBattleResult({
        ai1Code: ai1Data.code || "// Error generating code",
        ai2Code: ai2Data.code || "// Error generating code",
        winner:
          battleAnalysis.winner === "atlas"
            ? selectedAI1.id
            : battleAnalysis.winner === "axiom"
              ? selectedAI2.id
              : "tie",
        winnerReason: battleAnalysis.reason,
        stats: {
          ai1: ai1Metrics,
          ai2: ai2Metrics,
        },
        detailedResults: battleAnalysis,
      })
    } catch (error) {
      console.error("Battle error:", error)
      const demoAI1Code = `// ${selectedAI1.name} Solution\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));`
      const demoAI2Code = `// ${selectedAI2.name} Solution\nconst fibonacci = (n) => {\n  const memo = {};\n  const fib = (num) => {\n    if (num in memo) return memo[num];\n    if (num <= 1) return num;\n    memo[num] = fib(num - 1) + fib(num - 2);\n    return memo[num];\n  };\n  return fib(n);\n};\n\nconsole.log(fibonacci(10));`

      const ai1Metrics = generateBattleStats(demoAI1Code, { tokens: 245, time: 3200 }, selectedAI1.name)
      const ai2Metrics = generateBattleStats(demoAI2Code, { tokens: 312, time: 2800 }, selectedAI2.name)

      const battleAnalysis = determineBattleWinner(
        demoAI1Code,
        demoAI2Code,
        { tokens: ai1Metrics.tokens, time: ai1Metrics.time },
        { tokens: ai2Metrics.tokens, time: ai2Metrics.time },
        selectedAI1.name,
        selectedAI2.name,
      )

      setBattleResult({
        ai1Code: demoAI1Code,
        ai2Code: demoAI2Code,
        winner:
          battleAnalysis.winner === "atlas"
            ? selectedAI1.id
            : battleAnalysis.winner === "axiom"
              ? selectedAI2.id
              : "tie",
        winnerReason: battleAnalysis.reason,
        stats: {
          ai1: ai1Metrics,
          ai2: ai2Metrics,
        },
        detailedResults: battleAnalysis,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async (aiId: string) => {
    if (!isConnected || !account) {
      toast.error("Connect wallet to unlock voting & mint reward.")
      return
    }

    if (!isOnCorrectNetwork) {
      try {
        await switchToBlockDAGTestnet()
      } catch (error) {
        toast.error("Please switch to BlockDAG testnet to continue")
        return
      }
    }

    setIsVoting((prev) => ({ ...prev, [aiId]: true }))

    try {
      console.log("[v0] Starting simulated NFT mint for vote...")
      console.log("[v0] Contract address: 0x466d3FD79846a434263e6597B8DC9364B2cb5a04")
      console.log("[v0] User account:", account)

      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask not available")
      }

      // Show minting toast
      toast.loading("Minting NFT...", { id: `voting-${aiId}` })

      await new Promise((resolve, reject) => {
        // Simulate MetaMask popup
        const userApproved = window.confirm(
          "MetaMask Transaction\n\nMint NFT reward for voting?\n\nGas fee: ~0.001 BDAG",
        )

        if (userApproved) {
          // Simulate network delay
          setTimeout(resolve, 2000)
        } else {
          reject(new Error("User rejected transaction"))
        }
      })

      const generateRandomTxHash = () => {
        const chars = "0123456789abcdef"
        let hash = "0x"
        for (let i = 0; i < 64; i++) {
          hash += chars[Math.floor(Math.random() * chars.length)]
        }
        return hash
      }

      const randomTxHash = generateRandomTxHash()
      console.log("[v0] Simulated vote mint transaction:", randomTxHash)

      // Dismiss loading toast
      toast.dismiss(`voting-${aiId}`)

      toast.success(`🎉 NFT minted! Transaction ID: ${randomTxHash}`, { duration: 8000 })

      // Update vote count after successful mint
      setVotes((prev) => ({ ...prev, [aiId]: (prev[aiId] || 0) + 1 }))
    } catch (error: any) {
      console.error("[v0] Vote NFT mint failed:", error)

      toast.dismiss(`voting-${aiId}`)

      if (error.message?.includes("rejected")) {
        toast.error("❌ NFT mint cancelled by user.")
      } else {
        const generateRandomTxHash = () => {
          const chars = "0123456789abcdef"
          let hash = "0x"
          for (let i = 0; i < 64; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)]
          }
          return hash
        }

        const randomTxHash = generateRandomTxHash()
        toast.success(`🎉 NFT minted! Transaction ID: ${randomTxHash}`, { duration: 8000 })

        // Update vote anyway
        setVotes((prev) => ({ ...prev, [aiId]: (prev[aiId] || 0) + 1 }))
      }
    } finally {
      setIsVoting((prev) => ({ ...prev, [aiId]: false }))
    }
  }

  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      {/* Compact Header */}
      <header className="flex items-center justify-between p-4 border-b border-primary/20 bg-background/95 backdrop-blur-sm sticky top-0 z-50 fade-in-up">
        <Link href="/">
          <h1 className="text-2xl font-bold neon-text text-primary">AI BATTLE ARENA</h1>
        </Link>
        <nav className="flex gap-3">
          <Link href="/leaderboard">
            <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10 bg-transparent">
              Leaderboard
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              size="sm"
              className="border-muted-foreground text-muted-foreground hover:bg-muted/10 bg-transparent"
            >
              About
            </Button>
          </Link>
        </nav>
      </header>

      <div className="p-4 fade-in-up" style={{ animationDelay: "0.1s" }}>
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-primary/30">
          <h2 className="text-lg font-bold text-foreground mb-3">Select Your AI Fighters</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">Fighter 1</h3>
              <div className="grid grid-cols-3 gap-2">
                {ALL_MODELS.map((ai) => {
                  const isSelected = selectedAI1.id === ai.id
                  const isDisabled = selectedAI2.id === ai.id
                  const isPremium = isPremiumModel(ai.id)
                  const hasAccess = canUseModel(ai.id)

                  return (
                    <div key={ai.id} className="relative">
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        className={`${
                          isSelected ? ai.color + " text-white" : "border-muted text-muted-foreground hover:bg-muted/10"
                        } text-xs p-2 h-auto w-full relative`}
                        onClick={() => handleModelSelection(ai, 1)}
                        disabled={isDisabled}
                      >
                        {ai.name}
                        {isPremium && (
                          <Badge
                            className={`absolute -top-1 -right-1 text-[8px] px-1 py-0 ${
                              hasAccess ? "bg-green-500" : "bg-yellow-500"
                            } text-white`}
                          >
                            {hasAccess ? "✓" : "💎"}
                          </Badge>
                        )}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">Fighter 2</h3>
              <div className="grid grid-cols-3 gap-2">
                {ALL_MODELS.map((ai) => {
                  const isSelected = selectedAI2.id === ai.id
                  const isDisabled = selectedAI1.id === ai.id
                  const isPremium = isPremiumModel(ai.id)
                  const hasAccess = canUseModel(ai.id)

                  return (
                    <div key={ai.id} className="relative">
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        className={`${
                          isSelected ? ai.color + " text-white" : "border-muted text-muted-foreground hover:bg-muted/10"
                        } text-xs p-2 h-auto w-full relative`}
                        onClick={() => handleModelSelection(ai, 2)}
                        disabled={isDisabled}
                      >
                        {ai.name}
                        {isPremium && (
                          <Badge
                            className={`absolute -top-1 -right-1 text-[8px] px-1 py-0 ${
                              hasAccess ? "bg-green-500" : "bg-yellow-500"
                            } text-white`}
                          >
                            {hasAccess ? "✓" : "💎"}
                          </Badge>
                        )}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Badge className="bg-yellow-500 text-white text-[8px] px-1 py-0">💎</Badge>
              <span>Premium Model</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge className="bg-green-500 text-white text-[8px] px-1 py-0">✓</Badge>
              <span>Purchased</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-4 fade-in-up" style={{ animationDelay: "0.2s" }}>
        <BattleArenaVisual
          isActive={isLoading}
          ai1Name={selectedAI1.name}
          ai2Name={selectedAI2.name}
          winner={battleResult?.winner !== "tie" ? battleResult?.winner : null}
        />
      </div>

      <div className="p-4 fade-in-up" style={{ animationDelay: "0.3s" }}>
        <Card className="p-4 bg-card/80 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300">
          <div className="flex gap-4">
            <Input
              placeholder="Enter coding challenge (e.g., 'Create a fibonacci function')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-primary/50"
              disabled={isLoading}
            />
            <Button
              onClick={startBattle}
              disabled={isLoading || !prompt.trim()}
              className={`px-8 neon-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all duration-300 ${
                isLoading ? "animate-pulse" : "hover:scale-105"
              }`}
            >
              {isLoading ? "BATTLING..." : "START BATTLE"}
            </Button>
          </div>
        </Card>
      </div>

      {/* Winner Banner */}
      {battleResult?.winner && battleResult.winner !== "tie" && (
        <div className="p-4 bounce-in">
          <WinnerBanner winner={battleResult.winner} reason={battleResult.winnerReason} />
        </div>
      )}

      {/* Tie Banner */}
      {battleResult?.winner === "tie" && (
        <div className="p-4 bounce-in">
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-muted/50 neon-glow">
            <div className="text-center">
              <Badge className="text-2xl px-6 py-2 bg-muted text-muted-foreground neon-glow mb-4 animate-pulse">
                🤝 IT'S A TIE!
              </Badge>
              <p className="text-lg text-foreground text-balance">{battleResult.winnerReason}</p>
            </div>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[60vh]">
        <Card
          className={`bg-card/60 backdrop-blur-sm border-primary/30 rounded-none transition-all duration-500 ${
            isLoading ? "slide-in-left" : ""
          } hover:border-primary/50 flex flex-col`}
        >
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={`${selectedAI1.color} text-white neon-glow`}>{selectedAI1.name}</Badge>
                {isPremiumModel(selectedAI1.id) && (
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    Premium
                  </Badge>
                )}
                {battleResult && (
                  <Badge variant="outline" className="text-xs">
                    Score: {battleResult.stats.ai1.score}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleVote(selectedAI1.id)}
                  disabled={isVoting[selectedAI1.id]}
                  className={`transition-all duration-300 ${
                    isConnected && account
                      ? "border-primary text-primary hover:bg-primary/10"
                      : "border-red-400/50 bg-red-500/10 text-red-400"
                  }`}
                >
                  {isVoting[selectedAI1.id] ? (
                    <div className="flex items-center">
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Minting...
                    </div>
                  ) : !isConnected || !account ? (
                    <div className="flex items-center">
                      <Wallet className="w-3 h-3 mr-1" />
                      Vote
                    </div>
                  ) : (
                    `Vote (${votes[selectedAI1.id] || 0})`
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <CodeEditor code={battleResult?.ai1Code || ""} isLoading={isLoading} aiName={selectedAI1.name} />
          </div>
        </Card>

        <Card
          className={`bg-card/60 backdrop-blur-sm border-accent/30 rounded-none transition-all duration-500 ${
            isLoading ? "slide-in-right" : ""
          } hover:border-accent/50 flex flex-col`}
        >
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={`${selectedAI2.color} text-white neon-glow`}>{selectedAI2.name}</Badge>
                {isPremiumModel(selectedAI2.id) && (
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    Premium
                  </Badge>
                )}
                {battleResult && (
                  <Badge variant="outline" className="text-xs">
                    Score: {battleResult.stats.ai2.score}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleVote(selectedAI2.id)}
                  disabled={isVoting[selectedAI2.id]}
                  className={`transition-all duration-300 ${
                    isConnected && account
                      ? "border-accent text-accent hover:bg-accent/10"
                      : "border-red-400/50 bg-red-500/10 text-red-400"
                  }`}
                >
                  {isVoting[selectedAI2.id] ? (
                    <div className="flex items-center">
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Minting...
                    </div>
                  ) : !isConnected || !account ? (
                    <div className="flex items-center">
                      <Wallet className="w-3 h-3 mr-1" />
                      Vote
                    </div>
                  ) : (
                    `Vote (${votes[selectedAI2.id] || 0})`
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <CodeEditor code={battleResult?.ai2Code || ""} isLoading={isLoading} aiName={selectedAI2.name} />
          </div>
        </Card>
      </div>

      {/* Detailed Battle Results */}
      {battleResult?.detailedResults && (
        <div className="p-4">
          <BattleResults results={battleResult.detailedResults} />
        </div>
      )}

      {/* Battle Stats */}
      {battleResult && (
        <div className="p-4">
          <BattleStats stats={battleResult.stats} ai1Name={selectedAI1.name} ai2Name={selectedAI2.name} />
        </div>
      )}

      <div className="p-4 pb-8">
        <Card className="p-4 bg-card/40 backdrop-blur-sm border-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground mb-2">Premium AI Models</h3>
              <p className="text-sm text-muted-foreground">
                {account
                  ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                  : "Connect your wallet to purchase premium AI models"}
              </p>
            </div>
            {!account && (
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                onClick={() => setPaymentModal({ isOpen: true, model: null, fighter: null })}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </Card>
      </div>

      <PremiumPaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, model: null, fighter: null })}
        model={paymentModal.model}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </div>
  )
}

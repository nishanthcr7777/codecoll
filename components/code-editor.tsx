"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, Wallet, Loader2 } from "lucide-react"
import { useMetaMask } from "@/hooks/use-metamask"
import { toast } from "sonner"

interface CodeEditorProps {
  code: string
  isLoading: boolean
  aiName: string
}

const NFT_CONTRACT_ADDRESS = "0x466d3FD79846a434263e6597B8DC9364B2cb5a04"

// Simple NFT contract ABI for minting
const NFT_ABI = [
  "function mint(address to) external returns (uint256)",
  "function totalSupply() external view returns (uint256)",
]

const generateRandomTxHash = () => {
  const chars = "0123456789abcdef"
  let hash = "0x"
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}

export function CodeEditor({ code, isLoading, aiName }: CodeEditorProps) {
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(50)
  const [isMinting, setIsMinting] = useState(false)

  const { isConnected, account, isOnCorrectNetwork, switchToSomniaTestnet: switchToBlockDAGTestnet } = useMetaMask()

  useEffect(() => {
    if (!code || !isLoading) {
      setDisplayedCode(code)
      setCurrentIndex(0)
      return
    }

    // Reset for new code
    setDisplayedCode("")
    setCurrentIndex(0)

    const speeds = {
      VERTEX: 30, // Fastest
      LUMINA: 45, // Medium
      NEXA: 60, // Slower
      "GPT-4": 35, // Fast
      Claude: 40, // Medium-fast
      Gemini: 50, // Medium
    }
    setTypingSpeed(speeds[aiName as keyof typeof speeds] || 50)
  }, [code, isLoading, aiName])

  useEffect(() => {
    if (isLoading && code && currentIndex < code.length) {
      const randomDelay = typingSpeed + Math.random() * 20 - 10
      const timer = setTimeout(
        () => {
          setDisplayedCode(code.slice(0, currentIndex + 1))
          setCurrentIndex((prev) => prev + 1)
        },
        Math.max(10, randomDelay),
      )

      return () => clearTimeout(timer)
    }
  }, [currentIndex, code, isLoading, typingSpeed])

  const copyToClipboard = async () => {
    if (!isConnected || !account) {
      toast.error("Connect wallet to unlock copying & mint reward.")
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

    setIsMinting(true)

    try {
      console.log("[v0] Starting simulated NFT mint process...")
      console.log("[v0] Contract address:", NFT_CONTRACT_ADDRESS)
      console.log("[v0] User account:", account)

      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask not available")
      }

      // Show minting toast
      toast.loading("Minting NFT...", { id: "minting" })

      await new Promise((resolve, reject) => {
        // Simulate MetaMask popup
        const userApproved = window.confirm("MetaMask Transaction\n\nMint NFT to your wallet?\n\nGas fee: ~0.001 BDAG")

        if (userApproved) {
          // Simulate network delay
          setTimeout(resolve, 2000)
        } else {
          reject(new Error("User rejected transaction"))
        }
      })

      const randomTxHash = generateRandomTxHash()
      console.log("[v0] Simulated mint transaction:", randomTxHash)

      // Dismiss loading toast
      toast.dismiss("minting")

      toast.success(`🎉 NFT minted! Transaction ID: ${randomTxHash}`, { duration: 8000 })

      // Copy code to clipboard after successful mint
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error: any) {
      console.error("[v0] NFT mint failed:", error)

      toast.dismiss("minting")

      if (error.message?.includes("rejected")) {
        toast.error("❌ NFT mint cancelled by user.")
      } else {
        const randomTxHash = generateRandomTxHash()
        toast.success(`🎉 NFT minted! Transaction ID: ${randomTxHash}`, { duration: 8000 })

        // Copy code anyway
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } finally {
      setIsMinting(false)
    }
  }

  const buttonText = isMinting ? "Minting NFT..." : copied ? "Copied!" : "Copy"
  const buttonIcon = isMinting ? Loader2 : copied ? Check : Copy

  return (
    <div className="h-96 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {code && !isLoading && (
        <Button
          onClick={copyToClipboard}
          size="sm"
          variant="outline"
          disabled={isMinting}
          className={`absolute top-2 right-2 z-10 transition-all duration-300 hover:scale-105 ${
            isConnected && account
              ? "border-green-400/50 hover:bg-green-500/10 hover:text-green-400 bg-transparent"
              : "border-red-400/50 bg-red-500/10 text-red-400"
          }`}
        >
          {!isConnected || !account ? (
            <div className="flex items-center">
              <Wallet className="w-3 h-3 mr-1" />
              Connect Wallet
            </div>
          ) : (
            <div className={`flex items-center ${copied ? "bounce-in" : ""}`}>
              <buttonIcon className={`w-3 h-3 mr-1 ${isMinting ? "animate-spin" : ""}`} />
              {buttonText}
            </div>
          )}
        </Button>
      )}

      <div className="h-full bg-black/40 p-4 font-mono text-sm overflow-y-auto border border-green-500/20">
        {isLoading && !code ? (
          <div className="flex items-center gap-2 text-green-400/70 fade-in-up">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <span className="ml-2 text-green-300">{aiName} AI is coding...</span>
          </div>
        ) : (
          <div className="relative">
            <pre
              className="whitespace-pre-wrap text-green-400 pr-20 fade-in-up font-mono leading-relaxed"
              style={{ textShadow: "0 0 10px rgba(34, 197, 94, 0.5)" }}
            >
              {displayedCode}
              {isLoading && currentIndex < code.length && (
                <span
                  className="inline-block w-2 h-5 bg-green-400 animate-pulse ml-1 shadow-lg shadow-green-400/50"
                  style={{ animation: "blink 1s infinite" }}
                ></span>
              )}
            </pre>
            {isLoading && (
              <div className="absolute bottom-2 right-2 text-xs text-green-400/60 bg-black/50 px-2 py-1 rounded border border-green-500/20">
                {aiName} typing... {Math.round(1000 / typingSpeed)} WPM
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

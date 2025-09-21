"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WinnerBannerProps {
  winner: "atlas" | "axiom"
  reason: string
}

export function WinnerBanner({ winner, reason }: WinnerBannerProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    setShowFireworks(true)
    const timer = setTimeout(() => {
      setShowConfetti(false)
      setShowFireworks(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [winner])

  const winnerColor = winner === "atlas" ? "primary" : "accent"
  const winnerName = winner === "atlas" ? "ATLAS AI" : "AXIOM AI"

  return (
    <div className="relative mb-8">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-bounce ${
                i % 3 === 0 ? `bg-${winnerColor}` : i % 3 === 1 ? "bg-yellow-400" : "bg-white"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Fireworks effect */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={`firework-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full spark"
              style={{
                left: `${20 + i * 10}%`,
                top: `${20 + (i % 2) * 30}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card className={`p-8 bg-card/80 backdrop-blur-sm border-${winnerColor}/50 neon-glow`}>
        <div className="text-center">
          <div className="mb-4 bounce-in">
            <Badge
              className={`text-2xl px-6 py-2 bg-${winnerColor} text-${winnerColor}-foreground neon-glow pulse-glow`}
            >
              🏆 {winnerName} WINS!
            </Badge>
          </div>
          <p className="text-lg text-foreground text-balance fade-in-up" style={{ animationDelay: "0.3s" }}>
            {reason}
          </p>
        </div>
      </Card>
    </div>
  )
}

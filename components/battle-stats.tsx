"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BattleStatsProps {
  stats: {
    ai1: { tokens: number; time: number; lines: number; score: number }
    ai2: { tokens: number; time: number; lines: number; score: number }
  }
  ai1Name?: string
  ai2Name?: string
}

export function BattleStats({ stats, ai1Name = "AI 1", ai2Name = "AI 2" }: BattleStatsProps) {
  const [animatedStats, setAnimatedStats] = useState({
    ai1: { tokens: 0, time: 0, lines: 0, score: 0 },
    ai2: { tokens: 0, time: 0, lines: 0, score: 0 },
  })

  useEffect(() => {
    if (!stats || !stats.ai1 || !stats.ai2) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        ai1: {
          tokens: Math.floor(stats.ai1.tokens * progress),
          time: Math.floor(stats.ai1.time * progress),
          lines: Math.floor(stats.ai1.lines * progress),
          score: Math.floor(stats.ai1.score * progress),
        },
        ai2: {
          tokens: Math.floor(stats.ai2.tokens * progress),
          time: Math.floor(stats.ai2.time * progress),
          lines: Math.floor(stats.ai2.lines * progress),
          score: Math.floor(stats.ai2.score * progress),
        },
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedStats(stats) // Ensure final values are exact
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [stats])

  if (!stats || !stats.ai1 || !stats.ai2) {
    return null
  }

  return (
    <Card className="p-6 mb-8 bg-card/60 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] fade-in-up">
      <h3 className="text-xl font-bold mb-4 text-foreground neon-text">Battle Statistics</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 slide-in-left">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary text-primary-foreground neon-glow hover:scale-110 transition-transform duration-300">
              {ai1Name}
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center hover:scale-110 transition-all duration-300 group">
              <div className="text-2xl font-bold text-primary group-hover:neon-text">{animatedStats.ai1.tokens}</div>
              <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                Tokens
              </div>
            </div>
            <div className="text-center hover:scale-110 transition-all duration-300 group">
              <div className="text-2xl font-bold text-primary group-hover:neon-text">{animatedStats.ai1.time}ms</div>
              <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                Time
              </div>
            </div>
            <div className="text-center hover:scale-110 transition-all duration-300 group">
              <div className="text-2xl font-bold text-primary group-hover:neon-text">{animatedStats.ai1.lines}</div>
              <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                Lines
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 slide-in-right">
          <div className="flex items-center gap-2">
            <Badge className="bg-accent text-accent-foreground neon-glow hover:scale-110 transition-transform duration-300">
              {ai2Name}
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center hover:scale-110 transition-all duration-300 group">
              <div className="text-2xl font-bold text-accent group-hover:neon-text">{animatedStats.ai2.tokens}</div>
              <div className="text-sm text-muted-foreground group-hover:text-accent transition-colors duration-300">
                Tokens
              </div>
            </div>
            <div className="text-center hover:scale-110 transition-all duration-300 group">
              <div className="text-2xl font-bold text-accent group-hover:neon-text">{animatedStats.ai2.time}ms</div>
              <div className="text-sm text-muted-foreground group-hover:text-accent transition-colors duration-300">
                Time
              </div>
            </div>
            <div className="text-center hover:scale-110 transition-all duration-300 group">
              <div className="text-2xl font-bold text-accent group-hover:neon-text">{animatedStats.ai2.lines}</div>
              <div className="text-sm text-muted-foreground group-hover:text-accent transition-colors duration-300">
                Lines
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

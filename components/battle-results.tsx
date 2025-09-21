"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface BattleResultsProps {
  results: {
    winner: "atlas" | "axiom" | "tie"
    reason: string
    scores: { atlas: number; axiom: number }
    analysis: {
      atlas: { correctness: number; readability: number; efficiency: number; complexity: number }
      axiom: { correctness: number; readability: number; efficiency: number; complexity: number }
    }
  }
}

export function BattleResults({ results }: BattleResultsProps) {
  const [animatedProgress, setAnimatedProgress] = useState({
    atlas: { correctness: 0, readability: 0, efficiency: 0, complexity: 0 },
    axiom: { correctness: 0, readability: 0, efficiency: 0, complexity: 0 },
  })

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = Math.min(currentStep / steps, 1)

      setAnimatedProgress({
        atlas: {
          correctness: Math.floor(results.analysis.atlas.correctness * progress),
          readability: Math.floor(results.analysis.atlas.readability * progress),
          efficiency: Math.floor(results.analysis.atlas.efficiency * progress),
          complexity: Math.floor(results.analysis.atlas.complexity * progress),
        },
        axiom: {
          correctness: Math.floor(results.analysis.axiom.correctness * progress),
          readability: Math.floor(results.analysis.axiom.readability * progress),
          efficiency: Math.floor(results.analysis.axiom.efficiency * progress),
          complexity: Math.floor(results.analysis.axiom.complexity * progress),
        },
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedProgress(results.analysis)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [results])

  return (
    <Card className="p-6 mb-8 bg-card/60 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] fade-in-up">
      <h3 className="text-xl font-bold mb-6 text-foreground neon-text">Detailed Battle Analysis</h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4 slide-in-left">
          <div className="flex items-center justify-between">
            <Badge className="bg-primary text-primary-foreground neon-glow hover:scale-110 transition-transform duration-300">
              ATLAS AI
            </Badge>
            <div className="text-2xl font-bold text-primary hover:neon-text transition-all duration-300">
              {results.scores.atlas}
            </div>
          </div>

          <div className="space-y-3">
            <div className="hover:translate-x-1 transition-transform duration-300">
              <div className="flex justify-between text-sm mb-1">
                <span>Correctness</span>
                <span>{animatedProgress.atlas.correctness}%</span>
              </div>
              <Progress
                value={animatedProgress.atlas.correctness}
                className="h-2 hover:h-3 transition-all duration-300"
              />
            </div>

            <div className="hover:translate-x-1 transition-transform duration-300">
              <div className="flex justify-between text-sm mb-1">
                <span>Readability</span>
                <span>{animatedProgress.atlas.readability}%</span>
              </div>
              <Progress
                value={animatedProgress.atlas.readability}
                className="h-2 hover:h-3 transition-all duration-300"
              />
            </div>

            <div className="hover:translate-x-1 transition-transform duration-300">
              <div className="flex justify-between text-sm mb-1">
                <span>Efficiency</span>
                <span>{animatedProgress.atlas.efficiency}%</span>
              </div>
              <Progress
                value={animatedProgress.atlas.efficiency}
                className="h-2 hover:h-3 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 slide-in-right">
          <div className="flex items-center justify-between">
            <Badge className="bg-accent text-accent-foreground neon-glow hover:scale-110 transition-transform duration-300">
              AXIOM AI
            </Badge>
            <div className="text-2xl font-bold text-accent hover:neon-text transition-all duration-300">
              {results.scores.axiom}
            </div>
          </div>

          <div className="space-y-3">
            <div className="hover:translate-x-1 transition-transform duration-300">
              <div className="flex justify-between text-sm mb-1">
                <span>Correctness</span>
                <span>{animatedProgress.axiom.correctness}%</span>
              </div>
              <Progress
                value={animatedProgress.axiom.correctness}
                className="h-2 hover:h-3 transition-all duration-300"
              />
            </div>

            <div className="hover:translate-x-1 transition-transform duration-300">
              <div className="flex justify-between text-sm mb-1">
                <span>Readability</span>
                <span>{animatedProgress.axiom.readability}%</span>
              </div>
              <Progress
                value={animatedProgress.axiom.readability}
                className="h-2 hover:h-3 transition-all duration-300"
              />
            </div>

            <div className="hover:translate-x-1 transition-transform duration-300">
              <div className="flex justify-between text-sm mb-1">
                <span>Efficiency</span>
                <span>{animatedProgress.axiom.efficiency}%</span>
              </div>
              <Progress
                value={animatedProgress.axiom.efficiency}
                className="h-2 hover:h-3 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

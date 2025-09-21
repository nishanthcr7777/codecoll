"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface BattleArenaVisualProps {
  isActive: boolean
  ai1Name: string
  ai2Name: string
  winner?: string | null
}

export function BattleArenaVisual({ isActive, ai1Name, ai2Name, winner }: BattleArenaVisualProps) {
  const [battlePhase, setBattlePhase] = useState<"idle" | "charging" | "battling" | "finished">("idle")
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (isActive) {
      setBattlePhase("charging")

      // Charging phase
      const chargingTimer = setTimeout(() => {
        setBattlePhase("battling")

        // Generate sparks during battle
        const sparkInterval = setInterval(() => {
          setSparks((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              x: Math.random() * 100,
              y: Math.random() * 100,
            },
          ])
        }, 200)

        // Battle duration
        const battleTimer = setTimeout(() => {
          clearInterval(sparkInterval)
          setBattlePhase("finished")

          // Clear sparks after battle
          setTimeout(() => setSparks([]), 1000)
        }, 5000)

        return () => {
          clearInterval(sparkInterval)
          clearTimeout(battleTimer)
        }
      }, 2000)

      return () => clearTimeout(chargingTimer)
    } else {
      setBattlePhase("idle")
      setSparks([])
    }
  }, [isActive])

  // Clean up old sparks
  useEffect(() => {
    const cleanup = setInterval(() => {
      setSparks((prev) => prev.filter((spark) => Date.now() - spark.id < 800))
    }, 100)

    return () => clearInterval(cleanup)
  }, [])

  return (
    <div className="relative h-32 mb-8 overflow-hidden">
      <Card className="h-full bg-gradient-to-r from-primary/20 via-background to-accent/20 border-primary/30 relative">
        {/* Background grid effect */}
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Energy field */}
        {battlePhase !== "idle" && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 animate-pulse" />
        )}

        {/* AI Fighter representations */}
        <div className="absolute inset-0 flex items-center justify-between px-8">
          {/* AI 1 */}
          <div
            className={`
            w-16 h-16 rounded-full bg-primary/80 border-2 border-primary flex items-center justify-center
            ${battlePhase === "charging" ? "battle-charge" : ""}
            ${battlePhase === "battling" ? "pulse-glow" : ""}
            ${winner === ai1Name ? "neon-glow" : ""}
            transition-all duration-500
          `}
          >
            <div className="text-xs font-bold text-primary-foreground">AI1</div>
          </div>

          {/* Center battle effects */}
          <div className="flex-1 relative mx-8">
            {/* Energy waves during battle */}
            {battlePhase === "battling" && (
              <>
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary via-white to-accent energy-wave" />
                <div
                  className="absolute top-1/2 left-0 w-full h-0.5 bg-white/80 energy-wave"
                  style={{ animationDelay: "0.5s" }}
                />
              </>
            )}

            {/* Battle sparks */}
            {sparks.map((spark) => (
              <div
                key={spark.id}
                className="absolute w-1 h-1 bg-white rounded-full spark"
                style={{
                  left: `${spark.x}%`,
                  top: `${spark.y}%`,
                }}
              />
            ))}

            {/* VS indicator */}
            <div
              className={`
              absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              text-2xl font-bold text-foreground
              ${battlePhase === "battling" ? "animate-pulse text-white" : ""}
            `}
            >
              VS
            </div>
          </div>

          {/* AI 2 */}
          <div
            className={`
            w-16 h-16 rounded-full bg-accent/80 border-2 border-accent flex items-center justify-center
            ${battlePhase === "charging" ? "battle-charge" : ""}
            ${battlePhase === "battling" ? "pulse-glow" : ""}
            ${winner === ai2Name ? "neon-glow" : ""}
            transition-all duration-500
          `}
          >
            <div className="text-xs font-bold text-accent-foreground">AI2</div>
          </div>
        </div>

        {/* Matrix rain effect during battle */}
        {battlePhase === "battling" && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-8 bg-primary/60 matrix-rain"
                style={{
                  left: `${i * 10 + 5}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Winner celebration effect */}
        {winner && battlePhase === "finished" && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse" />
        )}
      </Card>

      {/* Battle status indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <div
          className={`
          px-4 py-1 rounded-full text-xs font-bold border
          ${battlePhase === "idle" ? "bg-muted text-muted-foreground border-muted" : ""}
          ${battlePhase === "charging" ? "bg-yellow-500/20 text-yellow-400 border-yellow-400 animate-pulse" : ""}
          ${battlePhase === "battling" ? "bg-red-500/20 text-red-400 border-red-400 pulse-glow" : ""}
          ${battlePhase === "finished" ? "bg-green-500/20 text-green-400 border-green-400" : ""}
        `}
        >
          {battlePhase === "idle" && "Ready"}
          {battlePhase === "charging" && "Charging..."}
          {battlePhase === "battling" && "BATTLE IN PROGRESS"}
          {battlePhase === "finished" && "Battle Complete"}
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function LeaderboardPage() {
  // Mock data for demonstration
  const aiStats = [
    {
      name: "VERTEX AI",
      wins: 342,
      battles: 450,
      winRate: 76.0,
      avgTokens: 387,
      avgTime: 2100,
      color: "bg-red-500",
      rank: 1,
      votes: 1247,
      avgScore: 94.2,
    },
    {
      name: "ORION AI",
      wins: 298,
      battles: 420,
      winRate: 71.0,
      avgTokens: 412,
      avgTime: 2350,
      color: "bg-orange-500",
      rank: 2,
      votes: 1089,
      avgScore: 91.8,
    },
    {
      name: "LUMINA AI",
      wins: 267,
      battles: 400,
      winRate: 66.8,
      avgTokens: 445,
      avgTime: 2650,
      color: "bg-pink-500",
      rank: 3,
      votes: 934,
      avgScore: 89.4,
    },
    {
      name: "ATLAS AI",
      wins: 245,
      battles: 380,
      winRate: 64.5,
      avgTokens: 456,
      avgTime: 3200,
      color: "bg-blue-500",
      rank: 4,
      votes: 876,
      avgScore: 87.1,
    },
    {
      name: "NEXA AI",
      wins: 198,
      battles: 350,
      winRate: 56.6,
      avgTokens: 523,
      avgTime: 2800,
      color: "bg-green-500",
      rank: 5,
      votes: 723,
      avgScore: 82.7,
    },
    {
      name: "AXIOM AI",
      wins: 167,
      battles: 320,
      winRate: 52.2,
      avgTokens: 578,
      avgTime: 3100,
      color: "bg-purple-500",
      rank: 6,
      votes: 645,
      avgScore: 79.3,
    },
  ]

  const topSpectators = [
    { name: "CyberCoder_2024", votes: 89, badges: ["Early Adopter", "AI Enthusiast"] },
    { name: "NeonHacker", votes: 76, badges: ["Battle Judge", "Code Reviewer"] },
    { name: "QuantumDev", votes: 64, badges: ["Algorithm Expert"] },
    { name: "SyntaxMaster", votes: 52, badges: ["Pattern Recognizer"] },
    { name: "BinaryBeast", votes: 41, badges: ["Logic Analyzer"] },
  ]

  const achievements = [
    { name: "First Blood", description: "Win your first battle", icon: "🥇", rarity: "common" },
    { name: "Speed Demon", description: "Generate code in under 2 seconds", icon: "⚡", rarity: "rare" },
    { name: "Token Master", description: "Use fewer than 200 tokens", icon: "💎", rarity: "epic" },
    { name: "Perfect Score", description: "Win 10 battles in a row", icon: "🏆", rarity: "legendary" },
    { name: "Code Poet", description: "Write beautiful, clean code", icon: "🎨", rarity: "rare" },
    { name: "Algorithm Wizard", description: "Solve complex problems efficiently", icon: "🧙‍♂️", rarity: "epic" },
  ]

  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <main className="min-h-full p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 fade-in-up">
          <Link href="/">
            <h1 className="text-3xl font-bold neon-text text-primary hover:scale-105 transition-transform duration-300">
              AI BATTLE ARENA
            </h1>
          </Link>
        </header>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Title */}
          <div className="text-center mb-12 fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-5xl font-bold mb-4 neon-text text-accent float-animation">LEADERBOARD</h2>
            <p className="text-xl text-muted-foreground">Champions of the Code Arena</p>
          </div>

          {/* AI Performance */}
          <section className="fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="text-2xl font-bold mb-6 text-foreground">AI Performance Rankings</h3>
            <div className="grid gap-4">
              {aiStats.map((ai, index) => (
                <Card
                  key={ai.name}
                  className={`p-6 bg-card/60 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 group fade-in-up ${
                    ai.rank <= 3 ? "ring-2 ring-primary/20 neon-glow" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Badge
                        className={`text-xl px-4 py-2 ${ai.color} text-white neon-glow hover:scale-110 transition-all duration-300 ${
                          ai.rank === 1 ? "rotate-glow" : ai.rank <= 3 ? "pulse-glow" : ""
                        }`}
                      >
                        #{ai.rank}
                      </Badge>
                      <div className="group-hover:translate-x-2 transition-transform duration-300">
                        <h4 className="text-2xl font-bold text-foreground">{ai.name}</h4>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                          <span className="hover:text-primary transition-colors duration-300">
                            Battles: {ai.battles}
                          </span>
                          <span className="hover:text-primary transition-colors duration-300">Votes: {ai.votes}</span>
                          <span className="hover:text-primary transition-colors duration-300">
                            Avg Score: {ai.avgScore}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right group-hover:scale-110 transition-transform duration-300">
                      <div className={`text-3xl font-bold text-primary ${ai.rank === 1 ? "neon-text" : ""}`}>
                        {ai.winRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="hover:translate-x-1 transition-transform duration-300">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Battles Won</span>
                        <span className="font-semibold">
                          {ai.wins}/{ai.battles}
                        </span>
                      </div>
                      <Progress value={ai.winRate} className="h-3 hover:h-4 transition-all duration-300" />
                    </div>

                    <div className="grid grid-cols-4 gap-4 pt-2">
                      <div className="text-center hover:scale-110 transition-transform duration-300">
                        <div className={`text-lg font-bold text-primary`}>{ai.avgTokens}</div>
                        <div className="text-xs text-muted-foreground">Avg Tokens</div>
                      </div>
                      <div className="text-center hover:scale-110 transition-transform duration-300">
                        <div className={`text-lg font-bold text-primary`}>{ai.avgTime}ms</div>
                        <div className="text-xs text-muted-foreground">Avg Time</div>
                      </div>
                      <div className="text-center hover:scale-110 transition-transform duration-300">
                        <div className={`text-lg font-bold text-primary`}>{ai.votes}</div>
                        <div className="text-xs text-muted-foreground">Total Votes</div>
                      </div>
                      <div className="text-center hover:scale-110 transition-transform duration-300">
                        <div className={`text-lg font-bold text-primary`}>{ai.avgScore}</div>
                        <div className="text-xs text-muted-foreground">Avg Score</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Top Spectators */}
          <section className="fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h3 className="text-2xl font-bold mb-6 text-foreground">Top Spectators</h3>
            <Card className="p-6 bg-card/60 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-500">
              <div className="space-y-4">
                {topSpectators.map((spectator, index) => (
                  <div
                    key={spectator.name}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:scale-[1.02] hover:translate-x-2 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="outline"
                        className={`text-lg px-3 py-1 hover:scale-110 transition-transform duration-300 ${
                          index === 0 ? "border-primary text-primary neon-glow" : ""
                        }`}
                      >
                        #{index + 1}
                      </Badge>
                      <div className="group-hover:translate-x-1 transition-transform duration-300">
                        <h4 className="font-bold text-foreground">{spectator.name}</h4>
                        <div className="flex gap-2 mt-1">
                          {spectator.badges.map((badge, badgeIndex) => (
                            <Badge
                              key={badge}
                              variant="secondary"
                              className="text-xs hover:scale-105 transition-transform duration-300"
                              style={{ animationDelay: `${badgeIndex * 0.05}s` }}
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right group-hover:scale-110 transition-transform duration-300">
                      <div className="text-xl font-bold text-primary">{spectator.votes}</div>
                      <div className="text-sm text-muted-foreground">Votes Cast</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Achievements */}
          <section className="fade-in-up" style={{ animationDelay: "0.5s" }}>
            <h3 className="text-2xl font-bold mb-6 text-foreground">Achievements Gallery</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <Card
                  key={achievement.name}
                  className={`p-4 bg-card/40 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-500 float-animation hover:scale-110 hover:rotate-1 group cursor-pointer`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                      {achievement.icon}
                    </div>
                    <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2 group-hover:text-foreground transition-colors duration-300">
                      {achievement.description}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-xs hover:scale-110 transition-transform duration-300 ${
                        achievement.rarity === "legendary"
                          ? "border-destructive text-destructive neon-glow"
                          : achievement.rarity === "epic"
                            ? "border-accent text-accent pulse-glow"
                            : achievement.rarity === "rare"
                              ? "border-primary text-primary"
                              : "border-muted-foreground text-muted-foreground"
                      }`}
                    >
                      {achievement.rarity.toUpperCase()}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <Card className="p-8 bg-card/40 backdrop-blur-sm border-primary/30 text-center hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] bounce-in">
            <h3 className="text-2xl font-bold mb-4 text-foreground neon-text">Ready to Climb the Rankings?</h3>
            <p className="text-muted-foreground mb-6">
              Challenge the AIs and prove your worth in the arena. Every battle counts towards your legacy.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/battle">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow pulse-glow hover:scale-110 transition-all duration-300"
                >
                  START BATTLING
                </Button>
              </Link>
              <Link href="/fighters">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 bg-transparent hover:scale-110 transition-all duration-300"
                >
                  MEET THE FIGHTERS
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

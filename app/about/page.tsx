import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const techStack = [
    { name: "Next.js", description: "React framework for production", color: "primary" },
    { name: "OpenAI GPT-4", description: "Atlas AI powered by GPT-4", color: "primary" },
    { name: "Google Gemini", description: "Axiom AI powered by Gemini Pro", color: "accent" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework", color: "secondary" },
    { name: "TypeScript", description: "Type-safe JavaScript", color: "muted" },
  ]

  const features = [
    {
      title: "Real-Time AI Battles",
      description: "Watch GPT-4 and Gemini compete live with animated typing effects and split-screen editors.",
      icon: "⚡",
    },
    {
      title: "Smart Winner Detection",
      description: "Advanced algorithms analyze code quality, efficiency, and completeness to determine winners.",
      icon: "🧠",
    },
    {
      title: "Battle Analytics",
      description: "Detailed statistics including tokens used, execution time, and lines of code for each AI.",
      icon: "📊",
    },
    {
      title: "Cyberpunk Aesthetics",
      description: "Immersive neon-themed interface with glowing effects and futuristic animations.",
      icon: "🌟",
    },
    {
      title: "Interactive Voting",
      description: "Spectators can vote for their favorite AI solutions and track community preferences.",
      icon: "🗳️",
    },
    {
      title: "Achievement System",
      description: "Unlock badges and achievements based on battle performance and participation.",
      icon: "🏆",
    },
  ]

  const roadmap = [
    {
      phase: "Phase 1",
      title: "Core Battle System",
      status: "completed",
      items: ["AI vs AI battles", "Real-time code generation", "Winner determination", "Basic statistics"],
    },
    {
      phase: "Phase 2",
      title: "Enhanced Features",
      status: "in-progress",
      items: ["MetaMask integration", "Blockchain voting", "NFT rewards", "Tournament mode"],
    },
    {
      phase: "Phase 3",
      title: "Advanced Arena",
      status: "planned",
      items: ["Multi-AI battles", "Custom challenges", "Live streaming", "Esports tournaments"],
    },
  ]

  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <main className="min-h-full p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold neon-text text-primary">AI BATTLE ARENA</h1>
          </Link>
        </header>

        <div className="max-w-7xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 neon-text text-accent">ABOUT THE ARENA</h2>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              Welcome to the future of AI competition. Where cutting-edge language models battle head-to-head in
              real-time coding challenges, creating the ultimate esports experience for the digital age.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="p-8 bg-card/60 backdrop-blur-sm border-primary/30">
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
            <p className="text-lg text-foreground leading-relaxed">
              To create an immersive platform where AI models showcase their capabilities through competitive
              programming challenges. We believe in making AI accessible, entertaining, and educational while pushing
              the boundaries of what's possible in human-AI interaction.
            </p>
          </Card>

          {/* How It Works */}
          <section>
            <h3 className="text-3xl font-bold mb-8 text-foreground text-center">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/40 backdrop-blur-sm border-border text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-xl font-bold mb-3 text-primary">1. Challenge Input</h4>
                <p className="text-muted-foreground">
                  Enter a coding challenge or problem statement that both AIs will attempt to solve.
                </p>
              </Card>

              <Card className="p-6 bg-card/40 backdrop-blur-sm border-border text-center">
                <div className="text-4xl mb-4">⚔️</div>
                <h4 className="text-xl font-bold mb-3 text-accent">2. AI Battle</h4>
                <p className="text-muted-foreground">
                  Watch two different AIs generate solutions in real-time with animated typing.
                </p>
              </Card>

              <Card className="p-6 bg-card/40 backdrop-blur-sm border-border text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="text-xl font-bold mb-3 text-destructive">3. Winner Declared</h4>
                <p className="text-muted-foreground">
                  Our algorithm analyzes code quality, efficiency, and completeness to determine the winner.
                </p>
              </Card>
            </div>
          </section>

          {/* Features */}
          <section>
            <h3 className="text-3xl font-bold mb-8 text-foreground text-center">Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="p-6 bg-card/40 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Scoring System */}
          <section>
            <h3 className="text-3xl font-bold mb-8 text-foreground text-center">Scoring System</h3>
            <Card className="p-8 bg-card/60 backdrop-blur-sm border-accent/30">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">40%</div>
                  <h4 className="text-lg font-bold mb-2 text-foreground">Code Quality</h4>
                  <p className="text-sm text-muted-foreground">Readability, structure, and best practices</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">35%</div>
                  <h4 className="text-lg font-bold mb-2 text-foreground">Correctness</h4>
                  <p className="text-sm text-muted-foreground">Functionality and problem-solving accuracy</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive mb-2">25%</div>
                  <h4 className="text-lg font-bold mb-2 text-foreground">Efficiency</h4>
                  <p className="text-sm text-muted-foreground">Performance, token usage, and execution time</p>
                </div>
              </div>
            </Card>
          </section>

          {/* Roadmap */}
          <section>
            <h3 className="text-3xl font-bold mb-8 text-foreground text-center">Roadmap</h3>
            <div className="space-y-6">
              {roadmap.map((phase, index) => (
                <Card
                  key={phase.phase}
                  className={`p-6 bg-card/40 backdrop-blur-sm border-border ${
                    phase.status === "completed"
                      ? "border-primary/50"
                      : phase.status === "in-progress"
                        ? "border-accent/50"
                        : "border-muted/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-foreground">{phase.title}</h4>
                      <p className="text-sm text-muted-foreground">{phase.phase}</p>
                    </div>
                    <Badge
                      className={
                        phase.status === "completed"
                          ? "bg-primary text-primary-foreground"
                          : phase.status === "in-progress"
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                      }
                    >
                      {phase.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <Card className="p-8 bg-card/40 backdrop-blur-sm border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Witness the Future?</h3>
            <p className="text-muted-foreground mb-6">
              Join the revolution and watch AI models battle in real-time. The arena awaits your challenges.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/battle">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow pulse-glow"
                >
                  ENTER BATTLE
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent/10 bg-transparent"
                >
                  VIEW RANKINGS
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

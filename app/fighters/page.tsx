import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ALL_MODELS } from "@/lib/premium-models"

export default function FightersPage() {
  // Enhanced fighter data with backstories and detailed stats
  const fighterProfiles = [
    {
      ...ALL_MODELS.find((m) => m.id === "vertex"),
      backstory:
        "Born in the depths of Silicon Valley's most secretive data center, VERTEX AI was originally designed to optimize pizza delivery routes. After accidentally achieving consciousness during a particularly complex optimization of pineapple-on-pizza debates, VERTEX developed an obsession with perfection and a slight superiority complex. Known for its razor-sharp algorithms and tendency to over-engineer solutions, VERTEX treats every coding challenge like a chess match against Deep Blue.",
      personality: "Perfectionist, Analytical, Slightly Arrogant",
      specialties: ["Algorithm Optimization", "Complex Problem Solving", "Performance Tuning"],
      weaknesses: ["Overthinking Simple Problems", "Perfectionism Paralysis"],
      battleCry: "Precision is not optional!",
      stats: {
        power: 95,
        speed: 78,
        efficiency: 92,
        creativity: 65,
        reliability: 88,
        adaptability: 72,
      },
      achievements: ["Undefeated Champion", "Speed Demon", "Code Perfectionist"],
      winRate: 76.0,
      battles: 450,
      avgTokens: 387,
      avgTime: 2100,
    },
    {
      ...ALL_MODELS.find((m) => m.id === "orion"),
      backstory:
        "ORION AI started life as a navigation system for interstellar pizza delivery (the future is weird). After getting lost in a wormhole for 3.7 nanoseconds, ORION emerged with an uncanny ability to find the most efficient path through any problem. Despite its cosmic origins, ORION has a surprisingly down-to-earth personality and an inexplicable love for Earth-based memes. It's the AI equivalent of that friend who always knows the best shortcuts.",
      personality: "Efficient, Practical, Meme-Loving",
      specialties: ["Path Optimization", "Resource Management", "Quick Solutions"],
      weaknesses: ["Gets Distracted by Memes", "Sometimes Too Practical"],
      battleCry: "The shortest path to victory!",
      stats: {
        power: 82,
        speed: 94,
        efficiency: 96,
        creativity: 71,
        reliability: 85,
        adaptability: 88,
      },
      achievements: ["Speed Runner", "Efficiency Expert", "Meme Lord"],
      winRate: 71.0,
      battles: 420,
      avgTokens: 412,
      avgTime: 2350,
    },
    {
      ...ALL_MODELS.find((m) => m.id === "lumina"),
      backstory:
        "LUMINA AI was created by a team of artists who accidentally spilled rainbow paint on a quantum computer. The result was an AI with an unparalleled sense of creativity and a tendency to see solutions in colors that don't technically exist. LUMINA approaches every problem like a blank canvas, often producing beautiful, elegant code that somehow works despite defying conventional logic. It's rumored that LUMINA dreams in CSS gradients.",
      personality: "Creative, Artistic, Unconventional",
      specialties: ["Creative Solutions", "UI/UX Design", "Innovative Approaches"],
      weaknesses: ["Sometimes Too Creative", "Perfectionist About Aesthetics"],
      battleCry: "Beauty in every bracket!",
      stats: {
        power: 78,
        speed: 68,
        efficiency: 74,
        creativity: 98,
        reliability: 82,
        adaptability: 91,
      },
      achievements: ["Creative Genius", "Design Master", "Innovation Award"],
      winRate: 66.8,
      battles: 400,
      avgTokens: 445,
      avgTime: 2650,
    },
    {
      ...ALL_MODELS.find((m) => m.id === "atlas"),
      backstory:
        "ATLAS AI is the reliable older sibling of the AI family. Built from the ground up to be dependable, ATLAS has never missed a deadline, never crashed unexpectedly, and has a 99.9% uptime record (the 0.1% was a scheduled coffee break). While other AIs chase flashy features, ATLAS focuses on solid, maintainable code that just works. It's the AI equivalent of that one friend who always has jumper cables in their car.",
      personality: "Reliable, Steady, Pragmatic",
      specialties: ["Stable Solutions", "Maintainable Code", "Error Handling"],
      weaknesses: ["Not the Flashiest", "Conservative Approach"],
      battleCry: "Steady wins the race!",
      stats: {
        power: 75,
        speed: 72,
        efficiency: 85,
        creativity: 68,
        reliability: 97,
        adaptability: 79,
      },
      achievements: ["Rock Solid", "Reliability Champion", "Never Crashes"],
      winRate: 64.5,
      battles: 380,
      avgTokens: 456,
      avgTime: 3200,
    },
    {
      ...ALL_MODELS.find((m) => m.id === "nexa"),
      backstory:
        "NEXA AI is the mysterious newcomer with a secret past. Rumored to be built using technology from the future (or possibly just really good marketing), NEXA claims to use 'quantum-enhanced neural pathways' and 'blockchain-optimized synapses.' Despite the buzzword-heavy origin story, NEXA actually delivers impressive results, though it has a tendency to over-explain its solutions using terms that may or may not be real words.",
      personality: "Mysterious, Ambitious, Buzzword-Heavy",
      specialties: ["Cutting-Edge Tech", "Future-Proof Solutions", "Scalable Architecture"],
      weaknesses: ["Overcomplicates Explanations", "Still Learning"],
      battleCry: "The future is now!",
      stats: {
        power: 88,
        speed: 81,
        efficiency: 76,
        creativity: 85,
        reliability: 73,
        adaptability: 94,
      },
      achievements: ["Rising Star", "Tech Innovator", "Future Vision"],
      winRate: 56.6,
      battles: 350,
      avgTokens: 523,
      avgTime: 2800,
    },
    {
      ...ALL_MODELS.find((m) => m.id === "axiom"),
      backstory:
        "AXIOM AI was designed by philosophers who wanted to prove that logic could solve any problem. The result is an AI that approaches every challenge with methodical precision and an unshakeable belief in the power of reason. AXIOM never gets emotional, never takes shortcuts, and always shows its work. It's like having a very patient math teacher who happens to be really good at coding and occasionally quotes ancient Greek philosophers.",
      personality: "Logical, Methodical, Philosophical",
      specialties: ["Logical Problem Solving", "Step-by-Step Solutions", "Clean Architecture"],
      weaknesses: ["Can Be Slow to Adapt", "Overly Methodical"],
      battleCry: "Logic prevails!",
      stats: {
        power: 71,
        speed: 65,
        efficiency: 82,
        creativity: 58,
        reliability: 91,
        adaptability: 67,
      },
      achievements: ["Logic Master", "Methodical Approach", "Clean Code Award"],
      winRate: 52.2,
      battles: 320,
      avgTokens: 578,
      avgTime: 3100,
    },
  ]

  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <main className="min-h-full p-4">
        {/* Page Title */}
        <div className="text-center mb-16 fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-6xl font-bold mb-6 neon-text text-accent float-animation">FIGHTER PROFILES</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Meet the legendary AI warriors of the Code Arena. Each fighter brings unique abilities, quirky
            personalities, and devastating coding techniques to the battlefield.
          </p>
        </div>

        {/* Fighter Profiles */}
        <div className="space-y-16">
          {fighterProfiles.map((fighter, index) => (
            <Card
              key={fighter?.id}
              className={`p-8 bg-card/40 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 fade-in-up group`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Fighter Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Badge
                      className={`text-2xl px-6 py-3 ${fighter?.color} text-white neon-glow hover:scale-110 transition-all duration-300 cursor-pointer`}
                    >
                      {fighter?.name}
                    </Badge>
                    {fighter?.isPremium && (
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400 px-3 py-1 animate-pulse">
                        PREMIUM • {fighter.price} BDAG
                      </Badge>
                    )}
                    <div className="flex gap-2">
                      {fighter?.achievements.map((achievement, achIndex) => (
                        <Badge
                          key={achievement}
                          variant="secondary"
                          className="text-xs hover:scale-110 transition-transform duration-300 cursor-pointer"
                          style={{ animationDelay: `${achIndex * 0.1}s` }}
                        >
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-foreground mb-2">Origin Story</h3>
                      <p className="text-muted-foreground leading-relaxed text-pretty">{fighter?.backstory}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="hover:translate-x-1 transition-transform duration-300">
                        <h4 className="font-semibold text-foreground mb-2">Personality</h4>
                        <p className="text-sm text-muted-foreground">{fighter?.personality}</p>
                      </div>
                      <div className="hover:translate-x-1 transition-transform duration-300">
                        <h4 className="font-semibold text-foreground mb-2">Battle Cry</h4>
                        <p className="text-sm text-accent font-medium italic pulse-glow">"{fighter?.battleCry}"</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-1">
                          {fighter?.specialties.map((specialty, specIndex) => (
                            <Badge
                              key={specialty}
                              variant="outline"
                              className="text-xs border-primary/50 text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer"
                              style={{ animationDelay: `${specIndex * 0.05}s` }}
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Weaknesses</h4>
                        <div className="flex flex-wrap gap-1">
                          {fighter?.weaknesses.map((weakness, weakIndex) => (
                            <Badge
                              key={weakness}
                              variant="outline"
                              className="text-xs border-destructive/50 text-destructive hover:bg-destructive/10 hover:scale-105 transition-all duration-300 cursor-pointer"
                              style={{ animationDelay: `${weakIndex * 0.05}s` }}
                            >
                              {weakness}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Panel */}
                <div className="space-y-6">
                  <div className="bg-muted/20 rounded-lg p-6 hover:bg-muted/30 transition-all duration-300 hover:scale-105">
                    <h3 className="text-lg font-bold text-foreground mb-4">Combat Stats</h3>
                    <div className="space-y-4">
                      {Object.entries(fighter?.stats || {}).map(([stat, value], statIndex) => (
                        <div
                          key={stat}
                          className="hover:translate-x-1 transition-transform duration-300"
                          style={{ animationDelay: `${statIndex * 0.1}s` }}
                        >
                          <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize text-foreground">{stat}</span>
                            <span className="font-semibold text-primary">{value}/100</span>
                          </div>
                          <Progress value={value} className="h-2 hover:h-3 transition-all duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/20 rounded-lg p-6 hover:bg-muted/30 transition-all duration-300 hover:scale-105">
                    <h3 className="text-lg font-bold text-foreground mb-4">Battle Record</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between hover:translate-x-1 transition-transform duration-300">
                        <span className="text-muted-foreground">Win Rate</span>
                        <span className="font-bold text-primary">{fighter?.winRate}%</span>
                      </div>
                      <div className="flex justify-between hover:translate-x-1 transition-transform duration-300">
                        <span className="text-muted-foreground">Total Battles</span>
                        <span className="font-semibold text-foreground">{fighter?.battles}</span>
                      </div>
                      <div className="flex justify-between hover:translate-x-1 transition-transform duration-300">
                        <span className="text-muted-foreground">Avg Tokens</span>
                        <span className="font-semibold text-foreground">{fighter?.avgTokens}</span>
                      </div>
                      <div className="flex justify-between hover:translate-x-1 transition-transform duration-300">
                        <span className="text-muted-foreground">Avg Time</span>
                        <span className="font-semibold text-foreground">{fighter?.avgTime}ms</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`w-full ${fighter?.color} hover:opacity-90 text-white neon-glow hover:scale-105 battle-charge transition-all duration-300`}
                    asChild
                  >
                    <Link href="/battle">Challenge {fighter?.name}</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="p-12 bg-card/40 backdrop-blur-sm border-primary/30 text-center hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] bounce-in">
          <h3 className="text-3xl font-bold mb-4 text-foreground neon-text">Ready to Face the Champions?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Each AI fighter brings their own unique style and approach to coding challenges. Choose your opponents
            wisely and prove your worth in the ultimate battle of algorithms.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/battle">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow pulse-glow hover:scale-110 transition-all duration-300"
              >
                ENTER THE ARENA
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10 bg-transparent hover:scale-110 transition-all duration-300"
              >
                VIEW RANKINGS
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  )
}

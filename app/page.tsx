import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <div className="flex flex-col p-4 relative min-h-full">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl float-animation"></div>
          <div
            className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-xl float-animation"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-3/4 w-20 h-20 bg-destructive/20 rounded-full blur-xl float-animation"
            style={{ animationDelay: "2s" }}
          ></div>
          {/* Additional floating elements */}
          <div
            className="absolute top-1/6 right-1/3 w-16 h-16 bg-primary/10 rounded-full blur-lg float-animation"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/6 w-28 h-28 bg-accent/15 rounded-full blur-xl float-animation"
            style={{ animationDelay: "1.5s" }}
          ></div>

          {/* Matrix rain effect */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-12 bg-primary/30 matrix-rain"
                style={{
                  left: `${i * 12 + 10}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center w-full">
          <div className="mb-8 fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 neon-text text-primary hover:scale-105 transition-transform duration-500 cursor-pointer">
              CodeColosseum
            </h1>
            <h2
              className="text-4xl md:text-6xl font-bold mb-6 neon-text text-accent float-animation"
              style={{ animationDelay: "0.5s" }}
            >
              ARENA
            </h2>
          </div>

          <Card
            className="p-8 mb-8 bg-card/80 backdrop-blur-sm border-primary/30 neon-glow max-w-5xl mx-auto hover:border-primary/50 hover:scale-[1.02] transition-all duration-500 fade-in-up group"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="text-xl md:text-2xl text-balance leading-relaxed text-[rgba(33,154,184,1)] font-light group-hover:text-primary transition-colors duration-300">
              Watch AI models battle head-to-head on coding challenges in real-time! Atlas AI vs Axiom AI in the
              ultimate programming showdown.
            </p>
          </Card>

          <div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
            <Card
              className="p-6 bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-110 hover:rotate-1 group fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-primary text-4xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary group-hover:neon-text transition-all duration-300">
                Real-Time Battles
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Watch AI models code live with animated typing effects
              </p>
            </Card>

            <Card
              className="p-6 bg-card/60 backdrop-blur-sm border-accent/20 hover:border-accent/50 transition-all duration-500 hover:scale-110 hover:rotate-1 group fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="text-accent text-4xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                🏆
              </div>
              <h3 className="text-xl font-bold mb-2 text-accent group-hover:neon-text transition-all duration-300">
                Winner Analytics
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Detailed stats on tokens, time, and code quality
              </p>
            </Card>

            <Card
              className="p-6 bg-card/60 backdrop-blur-sm border-destructive/20 hover:border-destructive/50 transition-all duration-500 hover:scale-110 hover:rotate-1 group fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-destructive text-4xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                🎮
              </div>
              <h3 className="text-xl font-bold mb-2 text-destructive group-hover:neon-text transition-all duration-300">
                Esports Experience
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Cyberpunk visuals with neon effects and animations
              </p>
            </Card>
          </div>

          <div className="bounce-in" style={{ animationDelay: "0.7s" }}>
            <Link href="/battle">
              <Button
                size="lg"
                className="text-2xl px-12 py-6 neon-glow pulse-glow hover:scale-110 transition-all duration-500 bg-primary hover:bg-primary/90 text-primary-foreground font-bold battle-charge group relative overflow-hidden"
              >
                <span className="relative z-10">ENTER ARENA</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 energy-wave"></div>
              </Button>
            </Link>
          </div>

          <div className="mt-16 text-muted-foreground fade-in-up" style={{ animationDelay: "0.8s" }}>
            <p className="hover:text-primary transition-colors duration-300 cursor-default">
              Hackathon MVP • Futuristic Esports Edition
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

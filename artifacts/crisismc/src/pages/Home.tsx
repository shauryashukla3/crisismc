import { motion } from "framer-motion";
import { Shield, Zap, Globe, Trophy, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServerStatusWidget } from "@/components/ServerStatusWidget";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Anti-Cheat Protection",
    description: "Our custom anti-cheat ensures a fair and enjoyable environment for everyone. Play with peace of mind."
  },
  {
    icon: Zap,
    title: "Lag-Free Experience",
    description: "Hosted on premium dedicated hardware to guarantee 20 TPS and ultra-low ping across the globe."
  },
  {
    icon: Globe,
    title: "Custom World Generation",
    description: "Explore breathtaking landscapes, unique biomes, and hidden dungeons you won't find anywhere else."
  },
  {
    icon: Trophy,
    title: "Player Driven Economy",
    description: "Trade, build shops, and become the wealthiest player in a dynamic, balanced economic system."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
              alt="Minecraft dramatic landscape" 
              className="w-full h-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-sm font-medium text-gray-300">Season 5 is now LIVE!</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tighter text-white mb-6 leading-[0.9]">
                  DOMINATE THE <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300 text-glow">
                    CRISIS
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                  Join the most advanced survival multiplayer experience. Forge alliances, conquer custom dungeons, and rise to the top of the leaderboards.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <Button size="lg" asChild className="group">
                    <Link href="/store">
                      Browse Ranks 
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                    <a href="#features">Explore Features</a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-4xl"
              >
                <ServerStatusWidget />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-background relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black font-display text-white mb-4">
                WHY PLAY ON <span className="text-primary">CRISISMC</span>?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We've spent thousands of hours perfecting every detail to bring you a server that feels truly premium.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors text-gray-400">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-3 uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black font-display text-white mb-6 text-glow">
              READY TO BEGIN?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of players right now. No mods required, just vanilla Minecraft.
            </p>
            <div className="inline-flex flex-col items-center">
              <span className="text-sm text-primary font-bold uppercase tracking-widest mb-2">Connect via IP</span>
              <div className="bg-background border-2 border-primary/50 rounded-xl px-8 py-4 text-2xl md:text-4xl font-mono font-bold text-white shadow-[0_0_30px_rgba(22,163,74,0.2)]">
                play.crisismc.xyz
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

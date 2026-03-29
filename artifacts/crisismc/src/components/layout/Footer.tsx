import { Link } from "wouter";
import { Twitter, DiscIcon as Discord, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-display text-3xl font-black tracking-tighter text-white inline-block mb-4">
              CRISIS<span className="text-primary">MC</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              The ultimate Minecraft survival experience. Join thousands of players in our custom-built worlds featuring unique mechanics, economy, and community events.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all">
                <Discord className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg text-white mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/store" className="text-muted-foreground hover:text-primary transition-colors">Store & Ranks</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Rules</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Discord</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg text-white mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Ban Appeal</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CrisisMC. Not an official Minecraft product.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Server IP:</span>
            <span className="font-mono text-white bg-white/10 px-2 py-1 rounded">play.crisismc.xyz</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

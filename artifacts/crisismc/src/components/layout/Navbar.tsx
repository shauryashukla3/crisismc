import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyIp = () => {
    navigator.clipboard.writeText("play.crisismc.xyz");
    toast({
      title: "IP Copied!",
      description: "Paste it in Minecraft to join us!",
      duration: 3000,
    });
  };

  const navLinks = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Store", href: "/store", icon: ShoppingCart },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-white/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-display text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 hover:from-primary hover:to-emerald-300 transition-all duration-300 cursor-pointer"
            >
              CRISIS<span className="text-primary">MC</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center space-x-2 font-display text-lg uppercase tracking-wider transition-colors duration-200",
                    isActive
                      ? "text-primary text-glow"
                      : "text-muted-foreground hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5 mb-0.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleCopyIp}
              variant="outline"
              className="font-mono text-sm tracking-normal group"
            >
              <span className="text-muted-foreground mr-2 group-hover:text-primary transition-colors">IP:</span>
              play.crisismc.xyz
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-white/10 animate-in slide-in-from-top-2">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-4 rounded-md text-base font-display uppercase tracking-wider",
                  location === link.href
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center space-x-3">
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Button onClick={handleCopyIp} className="w-full">
                Copy Server IP
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

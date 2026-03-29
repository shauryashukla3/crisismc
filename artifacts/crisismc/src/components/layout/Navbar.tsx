import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Home as HomeIcon, LogIn, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

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
  if (!user) {
    navLinks.push({ name: "Login", href: "/login", icon: LogIn });
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-foreground/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-display text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground hover:from-primary hover:to-emerald-300 transition-all duration-300 cursor-pointer"
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
                      : "text-muted-foreground hover:text-foreground"
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
            <button
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground focus:outline-none p-2 transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-foreground">{user.username}</span>
                <Button onClick={logout} variant="outline" size="sm">Logout</Button>
              </div>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            )}

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
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground focus:outline-none p-2"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground focus:outline-none p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-in slide-in-from-top-2">
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
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center space-x-3">
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
            
            {user && (
              <div className="px-3 py-4 rounded-md text-base font-display flex items-center justify-between border-t border-border mt-2">
                <span className="text-foreground">{user.username}</span>
                <Button onClick={() => { logout(); setMobileMenuOpen(false); }} variant="outline" size="sm">Logout</Button>
              </div>
            )}
            
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

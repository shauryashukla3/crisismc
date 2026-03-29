import { Link } from "wouter";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0"></div>
      
      <div className="text-center relative z-10 space-y-6 max-w-md px-4">
        <h1 className="text-9xl font-black font-display text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
          404
        </h1>
        <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-white">
          Lost in the void
        </h2>
        <p className="text-muted-foreground text-lg">
          Looks like you've fallen out of the world. This chunk doesn't exist on our servers.
        </p>
        
        <div className="pt-8">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Respawn at Spawn
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useGetMinecraftStatus } from "@workspace/api-client-react";
import { Server, Users, Activity, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ServerStatusWidget() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  // Use the generated hook with polling
  const { data, isLoading, isError } = useGetMinecraftStatus({
    query: {
      refetchInterval: 30000, // Poll every 30s
    }
  });

  const handleCopy = () => {
    const ip = data?.ip || "play.crisismc.xyz";
    navigator.clipboard.writeText(ip);
    setCopied(true);
    toast({
      title: "IP Copied!",
      description: "See you in the server!",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden group box-glow-hover transition-all duration-500">
      {/* Decorative background glow */}
      <div className={cn(
        "absolute -top-20 -right-20 w-40 h-40 blur-[80px] rounded-full transition-colors duration-1000",
        data?.online ? "bg-primary/30" : "bg-destructive/30"
      )} />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Status Side */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center border",
              isLoading ? "bg-white/5 border-white/10" :
              data?.online ? "bg-primary/10 border-primary/30 text-primary shadow-[0_0_15px_rgba(22,163,74,0.3)]" : 
              "bg-destructive/10 border-destructive/30 text-destructive"
            )}>
              <Server className="w-7 h-7" />
            </div>
            {/* Pulse dot */}
            {data?.online && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-background"></span>
              </span>
            )}
          </div>
          
          <div>
            <h3 className="font-display font-bold text-xl text-white">CrisisMC Network</h3>
            <div className="flex items-center mt-1 space-x-2">
              {isLoading ? (
                <Skeleton className="h-4 w-24" />
              ) : isError ? (
                <span className="text-destructive text-sm font-medium flex items-center">
                  <Activity className="w-4 h-4 mr-1" /> Status Unavailable
                </span>
              ) : (
                <span className={cn(
                  "text-sm font-medium flex items-center",
                  data.online ? "text-primary" : "text-destructive"
                )}>
                  {data.online ? "Online & Stable" : "Currently Offline"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="hidden sm:block w-px h-12 bg-white/10" />

        {/* Players Side */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="text-sm text-muted-foreground flex items-center mb-1">
            <Users className="w-4 h-4 mr-1.5" />
            Players Online
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <div className="font-display text-3xl font-bold text-white tracking-tight">
              {data?.online ? (
                <>
                  <span className="text-primary text-glow">{data.players.online}</span>
                  <span className="text-muted-foreground text-xl"> / {data.players.max}</span>
                </>
              ) : (
                <span className="text-muted-foreground text-xl">Offline</span>
              )}
            </div>
          )}
        </div>

        <div className="hidden lg:block w-px h-12 bg-white/10" />

        {/* Action Side */}
        <button
          onClick={handleCopy}
          className="w-full sm:w-auto flex items-center justify-between sm:justify-center px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group/btn"
        >
          <div className="flex flex-col items-start mr-4">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-0.5">Server IP</span>
            <span className="font-mono text-sm font-semibold text-white group-hover/btn:text-primary transition-colors">
              {data?.ip || "play.crisismc.xyz"}
            </span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center group-hover/btn:scale-110 transition-transform">
            {copied ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </div>
        </button>

      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { StoreProduct } from "@/types/store";

export interface MinecraftStatus {
  online: boolean;
  players: { online: number; max: number };
  motd: string;
  version: string;
  ip: string;
}

export function useGetMinecraftStatus(
  options?: {
    query?: Partial<UseQueryOptions<MinecraftStatus>> & { refetchInterval?: number };
  }
) {
  return useQuery<MinecraftStatus>({
    queryKey: ["minecraft-status"],
    queryFn: async () => {
      const res = await fetch("/api/minecraft/status");
      if (!res.ok) throw new Error("Failed to fetch server status");
      return res.json() as Promise<MinecraftStatus>;
    },
    ...options?.query,
  });
}

export function useGetStoreProducts(
  options?: { query?: Partial<UseQueryOptions<StoreProduct[]>> }
) {
  return useQuery<StoreProduct[]>({
    queryKey: ["store-products"],
    queryFn: async () => {
      const res = await fetch("/api/store/products");
      if (!res.ok) throw new Error("Failed to fetch store products");
      return res.json() as Promise<StoreProduct[]>;
    },
    ...options?.query,
  });
}

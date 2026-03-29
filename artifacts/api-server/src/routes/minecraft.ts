import { Router, type IRouter } from "express";
import { GetMinecraftStatusResponse } from "@workspace/api-zod";

const router: IRouter = Router();

async function fetchMinecraftStatus() {
  const serverHost = "play.crisismc.xyz";
  try {
    const response = await fetch(
      `https://api.mcsrvstat.us/3/${serverHost}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!response.ok) throw new Error("API error");
    const data = await response.json() as {
      online?: boolean;
      players?: { online?: number; max?: number };
      motd?: { clean?: string[] };
      version?: string;
      hostname?: string;
      ip?: string;
    };

    return {
      online: data.online ?? false,
      players: {
        online: data.players?.online ?? 0,
        max: data.players?.max ?? 100,
      },
      motd: data.motd?.clean?.[0] ?? "Welcome to CrisisMC!",
      version: data.version ?? "1.21",
      ip: serverHost,
    };
  } catch {
    return {
      online: false,
      players: { online: 0, max: 100 },
      motd: "Welcome to CrisisMC!",
      version: "1.21",
      ip: serverHost,
    };
  }
}

router.get("/minecraft/status", async (req, res) => {
  try {
    const status = await fetchMinecraftStatus();
    const data = GetMinecraftStatusResponse.parse(status);
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch Minecraft status");
    res.status(500).json({ error: "Failed to fetch server status" });
  }
});

export default router;

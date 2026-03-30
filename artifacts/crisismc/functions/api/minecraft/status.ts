interface MinecraftApiResponse {
  online?: boolean;
  players?: { online?: number; max?: number };
  motd?: { clean?: string[] };
  version?: string;
  hostname?: string;
  ip?: string;
}

export const onRequestGet = async (): Promise<Response> => {
  const serverHost = "play.crisismc.xyz";

  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${serverHost}`, {
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) throw new Error("API error");

    const data = (await response.json()) as MinecraftApiResponse;

    const result = {
      online: data.online ?? false,
      players: {
        online: data.players?.online ?? 0,
        max: data.players?.max ?? 100,
      },
      motd: data.motd?.clean?.[0] ?? "Welcome to CrisisMC!",
      version: data.version ?? "1.21",
      ip: serverHost,
    };

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({
        online: false,
        players: { online: 0, max: 100 },
        motd: "Welcome to CrisisMC!",
        version: "1.21",
        ip: serverHost,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
};

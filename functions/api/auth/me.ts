import { type Env, type SessionRecord, getCookie, json } from "./_helpers";

export const onRequestGet = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;
  if (!env.CRISISMC_KV) return json({ user: null });

  const token = getCookie(request, "crisismc_session");
  if (!token) return json({ user: null });

  const sessionRaw = await env.CRISISMC_KV.get(`session:${token}`);
  if (!sessionRaw) return json({ user: null });

  const session: SessionRecord = JSON.parse(sessionRaw);
  return json({ user: { id: session.userId, username: session.username } });
};

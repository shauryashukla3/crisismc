import { type Env, type UserRecord, verifyPassword, getCookie, sessionCookie, json } from "./_helpers";

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;

  if (!env.CRISISMC_KV) return json({ message: "Auth storage not configured" }, 503);

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return json({ message: "Invalid request body" }, 400);
  }

  const { username, password } = body;
  if (!username || !password) return json({ message: "Username and password are required" }, 400);

  const userRaw = await env.CRISISMC_KV.get(`user:${username.toLowerCase()}`);
  if (!userRaw) return json({ message: "Invalid username or password" }, 401);

  const user: UserRecord = JSON.parse(userRaw);
  const valid = await verifyPassword(password, user.passwordHash, user.salt);
  if (!valid) return json({ message: "Invalid username or password" }, 401);

  const oldToken = getCookie(request, "crisismc_session");
  if (oldToken) await env.CRISISMC_KV.delete(`session:${oldToken}`).catch(() => {});

  const token = crypto.randomUUID();
  await env.CRISISMC_KV.put(`session:${token}`, JSON.stringify({ userId: user.id, username: user.username }), { expirationTtl: 604800 });

  return new Response(JSON.stringify({ user: { id: user.id, username: user.username } }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Set-Cookie": sessionCookie(token, 604800) },
  });
};

import { type Env, type UserRecord, hashPassword, sessionCookie, json } from "./_helpers";

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;

  if (!env.CRISISMC_KV) return json({ message: "Auth storage not configured" }, 503);

  let body: { username?: string; email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return json({ message: "Invalid request body" }, 400);
  }

  const { username, email, password } = body;
  if (!username || !email || !password) return json({ message: "All fields are required" }, 400);
  if (username.length < 3 || username.length > 20) return json({ message: "Username must be 3–20 characters" }, 400);
  if (password.length < 6) return json({ message: "Password must be at least 6 characters" }, 400);

  const existing = await env.CRISISMC_KV.get(`user:${username.toLowerCase()}`);
  if (existing) return json({ message: "Username already taken" }, 409);

  const { hash, salt } = await hashPassword(password);
  const id = Date.now();
  const user: UserRecord = { id, username, email, passwordHash: hash, salt };
  await env.CRISISMC_KV.put(`user:${username.toLowerCase()}`, JSON.stringify(user));

  const token = crypto.randomUUID();
  await env.CRISISMC_KV.put(`session:${token}`, JSON.stringify({ userId: id, username }), { expirationTtl: 604800 });

  return new Response(JSON.stringify({ user: { id, username } }), {
    status: 201,
    headers: { "Content-Type": "application/json", "Set-Cookie": sessionCookie(token, 604800) },
  });
};

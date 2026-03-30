import { type Env, getCookie, sessionCookie, json } from "./_helpers";

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;
  const token = getCookie(request, "crisismc_session");
  if (token && env.CRISISMC_KV) await env.CRISISMC_KV.delete(`session:${token}`).catch(() => {});
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Set-Cookie": sessionCookie("", 0) },
  });
};

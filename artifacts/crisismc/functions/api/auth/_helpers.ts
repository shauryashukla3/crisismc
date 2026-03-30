export interface UserRecord {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
}

export interface SessionRecord {
  userId: number;
  username: string;
}

export interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface Env {
  CRISISMC_KV: KVNamespace;
}

export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const salt = btoa(String.fromCharCode(...saltBytes));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: saltBytes, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );

  const hash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
  return { hash, salt };
}

export async function verifyPassword(
  password: string,
  storedHash: string,
  saltBase64: string
): Promise<boolean> {
  const saltBytes = Uint8Array.from(atob(saltBase64), (c) => c.charCodeAt(0));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: saltBytes, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );

  const newHash = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
  return newHash === storedHash;
}

export function getCookie(request: Request, name: string): string | null {
  const cookies = request.headers.get("cookie") || "";
  for (const part of cookies.split("; ")) {
    const eqIdx = part.indexOf("=");
    if (eqIdx === -1) continue;
    const key = part.slice(0, eqIdx).trim();
    const value = part.slice(eqIdx + 1);
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

export function sessionCookie(token: string, maxAge: number): string {
  return `crisismc_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=${maxAge}`;
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

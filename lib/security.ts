import crypto from "node:crypto";
import dns from "node:dns/promises";
import net from "node:net";

export function makeToken(bytes = 24) {
  return crypto.randomBytes(bytes).toString("hex");
}

// SSRF guard: permite apenas http/https e bloqueia IPs privados/localhost
export async function validateAndNormalizeUrl(input: string): Promise<string> {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    throw new Error("URL inválida");
  }
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("URL deve ser http/https");

  if (url.username || url.password) throw new Error("URL com credenciais não é permitido");

  const host = url.hostname;

  if (host === "localhost" || host.endsWith(".localhost")) throw new Error("Host não permitido");

  if (net.isIP(host)) {
    if (isPrivateIp(host)) throw new Error("IP privado não permitido");
  } else {
    const addrs = await dns.lookup(host, { all: true });
    for (const a of addrs) {
      if (isPrivateIp(a.address)) throw new Error("Host resolve para IP privado (bloqueado)");
    }
  }

  url.hash = "";
  return url.toString();
}

function isPrivateIp(ip: string) {
  // IPv6
  if (ip.includes(":")) {
    const lower = ip.toLowerCase();
    return lower === "::1" || lower.startsWith("fe80:") || lower.startsWith("fc") || lower.startsWith("fd");
  }
  // IPv4
  const parts = ip.split(".").map((n) => parseInt(n, 10));
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return true;
  const [a, b] = parts;

  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 169 && b === 254) return true; // link-local
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;

  return false;
}

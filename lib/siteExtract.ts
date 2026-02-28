import { validateAndNormalizeUrl } from "@/lib/security";

export async function fetchAndExtractSite(urlInput: string) {
  const url = await validateAndNormalizeUrl(urlInput);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  const res = await fetch(url, {
    method: "GET",
    redirect: "follow",
    signal: controller.signal,
    headers: {
      "User-Agent": "AuditorDigitalPortugalBot/1.0 (+https://example.invalid)"
    }
  }).finally(() => clearTimeout(timeout));

  if (!res.ok) throw new Error(`Falha ao abrir URL (HTTP ${res.status})`);

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    throw new Error("A URL não retornou HTML. (Dica: use a página pública principal)");
  }

  // limita tamanho para evitar custos
  const html = (await res.text()).slice(0, 250_000);

  const title = matchTag(html, "title") || "";
  const metaDescription = matchMeta(html, "description") || "";
  const h1 = matchFirstHeading(html, "h1") || "";
  const h2s = matchAllHeadings(html, "h2").slice(0, 8);

  const textContent = stripHtml(html).slice(0, 40_000);

  return {
    url,
    title,
    metaDescription,
    h1,
    h2s,
    textContent
  };
}

function matchTag(html: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = html.match(re);
  return m ? decodeEntities(m[1]).trim().replace(/\s+/g, " ") : null;
}

function matchMeta(html: string, name: string) {
  const re = new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`, "i");
  const m = html.match(re);
  return m ? decodeEntities(m[1]).trim() : null;
}

function matchFirstHeading(html: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = html.match(re);
  return m ? decodeEntities(stripHtml(m[1])).trim().replace(/\s+/g, " ") : null;
}

function matchAllHeadings(html: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "ig");
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const t = decodeEntities(stripHtml(m[1])).trim().replace(/\s+/g, " ");
    if (t) out.push(t);
  }
  return out;
}

function stripHtml(input: string) {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export type AuditType = "site" | "instagram" | "copy" | "combo";

type OpenAIJson = Record<string, any>;

export async function runAuditWithOpenAI(opts: {
  auditType: AuditType;
  locale: string;
  input: any;
}): Promise<OpenAIJson> {
  const apiKey = process.env.OPENAI_API_KEY!;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  if (!apiKey) throw new Error("Falta OPENAI_API_KEY");

  const system = [
    "Você é um auditor digital (SEO + conversão + conteúdo) para pequenas empresas em Portugal.",
    "Se faltar informação, você deve dizer explicitamente o que não dá para inferir.",
    "Não invente factos verificáveis (datas, números oficiais, 'CEO atual', notícias).",
    "Se precisar mencionar dados externos, peça para validar em fontes oficiais.",
    "Resposta deve ser JSON válido (sem markdown) com as chaves:",
    "- summary (string)",
    "- scores: { seo: number, conversao: number, clareza: number } (0-100)",
    "- top_issues: array de { title, impact, how_to_fix } (impact: Alta|Média|Baixa)",
    "- quick_wins: array de strings",
    "- recommended_next_steps: array de strings",
    "- output_assets: objeto com sugestões (ex: titles, meta_descriptions, bio, hooks, ctas) quando fizer sentido."
  ].join("\n");

  const user = JSON.stringify({
    auditType: opts.auditType,
    locale: opts.locale,
    input: opts.input
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
    })
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${t}`);
  }

  const json = await res.json();
  const content = json.choices?.[0]?.message?.content || "{}";
  return JSON.parse(content);
}

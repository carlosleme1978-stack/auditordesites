export type AuditType = "site" | "instagram" | "copy" | "combo";

export const PRICES: Record<AuditType, { name: string; priceEur: number; stripePriceEnv: string; bullets: string[] }> = {
  site: {
    name: "Auditoria de Site (SEO + Conversão)",
    priceEur: 9,
    stripePriceEnv: "STRIPE_PRICE_SITE",
    bullets: ["SEO local", "Conversão/claridade", "Checklist priorizado", "Sugestões de títulos e meta"]
  },
  instagram: {
    name: "Auditoria Instagram (Perfil + Conteúdo)",
    priceEur: 7,
    stripePriceEnv: "STRIPE_PRICE_INSTAGRAM",
    bullets: ["Bio otimizada", "Diagnóstico de conteúdo", "Plano de 7 dias", "Sugestões de CTA"]
  },
  copy: {
    name: "Auditoria de Página de Vendas (Copy)",
    priceEur: 12,
    stripePriceEnv: "STRIPE_PRICE_COPY",
    bullets: ["Oferta + objeções", "Estrutura e CTA", "Texto reescrito (trechos)", "Checklist de conversão"]
  },
  combo: {
    name: "Combo 3 em 1 (Site + Instagram + Copy)",
    priceEur: 19,
    stripePriceEnv: "STRIPE_PRICE_COMBO",
    bullets: ["Tudo dos 3 relatórios", "Prioridades unificadas", "Sugestões práticas", "Entrega em 1 link"]
  }
};

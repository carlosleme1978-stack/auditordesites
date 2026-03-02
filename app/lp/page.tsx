"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Badge, Button } from "../../components/ui";

function pickTrackingParams(params: URLSearchParams) {
  // Mantém somente parâmetros úteis de tracking
  const allow = new Set([
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
  ]);
  const out = new URLSearchParams();
  for (const [k, v] of params.entries()) {
    if (!v) continue;
    if (allow.has(k)) out.set(k, v);
  }
  return out;
}

export default function LandingAds() {
  // IMPORTANTE (Next.js): useSearchParams precisa estar dentro de <Suspense>
  // para evitar erro de prerender/export em rotas do App Router.
  return (
    <Suspense fallback={<div style={{ padding: 24 }} />}>
      <LandingAdsInner />
    </Suspense>
  );
}

function LandingAdsInner() {
  const sp = useSearchParams();
  const tracking = useMemo(() => pickTrackingParams(sp), [sp]);

  const withTracking = (href: string) => {
    const q = tracking.toString();
    if (!q) return href;
    return href.includes("?") ? `${href}&${q}` : `${href}?${q}`;
  };

  return (
    <div>
{/* LP_HIDE_NAV */}
<style>{`
  /* Esconde o menu (Auditar/Admin) somente na landing /lp */
  .header .nav { display: none !important; }
`}</style>


      <section className="hero">
        <Badge>Sem login • Relatório em 60s • Link privado</Badge>
        <h1 className="h1" style={{ marginTop: 10 }}>
          O seu Instagram e o seu site podem estar a travar as vendas — sem você ver.
        </h1>
        <p className="p">
          Em ~60 segundos, descubra <strong>onde está o bloqueio</strong> e o que corrigir primeiro.
          Você recebe um relatório prático com prioridades (Alta/Média/Baixa), quick wins e textos prontos para copiar.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <a href={withTracking("/auditar?type=instagram")}>
            <Button>Analisar meu Instagram</Button>
          </a>
          <a href={withTracking("/auditar?type=site")}>
            <Button variant="ghost">Analisar meu Site</Button>
          </a>
          <a href="#precos"><Button variant="ghost">Ver preços</Button></a>
        </div>

        <div className="kpis" style={{ marginTop: 12 }}>
          <span className="kpi">✅ Site: SEO + Conversão</span>
          <span className="kpi">✅ Instagram: Bio + Conteúdo</span>
          <span className="kpi">✅ Landing: Copy + CTA</span>
        </div>

        <div className="small" style={{ marginTop: 10, opacity: 0.85 }}>
          *Mantemos os parâmetros (UTM) do anúncio automaticamente para você medir de onde veio cada pedido.
        </div>
      </section>

      <div className="grid" style={{ marginTop: 12 }}>
        <Card>
          <div className="badge">Seu site pode estar a afastar clientes</div>
          <div className="hr" />
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Não fica claro <strong>o que você faz</strong> em 5 segundos</li>
            <li>Sem CTA (o visitante não sabe o que fazer)</li>
            <li>SEO fraco → você não aparece quando alguém procura</li>
            <li>Texto longo, confuso, sem estrutura</li>
          </ul>
          <div style={{ marginTop: 12 }}>
            <a href={withTracking("/auditar?type=site")}>
            <Button>Analisar site</Button>
            </a>
          </div>
        </Card>

        <Card>
          <div className="badge">Seu Instagram pode estar “bonito” e não vender</div>
          <div className="hr" />
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Bio sem posicionamento (ninguém entende por que seguir)</li>
            <li>Conteúdo sem direção e sem gancho</li>
            <li>Sem CTA (DM/WhatsApp/Link) → não gera pedidos</li>
            <li>Posts sem consistência de mensagem</li>
          </ul>
          <div style={{ marginTop: 12 }}>
            <a href={withTracking("/auditar?type=instagram")}>
            <Button>Analisar Instagram</Button>
            </a>
          </div>
        </Card>

        <Card>
          <div className="badge">Sua landing pode estar a perder dinheiro</div>
          <div className="hr" />
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>Oferta confusa e sem prova</li>
            <li>Objeções não respondidas</li>
            <li>CTA fraco (o clique não acontece)</li>
            <li>Texto não conduz a decisão</li>
          </ul>
          <div style={{ marginTop: 12 }}>
            <a href={withTracking("/auditar?type=landing")}>
            <Button>Analisar Landing</Button>
            </a>
          </div>
        </Card>

        <Card>
          <div className="badge">O que você recebe (na prática)</div>
          <div className="hr" />
          <div style={{ display: "grid", gap: 10 }}>
            <div className="issue">
              <div style={{ fontWeight: 900 }}>Pontuação + diagnóstico claro</div>
              <div className="small">SEO • Conversão • Clareza (0–100) + resumo objetivo.</div>
            </div>
            <div className="issue">
              <div style={{ fontWeight: 900 }}>Top erros com prioridade</div>
              <div className="small">Alta / Média / Baixa + como corrigir.</div>
            </div>
            <div className="issue">
              <div style={{ fontWeight: 900 }}>Sugestões prontas para copiar</div>
              <div className="small">CTAs, hooks, títulos, meta descriptions, bio (quando aplicável).</div>
            </div>
            <div className="issue">
              <div style={{ fontWeight: 900 }}>Link privado + botão WhatsApp</div>
              <div className="small">Você recebe o relatório num link secreto e pode pedir ajuda para implementar.</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <a href={withTracking("/auditar")}>
              <Button>Analizar agora</Button>
            </a>
          </div>
        </Card>
      </div>

      <section style={{ marginTop: 14 }}>
        <Card>
          <div className="badge">Como funciona (passo a passo)</div>
          <div className="hr" />
          <div style={{ display: "grid", gap: 10 }}>
            <div className="issue">
              <div style={{ fontWeight: 900 }}>1) Você escolhe o tipo</div>
              <div className="small">Instagram / Site / Landing (ou combo).</div>
            </div>
            <div className="issue">
              <div style={{ fontWeight: 900 }}>2) Você cola o que a IA precisa</div>
              <div className="small">
                Site: URL • Instagram: sua bio + 3 legendas recentes • Landing: cola o texto (ou URL).
              </div>
            </div>
            <div className="issue">
              <div style={{ fontWeight: 900 }}>3) Sai um relatório direto ao ponto</div>
              <div className="small">
                Pontuações (0–100), erros com prioridade, quick wins e textos prontos para copiar/colar.
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={withTracking("/auditar?type=instagram")}>
              <Button>Começar pelo Instagram</Button>
            </a>
            <a href={withTracking("/auditar?type=site")}>
              <Button variant="ghost">Começar pelo Site</Button>
            </a>
          </div>
        </Card>
      </section>

      <section style={{ marginTop: 14 }} id="precos">
        <Card>
          <div className="badge">Preços (pagamento único)</div>
          <h2 style={{ margin: "10px 0 0" }}>Escolha o tipo de auditoria</h2>
          <p className="p" style={{ marginTop: 8 }}>
            Sem conta, sem burocracia. Pagou, gerou. Normalmente em ~1 minuto.
          </p>
          <div className="hr" />
          <div className="grid">
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 900 }}>Analize completa de Site</div>
                  <div className="small">SEO + Conversão + checklist</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>€9</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <a href={withTracking("/auditar?type=site")}>
                  <Button>Analizar site</Button>
                </a>
              </div>
            </Card>

            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 900 }}>Analize de Instagram</div>
                  <div className="small">Bio + conteúdo + plano</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>€7</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <a href={withTracking("/auditar?type=instagram")}>
                  <Button>Analizar Instagram</Button>
                </a>
              </div>
            </Card>

            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 900 }}>Analize de Copy (Landing)</div>
                  <div className="small">Oferta + CTA + objeções</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>€12</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <a href={withTracking("/auditar?type=landing")}>
                  <Button>Analizar Landing</Button>
                </a>
              </div>
            </Card>

            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 900 }}>Combo 3 em 1</div>
                  <div className="small">Site + Instagram + Landing</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>€19</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <a href={withTracking("/auditar?type=combo")}>
                  <Button>Quero o Todos</Button>
                </a>
              </div>
            </Card>
          </div>
        </Card>
      </section>

      <section style={{ marginTop: 14 }}>
        <Card>
          <div className="badge">FAQ</div>
          <div className="hr" />
          <div style={{ display: "grid", gap: 12 }}>
            <div className="issue">
              <div style={{ fontWeight: 900 }}>Preciso dar acesso ao meu site/Instagram?</div>
              <div className="small">Não. No MVP você cola a URL/texto. Para Instagram, você cola a bio e 3 legendas recentes.</div>
            </div>
            <div className="issue">
              <div style={{ fontWeight: 900 }}>O relatório sai na hora?</div>
              <div className="small">Sim, normalmente em ~1 minuto. Em horários de pico pode demorar um pouco mais.</div>
            </div>
            <div className="issue">
              <div style={{ fontWeight: 900 }}>Fica público?</div>
              <div className="small">Não. O relatório fica num link privado (token). Só quem tem o link acessa.</div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={withTracking("/auditar")}>
              <Button>ANALIZAR AGORA</Button>
            </a>
            <a href="/"><Button variant="ghost">Voltar</Button></a>
          </div>
        </Card>
      </section>
    </div>
  );
}

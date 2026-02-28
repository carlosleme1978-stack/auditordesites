import { Card, Badge, Button } from "../../components/ui";

export default function LandingAds() {
  return (
    <div>
      <section className="hero">
        <Badge>Sem login • Pagamento antes • Link privado</Badge>
        <h1 className="h1" style={{ marginTop: 10 }}>
          Você pode estar a perder clientes todos os dias — e nem percebe.
        </h1>
        <p className="p">
          Em ~60 segundos, descubra o que está a travar o seu <strong>site</strong>, o seu <strong>Instagram</strong> ou a sua <strong>landing de vendas</strong>.
          Relatório prático com prioridades (Alta/Média/Baixa), quick wins e sugestões prontas para copiar.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <a href="/auditar"><Button>Quero meu relatório agora</Button></a>
          <a href="#precos"><Button variant="ghost">Ver preços</Button></a>
        </div>

        <div className="kpis" style={{ marginTop: 12 }}>
          <span className="kpi">✅ Site: SEO + Conversão</span>
          <span className="kpi">✅ Instagram: Bio + Conteúdo</span>
          <span className="kpi">✅ Landing: Copy + CTA</span>
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
            <a href="/auditar"><Button>Auditar site</Button></a>
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
            <a href="/auditar"><Button>Auditar Instagram</Button></a>
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
            <a href="/auditar"><Button>Auditar landing</Button></a>
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
            <a href="/auditar"><Button>Começar agora</Button></a>
          </div>
        </Card>
      </div>

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
                  <div style={{ fontWeight: 900 }}>Auditoria de Site</div>
                  <div className="small">SEO + Conversão + checklist</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>€9</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <a href="/auditar"><Button>Auditar site</Button></a>
              </div>
            </Card>

            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 900 }}>Auditoria Instagram</div>
                  <div className="small">Bio + conteúdo + plano</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>€7</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <a href="/auditar"><Button>Auditar Instagram</Button></a>
              </div>
            </Card>

            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 900 }}>Auditoria Copy (Landing)</div>
                  <div className="small">Oferta + CTA + objeções</div>
                </div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>€12</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <a href="/auditar"><Button>Auditar landing</Button></a>
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
                <a href="/auditar"><Button>Quero o combo</Button></a>
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
            <a href="/auditar"><Button>Começar auditoria</Button></a>
            <a href="/"><Button variant="ghost">Voltar</Button></a>
          </div>
        </Card>
      </section>
    </div>
  );
}

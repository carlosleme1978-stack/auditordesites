import { supabaseServer } from "../../../lib/supabaseServer";
import { Card, Badge } from "../../../components/ui";
import { CopyButton } from "../../../components/copy";

export const dynamic = "force-dynamic";

export default async function ReportPage({ params }: { params: { token: string } }) {
  const sb = supabaseServer();
  const { data, error } = await sb
    .from("audits")
    .select("created_at,status,audit_type,report,input")
    .eq("token", params.token)
    .maybeSingle();

  if (error || !data) {
    return (
      <Card>
        <h1 className="h1">Relatório não encontrado</h1>
        <p className="p">Verifique o link.</p>
      </Card>
    );
  }

  const report = (data as any).report || null;
  const status = (data as any).status;

  if (status !== "done" || !report) {
    return (
      <Card>
        <Badge>Status: {status}</Badge>
        <h1 className="h1" style={{ marginTop: 10 }}>Relatório ainda não está pronto</h1>
        <p className="p">Tente novamente em instantes.</p>
      </Card>
    );
  }

  const scores = report.scores || {};
  const issues = report.top_issues || [];
  const quick = report.quick_wins || [];
  const steps = report.recommended_next_steps || [];
  const assets = report.output_assets || {};
const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "351963792822";
const waText = "Olá! Fiz a auditoria no Auditor Digital PT e quero ajuda para implementar as melhorias. (Posso enviar o link do relatório aqui.)";
const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;


  return (
    <div>
      <div className="hero">
        <Badge>Relatório privado</Badge>
        <h1 className="h1" style={{ marginTop: 10 }}>Auditoria ({data.audit_type})</h1>
        <p className="p">{report.summary}</p>
        <div className="kpis">
          <span className="kpi">Data: {new Date(data.created_at).toLocaleString("pt-PT")}</span>
        </div>
      </div>

      <div className="scoreRow">
        <div className="score"><div className="small">SEO</div><strong>{scores.seo ?? "-"}</strong></div>
        <div className="score"><div className="small">Conversão</div><strong>{scores.conversao ?? "-"}</strong></div>
        <div className="score"><div className="small">Clareza</div><strong>{scores.clareza ?? "-"}</strong></div>
      </div>

      <Card>
        <h2 style={{ margin: 0 }}>Principais problemas</h2>
        <div className="hr" />
        <div style={{ display:"grid", gap: 10 }}>
          {issues.map((it: any, idx: number) => (
            <div key={idx} className="issue">
              <div style={{ display:"flex", justifyContent:"space-between", gap: 10, flexWrap:"wrap" }}>
                <div style={{ fontWeight: 900 }}>{it.title}</div>
                <span className="tag">Impacto: {it.impact}</span>
              </div>
              <div className="small" style={{ marginTop: 8 }}>{it.how_to_fix}</div>
            </div>
          ))}
          {issues.length === 0 ? <div className="small">Sem issues listadas.</div> : null}
        </div>
      </Card>

      <div style={{ height: 12 }} />

      <div className="grid">
        <Card>
          <h2 style={{ margin: 0 }}>Quick wins</h2>
          <div className="hr" />
          <ul>
            {quick.map((q: string, i: number) => <li key={i}>{q}</li>)}
          </ul>
        </Card>

        <Card>
          <h2 style={{ margin: 0 }}>Próximos passos</h2>
          <div className="hr" />
          <ol>
            {steps.map((q: string, i: number) => <li key={i}>{q}</li>)}
          </ol>
        </Card>
      </div>

      <div style={{ height: 12 }} />

      <Card>
        <h2 style={{ margin: 0 }}>Sugestões prontas para copiar</h2>
        <div className="hr" />

        {assets.bio ? (
          <div className="issue">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div style={{ fontWeight: 900 }}>Bio sugerida</div>
              <CopyButton text={String(assets.bio)} />
            </div>
            <div className="small" style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{String(assets.bio)}</div>
          </div>
        ) : null}

        {Array.isArray(assets.ctas) && assets.ctas.length ? (
          <div className="issue" style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div style={{ fontWeight: 900 }}>CTAs recomendadas</div>
              <CopyButton text={(assets.ctas as any[]).map((x) => `- ${x}`).join("\n")} />
            </div>
            <ul style={{ marginTop: 8 }}>
              {(assets.ctas as any[]).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        ) : null}

        {Array.isArray(assets.hooks) && assets.hooks.length ? (
          <div className="issue" style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div style={{ fontWeight: 900 }}>Hooks (para posts/anúncios)</div>
              <CopyButton text={(assets.hooks as any[]).map((x) => `- ${x}`).join("\n")} />
            </div>
            <ul style={{ marginTop: 8 }}>
              {(assets.hooks as any[]).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        ) : null}

        {Array.isArray(assets.titles) && assets.titles.length ? (
          <div className="issue" style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div style={{ fontWeight: 900 }}>Títulos sugeridos</div>
              <CopyButton text={(assets.titles as any[]).map((x) => `- ${x}`).join("\n")} />
            </div>
            <ul style={{ marginTop: 8 }}>
              {(assets.titles as any[]).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        ) : null}

        {Array.isArray(assets.meta_descriptions) && assets.meta_descriptions.length ? (
          <div className="issue" style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div style={{ fontWeight: 900 }}>Meta descriptions sugeridas</div>
              <CopyButton text={(assets.meta_descriptions as any[]).map((x) => `- ${x}`).join("\n")} />
            </div>
            <ul style={{ marginTop: 8 }}>
              {(assets.meta_descriptions as any[]).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        ) : null}

        {!assets || Object.keys(assets).length === 0 ? (
          <div className="small">Sem assets gerados para este tipo de auditoria.</div>
        ) : null}
      </Card>

      <div style={{ height: 12 }} />

      <Card>
  <h2 style={{ margin: 0 }}>Impacto estimado (rápido)</h2>
  <div className="hr" />
  <div className="small">
    Uma forma simples de pensar: <strong>pequenas melhorias de conversão</strong> podem aumentar pedidos sem aumentar o tráfego.
    Exemplo: 500 visitas/mês a 2% ≈ 10 pedidos. Se subir para 3% ≈ 15 pedidos. Isso é <strong>+50%</strong> com o mesmo tráfego.
    <br /><br />
    (Referência. Para precisão, valide com Analytics e leads reais.)
  </div>
</Card>

<div style={{ height: 12 }} />

<Card>
  <h2 style={{ margin: 0 }}>Quer ajuda para implementar?</h2>
  <div className="hr" />
  <div className="small">
    Se quiser, eu posso transformar estes pontos em ações no seu site (SEO, CTAs, copy, estrutura e ajustes rápidos).
    Envie uma mensagem no WhatsApp e eu respondo com os próximos passos.
  </div>
  <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
    <a className="btn btnPrimary" href={waUrl}>Falar no WhatsApp</a>
    <a className="btn btnGhost" href="/auditar">Fazer nova auditoria</a>
  </div>
</Card>

<div style={{ height: 12 }} />

<Card>
        <div className="small">
          <strong>Nota:</strong> Este relatório é gerado por IA e serve como guia prático. Para decisões críticas, valide dados e testes.
        </div>
      </Card>
    </div>
  );
}

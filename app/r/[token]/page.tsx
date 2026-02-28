import { supabaseServer } from "../../../lib/supabaseServer";
import { Card, Badge } from "../../../components/ui";

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
        <h2 style={{ margin: 0 }}>Sugestões / Assets</h2>
        <div className="hr" />
        <pre className="mono" style={{ whiteSpace:"pre-wrap", margin: 0 }}>{JSON.stringify(assets, null, 2)}</pre>
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

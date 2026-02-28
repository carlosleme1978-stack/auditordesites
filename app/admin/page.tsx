import { supabaseServer } from "../../lib/supabaseServer";
import { Card, Badge } from "../../components/ui";

export const dynamic = "force-dynamic";

function authorized(searchParams: Record<string, string | string[] | undefined>) {
  const key = (searchParams.key as string | undefined) || "";
  return !!process.env.ADMIN_KEY && key === process.env.ADMIN_KEY;
}

export default async function AdminPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  if (!authorized(searchParams)) {
    return (
      <Card>
        <h1 className="h1">Admin</h1>
        <p className="p">Acesso negado. Use <span className="mono">/admin?key=ADMIN_KEY</span>.</p>
      </Card>
    );
  }

  const sb = supabaseServer();
  const { data } = await sb
    .from("audits")
    .select("created_at,status,audit_type,email,stripe_session_id,token")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <div className="hero">
        <Badge>Admin</Badge>
        <h1 className="h1" style={{ marginTop: 10 }}>Últimas auditorias</h1>
        <p className="p">Somente leitura. Use o token para abrir o relatório.</p>
      </div>

      <Card>
        <div style={{ display:"grid", gap: 10 }}>
          {(data || []).map((a: any, i: number) => (
            <div key={i} className="issue">
              <div style={{ display:"flex", justifyContent:"space-between", gap: 10, flexWrap:"wrap" }}>
                <div style={{ fontWeight: 900 }}>
                  {new Date(a.created_at).toLocaleString("pt-PT")} • {a.audit_type}
                </div>
                <span className="tag">{a.status}</span>
              </div>
              <div className="small" style={{ marginTop: 6 }}>
                Email: {a.email || "-"} • Session: {a.stripe_session_id || "-"}
              </div>
              <div className="small" style={{ marginTop: 6 }}>
                Relatório: <a className="mono" href={`/r/${a.token}`}>/r/{a.token}</a>
              </div>
            </div>
          ))}
          {(data || []).length === 0 ? <div className="small">Sem dados.</div> : null}
        </div>
      </Card>
    </div>
  );
}

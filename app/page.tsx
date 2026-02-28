import { PRICES } from "../config/pricing";
import { Card, Badge, Button } from "../components/ui";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <Badge>Relatório em ~1 minuto • Mobile-first • Sem login</Badge>
        <h1 className="h1" style={{ marginTop: 10 }}>
          Descubra por que o seu digital não está a converter — e o que fazer agora.
        </h1>
        <p className="p">
          Pague, cole o link/texto, e receba um relatório prático com prioridades (Alta/Média/Baixa), quick wins e próximos passos.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <a href="/auditar"><Button>Começar auditoria</Button></a>
          <a href="/auditar#precos"><Button variant="ghost">Ver preços</Button></a>
        </div>
      </section>

      <div className="grid" style={{ marginTop: 12 }}>
        {Object.entries(PRICES).map(([k, v]) => (
          <Card key={k}>
            <div style={{ display:"flex", justifyContent:"space-between", gap: 10 }}>
              <div>
                <div className="badge">{v.name}</div>
                <div className="kpis">
                  {v.bullets.slice(0,3).map((b) => <span key={b} className="kpi">{b}</span>)}
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontWeight: 900, fontSize: 22 }}>€{v.priceEur}</div>
                <div className="small">pagamento único</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

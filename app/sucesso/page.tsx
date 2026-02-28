"use client";

import { useEffect, useState } from "react";
import { Card, Badge, Button } from "../../components/ui";

export default function SucessoPage() {
  const [state, setState] = useState<{ status: string; reportUrl?: string; error?: string }>({ status: "A validar pagamento..." });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get("session_id");
    if (!session_id) {
      setState({ status: "Erro", error: "Falta session_id" });
      return;
    }

    (async () => {
      try {
        setState({ status: "Pagamento confirmado. A gerar relatório..." });
        const res = await fetch("/api/audit/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id })
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Erro ao gerar relatório");
        setState({ status: "Pronto!", reportUrl: json.reportUrl });
      } catch (e: any) {
        setState({ status: "Falhou", error: e.message || "Erro" });
      }
    })();
  }, []);

  return (
    <div>
      <div className="hero">
        <Badge>Checkout concluído</Badge>
        <h1 className="h1" style={{ marginTop: 10 }}>A sua auditoria</h1>
        <p className="p">Estamos a validar e gerar o relatório. Não feche esta página.</p>
      </div>

      <Card>
        <div style={{ fontWeight: 900, fontSize: 18 }}>{state.status}</div>
        {state.error ? <p className="p" style={{ marginTop: 8, color: "rgba(255,107,107,.95)" }}>{state.error}</p> : null}
        {state.reportUrl ? (
          <div style={{ marginTop: 14, display:"flex", gap: 10, flexWrap:"wrap" }}>
            <a href={state.reportUrl}><Button>Abrir relatório</Button></a>
            <a href="/auditar"><Button variant="ghost">Fazer outra auditoria</Button></a>
          </div>
        ) : null}
        <div className="small" style={{ marginTop: 12 }}>
          Se a geração demorar, é normal em horários de pico. O seu relatório ficará disponível no link privado.
        </div>
      </Card>
    </div>
  );
}

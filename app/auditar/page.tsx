"use client";

import { useMemo, useState } from "react";
import { PRICES, type AuditType } from "../../config/pricing";
import { Button, Card, Input, Textarea, Badge } from "../../components/ui";

type FormState = {
  auditType: AuditType;
  url?: string;
  copyText?: string;
  igHandle?: string;
  igBio?: string;
  igCaptions?: string;
  email?: string;
  business?: string;
  city?: string;
};

export default function AuditarPage() {
  const [s, setS] = useState<FormState>({
    auditType: "site",
    url: "",
    copyText: "",
    igHandle: "",
    igBio: "",
    igCaptions: "",
    email: "",
    business: "",
    city: ""
  });
  const [loading, setLoading] = useState(false);
  const price = PRICES[s.auditType];

  const canSubmit = useMemo(() => {
    if (s.auditType === "site") return !!s.url?.trim();
    if (s.auditType === "copy") return !!(s.copyText?.trim() || s.url?.trim());
    if (s.auditType === "instagram") return !!(s.igHandle?.trim() && s.igBio?.trim() && s.igCaptions?.trim());
    if (s.auditType === "combo") return !!(s.url?.trim() && (s.copyText?.trim() || s.url?.trim()) && s.igHandle?.trim() && s.igBio?.trim() && s.igCaptions?.trim());
    return false;
  }, [s]);

  async function startCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Erro no checkout");
      window.location.href = json.url;
    } catch (e: any) {
      alert(e.message || "Erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="hero">
        <Badge>Pagamento antes • Link privado • Sem login</Badge>
        <h1 className="h1" style={{ marginTop: 10 }}>Auditar agora</h1>
        <p className="p">Escolha um tipo, preencha o mínimo necessário e pague para gerar o relatório.</p>
      </div>

      <Card>
        <label className="label">Tipo de auditoria</label>
        <select
          value={s.auditType}
          onChange={(e) => setS((p) => ({ ...p, auditType: e.target.value as AuditType }))}
        >
          <option value="site">Site — €{PRICES.site.priceEur}</option>
          <option value="instagram">Instagram — €{PRICES.instagram.priceEur}</option>
          <option value="copy">Página de vendas (Copy) — €{PRICES.copy.priceEur}</option>
          <option value="combo">Combo 3 em 1 — €{PRICES.combo.priceEur}</option>
        </select>

        <div className="row">
          <div>
            <label className="label">Negócio (opcional)</label>
            <Input value={s.business} onChange={(e) => setS((p) => ({ ...p, business: e.target.value }))} placeholder="Ex: Estética, Transportes, Construção..." />
          </div>
          <div>
            <label className="label">Cidade (opcional)</label>
            <Input value={s.city} onChange={(e) => setS((p) => ({ ...p, city: e.target.value }))} placeholder="Ex: Lisboa, Sintra, Odivelas..." />
          </div>
        </div>

        {(s.auditType === "site" || s.auditType === "copy" || s.auditType === "combo") && (
          <>
            <label className="label">URL do site/página</label>
            <Input value={s.url} onChange={(e) => setS((p) => ({ ...p, url: e.target.value }))} placeholder="https://..." />
            <div className="small">Para Site: cole a página principal. Para Copy: pode colar URL OU colar o texto abaixo.</div>
          </>
        )}

        {(s.auditType === "copy" || s.auditType === "combo") && (
          <>
            <label className="label">Texto da página (opcional se você já colocou a URL)</label>
            <Textarea value={s.copyText} onChange={(e) => setS((p) => ({ ...p, copyText: e.target.value }))} placeholder="Cole aqui o texto da página de vendas..." />
          </>
        )}

        {(s.auditType === "instagram" || s.auditType === "combo") && (
          <>
            <label className="label">Instagram: @</label>
            <Input value={s.igHandle} onChange={(e) => setS((p) => ({ ...p, igHandle: e.target.value }))} placeholder="@seuperfil" />
            <label className="label">Bio (cole exatamente)</label>
            <Textarea value={s.igBio} onChange={(e) => setS((p) => ({ ...p, igBio: e.target.value }))} placeholder="Cole a bio atual..." />
            <label className="label">3 legendas recentes (cole uma abaixo da outra)</label>
            <Textarea value={s.igCaptions} onChange={(e) => setS((p) => ({ ...p, igCaptions: e.target.value }))} placeholder="Legenda 1...

Legenda 2...

Legenda 3..." />
            <div className="small">MVP sem login: você cola as infos e o relatório sai mais preciso.</div>
          </>
        )}

        <div className="hr" />

        <label className="label">Email (opcional, para receber o link do relatório)</label>
        <Input value={s.email} onChange={(e) => setS((p) => ({ ...p, email: e.target.value }))} placeholder="seu@email.com" />

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap: 10, marginTop: 14, flexWrap:"wrap" }} id="precos">
          <div>
            <div style={{ fontWeight: 900, fontSize: 20 }}>{price.name}</div>
            <div className="small">Preço: <strong>€{price.priceEur}</strong> (pagamento único)</div>
          </div>
          <Button disabled={!canSubmit || loading} onClick={startCheckout}>
            {loading ? "A abrir pagamento..." : "Pagar e gerar relatório"}
          </Button>
        </div>

        <div className="small" style={{ marginTop: 10 }}>
          Segurança: a análise só é gerada após confirmação do Stripe (webhook). O relatório fica num link privado (token).
        </div>
      </Card>
    </div>
  );
}

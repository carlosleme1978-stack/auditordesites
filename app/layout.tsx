import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auditor Digital Portugal",
  description: "Auditorias rápidas (Site, Instagram e Copy) com pagamento antes e entrega por link privado."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>
        <header className="header">
          <div className="headerInner">
            <a className="brand" href="/">
              <span className="logo" aria-hidden="true" />
              Auditor Digital PT
            </a>
            <nav className="nav">
              <a href="/lp">Landing</a>
              <a href="/auditar">Auditar</a>
              <a href="/admin">Admin</a>
            </nav>
          </div>
        </header>
        <div className="container">{children}</div>
        <div className="container footer">
          <div className="hr" />
          <div>© {new Date().getFullYear()} Auditor Digital Portugal • Sem login • Pagamento antes • Link privado</div>
        </div>
      </body>
    </html>
  );
}

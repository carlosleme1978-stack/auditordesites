import React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  const { variant = "primary", className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={[
        "btn",
        variant === "primary" ? "btnPrimary" : "btnGhost",
        className
      ].join(" ")}
    />
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return <input {...rest} className={["input", className].join(" ")} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", ...rest } = props;
  return <textarea {...rest} className={["textarea", className].join(" ")} />;
}

export function Card(props: { children: React.ReactNode; className?: string }) {
  return <div className={["card", props.className || ""].join(" ")}>{props.children}</div>;
}

export function Badge(props: { children: React.ReactNode }) {
  return <span className="badge">{props.children}</span>;
}

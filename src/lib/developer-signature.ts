declare global {
  interface Window {
    alchemistSignatureLogged?: boolean;
  }
}

export function showDeveloperSignature() {
  if (typeof window === "undefined" || window.alchemistSignatureLogged) return;
  window.alchemistSignatureLogged = true;

  const base = [
    "background: oklch(0.16 0.016 289)",
    "font-family: system-ui, sans-serif",
    "font-weight: bold",
    "padding: 4px",
    "border-block: 1px solid oklch(0.64 0.18 324)",
  ].join(";");

  console.info(
    "%c ⚗️ Crafted with Digital Alchemy %c✦%c Mehmet Yıldız %c✦%c mehmetyildiz.dev ",
    `${base};color:oklch(0.64 0.18 25);padding-left:8px;border-left:1px solid oklch(0.64 0.18 324);border-radius:4px 0 0 4px`,
    `${base};color:oklch(0.81 0.121 100)`,
    `${base};color:oklch(0.64 0.14 144);font-weight:600`,
    `${base};color:oklch(0.81 0.121 100)`,
    `${base};color:oklch(0.64 0.16 256);padding-right:8px;border-right:1px solid oklch(0.64 0.18 324);border-radius:0 4px 4px 0`,
  );
}

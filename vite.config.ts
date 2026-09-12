import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const configuredBase = process.env.VITE_BASE_PATH;
const normalizedBase = configuredBase?.replace(/^\/+|\/+$/g, "");
const base = normalizedBase ? `/${normalizedBase}/` : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": projectRoot } },
});

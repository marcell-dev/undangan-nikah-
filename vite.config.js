import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readFile } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";

function jsxInJs() {
  return {
    name: "jsx-in-js",
    enforce: "pre",
    async load(id) {
      const file = id.split("?")[0];
      if (!file.endsWith(".js") || file.includes("node_modules") || file.includes("\0")) return null;

      const code = await readFile(file, "utf8");
      return transformWithOxc(code, file, {
        lang: "jsx",
        jsx: { runtime: "automatic" },
      });
    },
  };
}

// Vite config — https://vitejs.dev/config/
export default defineConfig({
  plugins: [jsxInJs(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    noDiscovery: true,
    include: [
      "react",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
  server: {
    host: true,
    port: Number(process.env.PORT) || 5173,
  },
});

import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

// Copies files from /static into the build output dir (public/).
// This preserves static assets (og-image.png, robots.txt, etc.)
// that shouldn't be processed by Vite but must survive emptyOutDir.
function staticAssets(): Plugin {
  return {
    name: "static-assets",
    closeBundle() {
      const files = ["og-image.png", "robots.txt", "sitemap.xml"];
      for (const file of files) {
        const src = resolve(__dirname, "static", file);
        const dest = resolve(__dirname, "public", file);
        if (existsSync(src)) {
          mkdirSync(resolve(__dirname, "public"), { recursive: true });
          copyFileSync(src, dest);
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), staticAssets()],
  publicDir: false,
  build: {
    outDir: "public",
    emptyOutDir: true,
    manifest: "manifest.json",
    rollupOptions: {
      input: "src/client/main.ts",
    },
  },
});

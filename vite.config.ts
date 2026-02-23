import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite"; // See nitro setup instructions: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    allowedHosts: true
  },
  plugins: [
    viteTsConfigPaths(),
    tanstackStart({ prerender: { enabled: true } }),
    nitro({
      publicAssets: [
        // This is a temporary fix to https://github.com/TanStack/router/issues/5368
        {
          dir: "dist/client/__tsr",
          baseURL: "/__tsr",
          maxAge: 0
        }
      ]
    }),
    react(),
    tailwindcss()
  ]
});

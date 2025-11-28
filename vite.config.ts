// vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@api", replacement: path.resolve(__dirname, "src/api") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@layouts", replacement: path.resolve(__dirname, "src/layouts") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@routes", replacement: path.resolve(__dirname, "src/routes") },
      { find: "@types", replacement: path.resolve(__dirname, "src/types") },
    ],
  },
});

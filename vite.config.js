import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
  base: './',
  build: {
    target: "esnext",
  },
  plugins: [react()],
});

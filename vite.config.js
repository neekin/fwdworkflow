import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// const path = require("path");
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "lib",
    lib: {
      entry: path.resolve(__dirname, "packages/index.js"),
      name: "FWDComponents",
      fileName: "fwd-components",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});

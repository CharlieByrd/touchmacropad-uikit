import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import sassDts from "vite-plugin-sass-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    sassDts(),
    react(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: "./src/main.ts",
      fileName: "index",
      name: "touchmactopad-ui-kit",
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
          "@emotion/react": "@emotion/react",
          "@chakra-ui/react": "@chakra-ui/react",
          "@types/react": "@types/react"
        },
        format: "es",
      },
      external: ["react", "react-dom", "@emotion/react", "@chakra-ui/react", "@types/react"]
    },
  },
});

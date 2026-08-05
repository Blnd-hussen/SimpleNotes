import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/components/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@public": path.resolve(__dirname, "./public/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@contexts": path.resolve(__dirname, "./src/contexts/"),
      "@providers": path.resolve(__dirname, "./src/providers/"),
    },
  },
});

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    allowedHosts: ['localhost', 'fd4cxoelmw7qd2ujkx4cdoesvu.srv.us'],
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});

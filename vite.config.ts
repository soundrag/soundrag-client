import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import type { UserConfigExport as VitestUserConfig } from "vitest/config";

const vitestConfig: VitestUserConfig = {
  test: {
    globals: true,
    include: ["**/utils/*.test.{ts,tsx}"],
  },
};

export default defineConfig({
  plugins: [react()],
  ...vitestConfig,
});

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ fastRefresh: false })],
  root: "./pages",
  base: "./",
  resolve: {
    alias: {
      lodash: "lodash-es",
      "@cloudscape-design/components/internal/components/card": path.resolve(
        __dirname,
        "node_modules",
        "@cloudscape-design",
        "components",
        "internal",
        "components",
        "card",
      ),
    },
  },
  server: {
    open: "/index.html",
  },
  build: {
    sourcemap: true,
    outDir: "../dist",
  },
});

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from "vite";
import os from 'node:os';
import base from "./vite.config.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  ...base,
  root: "./",
  test: {
    environment: "node",
    testTimeout: 60000,
    poolOptions: {
      threads: {
        minThreads: 1,
        // leave half of CPU capacity for Chrome browser processes
        maxThreads: Math.max(Math.floor(os.cpus().length / 2), 1),
      },
    },
    include: ["./test/functional/**/*.test.ts"],
    setupFiles: ["./test/test-setup.ts"],
    globalSetup: ["./test/global-setup.ts"],
  },
});

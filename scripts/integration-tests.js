// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { execaSync } from "execa";
import { globbySync } from "globby";
import fs from "node:fs";
import path from "node:path";

import { writeJSON } from "./utils/files.js";

const outDir = "lib/integration-tests";
const tsconfigPath = path.resolve("tsconfig.integration-tests.json");

compileTypescript();
writePackageJson();

function compileTypescript() {
  // When none of the portable test files exist yet (e.g. before the
  // compareScreenshots refactor lands), tsc would fail with TS18003. Skip the
  // compile cleanly in that case so the rest of the build chain keeps working.
  const portableFiles = [
    "test/compare-screenshots.ts",
    "test/scenario-page-object.ts",
    ...globbySync("test/visual/**/*.test.ts").filter((f) => f !== "test/visual/index.test.ts"),
  ].filter((f) => fs.existsSync(f));
  if (portableFiles.length === 0) {
    console.warn("[integration-tests] No portable test files found. Skipping tsc compile.");
    fs.mkdirSync(outDir, { recursive: true });
    return;
  }
  execaSync("tsc", ["-p", tsconfigPath], { stdio: "inherit" });
}

function writePackageJson() {
  // Mark the emitted tree as an ES module so that Node resolves the .js files
  // produced by tsc (module: ESNext) as ESM when they are imported by the
  // internal orchestrator package.
  writeJSON(`${outDir}/package.json`, {
    name: "@cloudscape-design/chat-components-integration-tests",
    version: JSON.parse(fs.readFileSync("package.json", "utf-8")).version,
    private: true,
    type: "module",
  });
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import fs from "node:fs";
import path from "node:path";

export function listPublicDirs(baseDir) {
  return fs
    .readdirSync(baseDir)
    .filter(
      (elem) =>
        !elem.startsWith("__") &&
        !elem.startsWith(".") &&
        elem !== "api-docs" &&
        elem !== "internal" &&
        elem !== "index.tsx" &&
        elem !== "index.ts" &&
        elem !== "test-utils",
    );
}

export function writeSourceFile(filepath, content) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content);
}

export function writeJSON(path, content) {
  writeSourceFile(path, JSON.stringify(content, null, 2) + "\n");
}

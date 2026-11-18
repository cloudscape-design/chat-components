// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

import { extractStyleApiDocs } from "@cloudscape-design/component-toolkit/internal/style-api/docs";
import { generateSlotMixins } from "@cloudscape-design/component-toolkit/internal/style-api/generate-slot-mixins";
import { buildStyles } from "@cloudscape-design/theming-build/internal";

import { getBuildTimeEnvironmentConstants } from "./environment.js";

const sourceDir = "src";
const targetDir = "lib/components";
const { SYSTEM } = getBuildTimeEnvironmentConstants();
const styleApiDocDir = path.join(targetDir, "internal/api-docs/style-api-doc");
const styleApiDocTypes = path.join(
  path.dirname(createRequire(import.meta.url).resolve("@cloudscape-design/component-toolkit/internal/style-api/docs")),
  "docs.d.ts",
);

await buildStyles(sourceDir, targetDir, [{ url: "awsui:environment", contents: `$system: '${SYSTEM}';` }]);

// Style API v2: docs consumed by the website and by the snapshot test, and slot mixins used by the dev pages.
const documented = [];
for (const component of fs.readdirSync(sourceDir)) {
  const cssPath = path.join(targetDir, component, "styles.scoped.css");
  if (!fs.existsSync(cssPath)) {
    continue;
  }
  const docs = extractStyleApiDocs(fs.readFileSync(cssPath, "utf8"));
  if (docs.slots.length > 0) {
    writeFile(path.join(styleApiDocDir, `${component}.json`), JSON.stringify(docs, null, 2));
    writeFile(path.join(targetDir, "styling", `${component}.scss`), generateSlotMixins({ component, docs }));
    documented.push(component);
  }
}
writeFile(
  path.join(styleApiDocDir, "index.js"),
  `module.exports = {\n${documented.map((name) => `  ${JSON.stringify(name)}: require('./${name}.json'),`).join("\n")}\n};\n`,
);
writeFile(path.join(styleApiDocDir, "interfaces.d.ts"), fs.readFileSync(styleApiDocTypes, "utf8"));
writeFile(
  path.join(styleApiDocDir, "index.d.ts"),
  "import { StyleApiDocs } from './interfaces';\ndeclare const docs: Record<string, StyleApiDocs>;\nexport = docs;\n",
);

function writeFile(filepath, content) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content);
}

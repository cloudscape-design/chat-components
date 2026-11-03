// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import fs from "node:fs";
import path from "node:path";

import { extractStyleApiDocs } from "@cloudscape-design/component-toolkit/internal/style-api/docs";
import { generateSlotMixins } from "@cloudscape-design/component-toolkit/internal/style-api/generate-slot-mixins";
import { buildStyles } from "@cloudscape-design/theming-build/internal";

import { getBuildTimeEnvironmentConstants } from "./environment.js";

const sourceDir = "src";
const targetDir = "lib/components";
const { SYSTEM } = getBuildTimeEnvironmentConstants();

await buildStyles(sourceDir, targetDir, [{ url: "awsui:environment", contents: `$system: '${SYSTEM}';` }]);

// Style API v2: docs consumed by the website and by the snapshot test, and slot mixins used by the dev pages.
for (const component of fs.readdirSync(sourceDir)) {
  const cssPath = path.join(targetDir, component, "styles.scoped.css");
  if (!fs.existsSync(cssPath)) {
    continue;
  }
  const docs = extractStyleApiDocs(fs.readFileSync(cssPath, "utf8"));
  if (docs.slots.length > 0) {
    writeFile(
      path.join(targetDir, "internal/api-docs/style-api-doc", `${component}.json`),
      JSON.stringify(docs, null, 2),
    );
    writeFile(path.join(targetDir, "styling", `${component}.scss`), generateSlotMixins({ component, docs }));
  }
}

function writeFile(filepath, content) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content);
}

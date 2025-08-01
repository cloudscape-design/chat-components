// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { Buffer } from "buffer";
import { getHashDigest } from "loader-utils";
import path from "path";

import customCssPropertiesList from "./utils/custom-css-properties-list.js";
import { writeSourceFile } from "./utils/files.js";
import { gitCommitVersion } from "./utils/workspace.js";

const outputBasePath = "src/internal/generated/custom-css-properties";
const hash = getHashDigest(Buffer.from(JSON.stringify(customCssPropertiesList)), "md5", "base36", 6);

const getHashedProperty = (property) => {
  return `--awsui-${property.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}-${hash}`;
};

function writeJsFile() {
  const filepath = path.join(outputBasePath, "index.ts");

  writeSourceFile(
    filepath,
    `
      const customCSSPropertiesMap = {
        ${customCssPropertiesList.map((property) => `"${property}": "${getHashedProperty(property)}",`).join("\n")}
      };
      export default customCSSPropertiesMap;
    `,
  );
}

function writeSassFile() {
  const filepath = path.join(outputBasePath, "index.scss");

  writeSourceFile(
    filepath,
    `
    // Build environment
    $awsui-commit-hash: "${gitCommitVersion}";
    // Manually managed CSS-variables
    ${customCssPropertiesList.map((property) => `$${property}: ${getHashedProperty(property)};`).join("\n")}
    `,
  );
}

writeJsFile();
writeSassFile();

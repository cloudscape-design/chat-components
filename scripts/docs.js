// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import path from "node:path";
import process from "node:process";

import { documentComponents, documentTestUtils } from "@cloudscape-design/documenter";

import { dashCase, listPublicDirs, writeSourceFile } from "./utils.js";
const cwd = process.cwd();

const publicDirs = listPublicDirs("src");
const targetDir = "lib/components/internal/api-docs";

componentDocs();
testUtilDocs();

function validatePublicFiles(definitionFiles) {
  for (const publicDir of publicDirs) {
    if (!definitionFiles.includes(publicDir)) {
      throw new Error(`Directory src/${publicDir} does not have a corresponding API definition`);
    }
  }
}

function getNodeModulesInterfacePath(componentName) {
  return cwd + "/node_modules/@cloudscape-design/components/" + componentName + "/interfaces.d.ts";
}

function componentDocs() {
  const importedCoreComponents = ["icon"];
  const nodeModulesInputFilePaths = importedCoreComponents.map(getNodeModulesInterfacePath);
  const definitions = documentComponents(path.resolve("tsconfig.json"), "src/*/index.tsx", nodeModulesInputFilePaths);
  const outDir = path.join(targetDir, "components");
  const fileNames = definitions
    .filter((definition) => {
      const fileName = dashCase(definition.name);
      if (!publicDirs.includes(fileName)) {
        console.warn(`Excluded "${fileName}" from components definitions.`);
        return false;
      }
      return true;
    })
    .map((definition) => {
      const fileName = dashCase(definition.name);
      writeSourceFile(path.join(outDir, fileName + ".js"), `module.exports = ${JSON.stringify(definition, null, 2)};`);
      return fileName;
    });
  validatePublicFiles(fileNames);
  const indexContent = `module.exports = {
    ${fileNames.map((name) => `${JSON.stringify(name)}:require('./${name}')`).join(",\n")}
  }`;
  writeSourceFile(path.join(outDir, "index.js"), indexContent);
}

function testUtilDocs() {
  const tsconfig = path.resolve("src/test-utils/tsconfig.json");
  ["dom", "selectors"].forEach((testUtilType) => {
    const componentWrapperDefinitions = documentTestUtils({ tsconfig }, `**/{${testUtilType},types}/**/*`);

    const indexContent = `module.exports = {
      classes: ${JSON.stringify(componentWrapperDefinitions)}
    }
    `;

    const outPath = path.join(targetDir, "test-utils-doc", `${testUtilType}.js`);
    writeSourceFile(outPath, indexContent);
  });
}

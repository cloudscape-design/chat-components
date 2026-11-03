// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";

const styleApiDocDir = path.resolve(__dirname, "../../lib/components/internal/api-docs/style-api-doc");
const components = fs
  .readdirSync(styleApiDocDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.replace(/\.json$/, ""))
  .sort();

test("list of components with a Style API doc matches the snapshot", () => {
  expect(components).toMatchSnapshot();
});

test.each(components)("Style API docs of %s match the snapshot", (component) => {
  const docs = JSON.parse(fs.readFileSync(path.join(styleApiDocDir, `${component}.json`), "utf8"));
  expect(docs).toMatchSnapshot(component);
});

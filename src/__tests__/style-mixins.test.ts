// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";

const stylingDir = path.resolve(__dirname, "../../lib/components/styling");
const components = fs
  .readdirSync(stylingDir)
  .filter((file) => file.endsWith(".scss"))
  .map((file) => file.replace(/\.scss$/, ""))
  .sort();

test("list of components with Style API mixins matches the snapshot", () => {
  expect(components).toMatchSnapshot();
});

test.each(components)("Style API mixins of %s match the snapshot", (component) => {
  expect(fs.readFileSync(path.join(stylingDir, `${component}.scss`), "utf8")).toMatchSnapshot(component);
});

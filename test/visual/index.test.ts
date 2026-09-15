// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import path from "path";
import { test } from "vitest";

import compareScreenshots from "../compare-screenshots";
import ScenarioPageObject from "../scenario-page-object";

const pagesMap = import.meta.glob("../../pages/**/*.page.tsx", { as: "raw" });
const pages = Object.keys(pagesMap)
  .map((page) => page.replace(/\.page\.tsx$/, ""))
  .map((page) => "/#/" + path.relative("../../pages/", page));

test.each(pages)("matches snapshot for %s", (route) =>
  compareScreenshots(async (page: ScenarioPageObject) => {
    await page.openScenario(route);
    const hasScreenshotArea = await page.isExisting(".screenshot-area");

    if (hasScreenshotArea) {
      return page.captureScreenshotArea();
    }
  }),
);

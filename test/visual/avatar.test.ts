// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { describe, test } from "vitest";

import compareScreenshots from "../compare-screenshots";

describe("Avatar", () => {
  test("custom style", () =>
    compareScreenshots(async (page) => {
      await page.openScenario("avatar/custom-style");
      return page.captureScreenshotArea();
    }));

  test("permutations", () =>
    compareScreenshots(async (page) => {
      await page.openScenario("avatar/permutations");
      // The page does not actually use our permutations component,
      // therefore we capture the entire screenshot area at once.
      return page.captureScreenshotArea();
    }));
});

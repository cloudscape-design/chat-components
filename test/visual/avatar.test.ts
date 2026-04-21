// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { describe } from "vitest";

import { test } from "../visual-test-setup";

describe("Avatar", () => {
  test("custom style", ({ compareScreenshots }) =>
    compareScreenshots(async (page) => {
      await page.openScenario("avatar/custom-style");
      return page.captureScreenshotArea();
    }));

  test("permutations", ({ compareScreenshots }) =>
    compareScreenshots(async (page) => {
      await page.openScenario("avatar/permutations");
      // The page does not actually use our permutations component,
      // therefore we capture the entire screenshot area at once.
      return page.captureScreenshotArea();
    }));
});

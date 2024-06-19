// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { BasePageObject } from "@cloudscape-design/browser-test-tools/page-objects";
import createWrapper from "@cloudscape-design/components/test-utils/selectors";
import { describe, expect, test } from "vitest";
import { setupTest } from "../../utils";

const wrapper = createWrapper();

describe("focus-visible", () => {
  test(
    "focus ring updates when switching from keyboard to mouse and back",
    setupTest("/index.html#/hooks/focus-visible", BasePageObject, async (page) => {
      await page.waitForVisible(wrapper.findButton().toSelector());
      await page.click("#first-button");
      await expect(page.getElementAttribute("body", "data-awsui-focus-visible")).resolves.toBeNull();
      await page.keys("Tab");
      await expect(page.getElementAttribute("body", "data-awsui-focus-visible")).resolves.toBe("true");
      await page.click("#second-button");
      await expect(page.getElementAttribute("body", "data-awsui-focus-visible")).resolves.toBeNull();
    }),
  );
});

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, test } from "vitest";

import { BasePageObject } from "@cloudscape-design/browser-test-tools/page-objects";
import useBrowser from "@cloudscape-design/browser-test-tools/use-browser";

class SingleTabStopPage extends BasePageObject {
  getActiveElementId() {
    return this.browser.execute(function () {
      return document.activeElement?.id;
    });
  }
}

describe("single tab stop", () => {
  const setupTest = (testFn: (page: SingleTabStopPage) => Promise<void>) => {
    return useBrowser(async (browser) => {
      const page = new SingleTabStopPage(browser);
      await browser.url("/single-tab-stop.page");
      await testFn(page);
    });
  };

  const beforeButton = "button:nth-of-type(1)";

  test(
    "Expect focus to work as expected for horizontal buttons",
    setupTest(async (page) => {
      await page.click(beforeButton);
      await page.keys("Tab");
      await expect(page.getActiveElementId()).resolves.toBe("image");

      await page.keys(["ArrowRight", "ArrowRight", "ArrowRight", "ArrowRight"]);
      await expect(page.getActiveElementId()).resolves.toBe("brainstorm");
    }),
  );

  test(
    "Expect focus to work as expected for vertical buttons",
    setupTest(async (page) => {
      await page.click(beforeButton);
      await page.keys(["Tab", "Tab"]);
      await expect(page.getActiveElementId()).resolves.toBe("image-2");

      await page.keys(["ArrowDown", "ArrowDown", "ArrowDown", "ArrowDown"]);
      await expect(page.getActiveElementId()).resolves.toBe("brainstorm-2");
    }),
  );

  test(
    "Expect focus to not move with horizontal arrow keys for vertical buttons",
    setupTest(async (page) => {
      await page.click(beforeButton);
      await page.keys(["Tab", "Tab"]);
      await expect(page.getActiveElementId()).resolves.toBe("image-2");

      await page.keys("ArrowRight");
      await expect(page.getActiveElementId()).resolves.toBe("image-2");
    }),
  );
});

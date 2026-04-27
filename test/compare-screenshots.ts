// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { expect } from "vitest";

import { ScreenshotWithOffset } from "@cloudscape-design/browser-test-tools/page-objects";
import useBrowser from "@cloudscape-design/browser-test-tools/use-browser";

import ScenarioPageObject from "./scenario-page-object";

// Default window size to ensure 4-columns layout is used.
const windowSize = { width: 1600, height: 800 };

export interface ScreenshotTestConfiguration {
  width?: number;
  height?: number;
  skipBrowsers?: Array<string>;
  retries?: number;
}

interface PermutationScreenshot extends ScreenshotWithOffset {
  id: string;
}

export type TestCallback = (
  page: ScenarioPageObject,
) => Promise<ScreenshotWithOffset | PermutationScreenshot[] | undefined>;

export default function compareScreenshots(...args: [ScreenshotTestConfiguration, TestCallback] | [TestCallback]) {
  let testFn: TestCallback;
  let configuration: ScreenshotTestConfiguration;
  if (args.length === 1) {
    configuration = {};
    testFn = args[0];
  } else {
    configuration = args[0];
    testFn = args[1];
  }

  return useBrowser({ ...windowSize, ...configuration }, async (browser) => {
    const page = new ScenarioPageObject(browser);
    const result = await testFn(page);

    if (result && "image" in result) {
      const imageBuffer = result.image;

      expect(imageBuffer).toMatchImageSnapshot();
    }
  })();
}

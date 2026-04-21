// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ScreenshotPageObject, ScreenshotWithOffset } from "@cloudscape-design/browser-test-tools/page-objects";

const screenshotAreaSelector = ".screenshot-area";

export default class ScenarioPageObject extends ScreenshotPageObject {
  private baseUrl?: URL;

  constructor(
    browser: ConstructorParameters<typeof ScreenshotPageObject>[0],
    public readonly forceScrollAndMerge: boolean = false,
  ) {
    super(browser);
  }

  captureScreenshotArea(): Promise<ScreenshotWithOffset> {
    return this.captureBySelector(screenshotAreaSelector);
  }

  async openScenario(scenarioName: string, queryParams?: Record<string, string>) {
    await this.openIntegrationTestPage(scenarioName, queryParams);
    await this.waitForVisible(screenshotAreaSelector);
  }

  async openIntegrationTestPage(pageName: string, queryParams: Record<string, string> = {}) {
    if (pageName.includes("?")) {
      throw new Error(
        `Scenario name "${pageName}" may not contain query parameters. To pass extra params use the second argument.`,
      );
    }
    const params = new URLSearchParams(queryParams);
    params.append("motionDisabled", "true");
    params.append("screenshotMode", "true");
    const pagePath = `#/${pageName}?${params.toString()}`;
    await this.openPage(pagePath);
    // we use hash routing on our test pages. Geckodriver in this case does not handle navigation correctly
    // https://github.com/mozilla/geckodriver/issues/1678
    await this.browser.waitUntil(async () => {
      const currentUrl = await this.browser.getUrl();
      const pageUrl = new URL(pagePath, this.baseUrl).toString();
      return currentUrl.startsWith(pageUrl);
    });
    await this.waitForVisible("main");
    await this.waitForJsTimers(100);
  }

  async openPage(pagePath: string) {
    const pageUrl = new URL(pagePath, this.baseUrl).toString();
    await this.browser.url(pageUrl);
  }
}

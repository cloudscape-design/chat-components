// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ScreenshotPageObject, ScreenshotWithOffset } from "@cloudscape-design/browser-test-tools/page-objects";

const SCREENSHOT_AREA = ".screenshot-area";

export default class ScenarioPageObject extends ScreenshotPageObject {
  private baseUrl?: URL;

  constructor(
    browser: ConstructorParameters<typeof ScreenshotPageObject>[0],
    public readonly forceScrollAndMerge: boolean = false,
  ) {
    super(browser);
  }

  /**
   * Runs a test callback against a specific host, matching the AWS-UI-IntegrationTests pattern.
   * Sets the base URL and theme on this page object, then invokes the callback.
   */
  async runTestOnHost<Result>(
    _title: string,
    baseUrl: string,
    _theme: string,
    testFn: (page: ScenarioPageObject) => Result,
  ): Promise<Awaited<Result>> {
    this.baseUrl = new URL(baseUrl);
    try {
      return await testFn(this);
    } catch (error) {
      console.error("Error while executing a test");
      console.error((error as Error).stack || (error as Error).message || error);
      throw error;
    }
  }

  captureScreenshotArea(): Promise<ScreenshotWithOffset> {
    return this.captureBySelector(SCREENSHOT_AREA);
  }

  async openScenario(scenarioName: string, queryParams?: Record<string, string>) {
    await this.openIntegrationTestPage(scenarioName, queryParams);
    await this.waitForVisible(SCREENSHOT_AREA);
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
    const pagePath = `/#/${pageName}?${params.toString()}`;

    if (this.baseUrl) {
      const pageUrl = new URL(pagePath, this.baseUrl).toString();
      await this.browser.url(pageUrl);
    } else {
      await this.browser.url(pagePath);
    }

    await this.waitForVisible("main");
    await this.waitForJsTimers(100);
  }

  async openPage(pagePath: string) {
    const pageUrl = new URL(pagePath, this.baseUrl).toString();
    await this.browser.url(pageUrl);
  }
}

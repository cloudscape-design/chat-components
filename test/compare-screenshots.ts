// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { strict as assert } from "assert";

import { cropAndCompare, cropByOffset } from "@cloudscape-design/browser-test-tools/image-utils";
import { ScreenshotWithOffset } from "@cloudscape-design/browser-test-tools/page-objects";
import useBrowser from "@cloudscape-design/browser-test-tools/use-browser";

import ScenarioPageObject from "./scenario-page-object.js";

// ---------------------------------------------------------------------------
// Configuration from environment
// ---------------------------------------------------------------------------

const oldHost = process.env.npm_config_old_host;
const newHost = process.env.npm_config_new_host;
const theme = process.env.npm_config_theme || "default";
const oldTheme = process.env.npm_config_old_theme || theme;

/** When true, compare new host against old host. When false, compare against stored snapshots. */
export const isDualHostMode = Boolean(oldHost && newHost);

// Default window size to ensure 4-columns layout is used.
const windowSize = { width: 1600, height: 800 };

const SCREENSHOT_DEFAULT_RETRIES = 2;

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface ScreenshotTestConfiguration {
  width?: number;
  height?: number;
  skipBrowsers?: Array<string>;
  retries?: number;
}

export interface PermutationScreenshot extends ScreenshotWithOffset {
  id: string;
}

export type TestCallback = (page: ScenarioPageObject) => Promise<ScreenshotWithOffset | PermutationScreenshot[]>;

/**
 * Pluggable comparison function. In snapshot mode this is provided by the
 * local test setup (jest-image-snapshot). In dual-host mode it is unused.
 */
export type SnapshotCompareFn = (result: ScreenshotWithOffset | PermutationScreenshot[]) => void;

// ---------------------------------------------------------------------------
// Dual-host mode: compare new host against old host (AWS-UI-IntegrationTests)
// ---------------------------------------------------------------------------

async function dualHostCompareSingle(newResult: ScreenshotWithOffset, oldResult: ScreenshotWithOffset): Promise<void> {
  const { isEqual } = await cropAndCompare(newResult, oldResult);
  assert.ok(isEqual, "Images should match");
}

async function dualHostCompareMulti(
  newResults: PermutationScreenshot[],
  oldResults: PermutationScreenshot[],
  passed: Set<string>,
): Promise<void> {
  const results: Record<string, { newResult?: PermutationScreenshot; oldResult?: PermutationScreenshot }> = {};
  for (const result of newResults) {
    results[result.id] = { newResult: result };
  }
  for (const result of oldResults) {
    if (!results[result.id]) {
      results[result.id] = {};
    }
    results[result.id].oldResult = result;
  }

  let failedScreenshots = 0;

  for (const [id, { oldResult, newResult }] of Object.entries(results)) {
    if (passed.has(id)) {
      continue;
    }
    try {
      if (oldResult && !newResult) {
        console.warn(`Permutation removed: ${id}`);
        await cropByOffset(oldResult.image, oldResult.offset);
        assert.fail("Permutation was removed");
      }
      if (!oldResult && newResult) {
        console.warn(`Permutation added: ${id}`);
        await cropByOffset(newResult.image, newResult.offset);
        assert.fail("Permutation was added");
      }
      if (oldResult && newResult) {
        const { isEqual } = await cropAndCompare(newResult, oldResult);
        assert.ok(isEqual, "Images should match");
        passed.add(id);
      }
    } catch {
      failedScreenshots++;
    }
  }
  assert.equal(failedScreenshots, 0, "All images should match");
}

async function dualHostCompare(
  newResult: ScreenshotWithOffset | PermutationScreenshot[],
  oldResult: ScreenshotWithOffset | PermutationScreenshot[],
  passed: Set<string>,
): Promise<void> {
  if (Array.isArray(oldResult) && Array.isArray(newResult)) {
    await dualHostCompareMulti(newResult, oldResult, passed);
  } else if ("image" in newResult && "image" in oldResult) {
    await dualHostCompareSingle(newResult as ScreenshotWithOffset, oldResult as ScreenshotWithOffset);
  } else {
    throw new Error("Unexpected result: " + JSON.stringify({ newResult, oldResult }));
  }
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export default function compareScreenshots(
  configuration: ScreenshotTestConfiguration,
  testFn: TestCallback,
): () => Promise<void>;
export default function compareScreenshots(testFn: TestCallback): () => Promise<void>;
export default function compareScreenshots(
  ...args: [ScreenshotTestConfiguration, TestCallback] | [TestCallback]
): () => Promise<void> {
  let testFn: TestCallback;
  let configuration: ScreenshotTestConfiguration;
  if (args.length === 1) {
    configuration = {};
    testFn = args[0];
  } else {
    configuration = args[0];
    testFn = args[1];
  }

  const { skipBrowsers, retries, ...sizeOverrides } = configuration;

  // skipBrowsers is a no-op in single-browser environments but preserved for compatibility.
  void skipBrowsers;

  const allowedRuns = 1 + (retries ?? SCREENSHOT_DEFAULT_RETRIES);

  if (isDualHostMode) {
    // -----------------------------------------------------------------------
    // Dual-host mode: capture from both hosts and compare against each other.
    // -----------------------------------------------------------------------
    return useBrowser({ ...windowSize, ...sizeOverrides }, async (browser) => {
      const page = new ScenarioPageObject(browser);
      const passed = new Set<string>();
      let attempt = 1;

      while (attempt <= allowedRuns) {
        const newResult = await page.runTestOnHost("new host", newHost!, theme, testFn);
        const oldResult = await page.runTestOnHost("old host", oldHost!, oldTheme, testFn);

        try {
          await dualHostCompare(newResult, oldResult, passed);
          return;
        } catch (e) {
          if (attempt === allowedRuns) {
            throw e;
          }
          attempt++;
        }
      }
    });
  } else {
    // -----------------------------------------------------------------------
    // Snapshot mode: capture once and compare against stored baselines.
    // The actual comparison is injected via snapshotCompare, which is set by
    // the local test setup (visual-test-setup.ts) to avoid a hard dependency
    // on jest-image-snapshot in this file (which is compiled for distribution
    // with "types": [] and cannot reference vitest or jest types).
    // -----------------------------------------------------------------------
    return useBrowser({ ...windowSize, ...sizeOverrides }, async (browser) => {
      const page = new ScenarioPageObject(browser);
      let attempt = 1;

      while (attempt <= allowedRuns) {
        const result = await testFn(page);

        try {
          if (!snapshotCompare) {
            throw new Error(
              "snapshotCompare is not set. Import and call setSnapshotCompare() in your test setup file.",
            );
          }
          snapshotCompare(result);
          return;
        } catch (e) {
          if (attempt === allowedRuns) {
            throw e;
          }
          attempt++;
        }
      }
    });
  }
}

// ---------------------------------------------------------------------------
// Snapshot comparison injection (set by visual-test-setup.ts)
// ---------------------------------------------------------------------------

let snapshotCompare: SnapshotCompareFn | null = null;

export function setSnapshotCompare(fn: SnapshotCompareFn): void {
  snapshotCompare = fn;
}

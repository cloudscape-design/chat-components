// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { configureToMatchImageSnapshot } from "jest-image-snapshot";
import { join } from "path";
import { PNG } from "pngjs";
import { expect } from "vitest";

import { ScreenshotWithOffset } from "@cloudscape-design/browser-test-tools/page-objects";

import { PermutationScreenshot, setSnapshotCompare } from "./compare-screenshots";

const snapshotDir = join(__dirname, "./..", process.env.VISUAL_REGRESSION_SNAPSHOT_DIRECTORY ?? "__image_snapshots__");

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: snapshotDir,
});

expect.extend({ toMatchImageSnapshot });

function cropToBuffer(screenshot: ScreenshotWithOffset): Buffer {
  const { image, offset, width, height } = screenshot;
  const cropped = new PNG({ width, height });
  PNG.bitblt(image, cropped, offset.left, offset.top, width, height, 0, 0);
  return PNG.sync.write(cropped);
}

setSnapshotCompare((result: ScreenshotWithOffset | PermutationScreenshot[]) => {
  if (Array.isArray(result)) {
    if (result.length === 0) {
      throw new Error("No permutations found.");
    }
    for (const permutation of result) {
      expect(cropToBuffer(permutation)).toMatchImageSnapshot({
        customSnapshotIdentifier: ({ currentTestName, counter }) =>
          `${currentTestName}-permutation-${permutation.id}-${counter}`,
      });
    }
  } else {
    expect(cropToBuffer(result)).toMatchImageSnapshot();
  }
});

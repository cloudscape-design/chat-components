// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { configureToMatchImageSnapshot } from "jest-image-snapshot";
import { join } from "path";
import { expect, test as baseTest } from "vitest";

import compareScreenshots from "./compare-screenshots";

const snapshotDir = join(__dirname, "./..", process.env.VISUAL_REGRESSION_SNAPSHOT_DIRECTORY ?? "__image_snapshots__");

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: snapshotDir,
});

expect.extend({ toMatchImageSnapshot });

const test = baseTest.extend<{ compareScreenshots: typeof compareScreenshots }>({
  // eslint-disable-next-line no-empty-pattern
  compareScreenshots: async ({}, use) => {
    await use(compareScreenshots);
  },
});

export { test };

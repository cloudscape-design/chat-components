// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ReactNode } from "react";
import clsx from "clsx";

import { useAppModes } from "@cloudscape-design/build-tools/lib/dev-pages-utils";

import styles from "./screenshot-area.module.css";

export function ScreenshotArea({ children }: { children: ReactNode }) {
  const { urlParams } = useAppModes();
  return <div className={clsx("screenshot-area", urlParams.screenshotMode && styles["no-animation"])}>{children}</div>;
}

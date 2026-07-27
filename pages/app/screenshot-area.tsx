// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ReactNode, useContext } from "react";
import clsx from "clsx";

import AppContext from "./app-context";

import styles from "./screenshot-area.module.css";

export function ScreenshotArea({ children }: { children: ReactNode }) {
  const { urlParams } = useContext(AppContext);
  return <div className={clsx("screenshot-area", urlParams.screenshotMode && styles["no-animation"])}>{children}</div>;
}

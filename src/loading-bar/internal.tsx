// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from "clsx";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { LoadingBarProps } from "./interfaces";

import styles from "./styles.css.js";

export function InternalLoadingBar({
  variant,
  __internalRootRef,
  ...rest
}: LoadingBarProps & InternalBaseComponentProps) {
  return (
    <div
      ref={__internalRootRef}
      {...getDataAttributes(rest)}
      className={clsx([styles.root, styles[`variant-${variant}`]])}
    />
  );
}

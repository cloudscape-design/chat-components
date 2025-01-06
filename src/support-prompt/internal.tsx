// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from "clsx";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { SupportPromptProps } from "./interfaces";

import styles from "./styles.css.js";

export function InternalSupportPrompt({
  children,
  onClick,
  __internalRootRef,
  ...rest
}: SupportPromptProps & InternalBaseComponentProps) {
  return (
    <button onClick={onClick} ref={__internalRootRef} {...getDataAttributes(rest)} className={clsx([styles.root])}>
      {children}
    </button>
  );
}

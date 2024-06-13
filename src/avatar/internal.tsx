// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";

import { AvatarProps } from "./interfaces";
import styles from "./styles.css.js";

export function InternalAvatar({ initials, __internalRootRef, ...rest }: AvatarProps & InternalBaseComponentProps) {
  return (
    <div ref={__internalRootRef} {...getDataAttributes(rest)} className={styles.root}>
      {initials}
    </div>
  );
}

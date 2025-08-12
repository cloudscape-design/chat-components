// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from "clsx";

import { AvatarProps } from "../interfaces.js";
import { getLoadingDotsStyle } from "../style";

import styles from "./styles.css.js";

interface LoadingDotsProps {
  color?: string;
  style?: AvatarProps.Style;
  width?: number;
}

export default function LoadingDots({ color, width, style }: LoadingDotsProps) {
  const dotSize = `calc(.14px * ${width})`;

  return (
    // "gen-ai" class is added so that the gradient background animates.
    <div className={clsx(styles.root, { [styles["gen-ai"]]: color === "gen-ai" })} style={getLoadingDotsStyle(style)}>
      <div className={styles.typing}>
        <div className={styles.dot} style={{ blockSize: dotSize, inlineSize: dotSize }}></div>
        <div className={styles.dot} style={{ blockSize: dotSize, inlineSize: dotSize }}></div>
        <div className={styles.dot} style={{ blockSize: dotSize, inlineSize: dotSize }}></div>
      </div>
    </div>
  );
}

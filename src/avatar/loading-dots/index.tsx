// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from "clsx";
import styles from "./styles.css.js";

interface LoadingDotsProps {
  color?: string;
}

export default function LoadingDots({ color }: LoadingDotsProps) {
  return (
    // "gen-ai" class is added so that the gradient background animates.
    <div className={clsx(styles.root, { [styles["gen-ai"]]: color === "gen-ai" })}>
      <div className={styles.typing}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}

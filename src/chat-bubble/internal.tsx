// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from "clsx";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { InternalLoadingBar } from "../loading-bar/internal";
import { ChatBubbleProps } from "./interfaces.js";

import styles from "./styles.css.js";

export interface InternalChatBubbleProps extends ChatBubbleProps, InternalBaseComponentProps {}

export default function InternalChatBubble({
  backgroundColor,
  children,
  avatar,
  inlineActions,
  showLoadingBar,
  ariaLabel,
  __internalRootRef = null,
  ...rest
}: InternalChatBubbleProps) {
  return (
    <div
      className={styles.root}
      {...getDataAttributes(rest)}
      ref={__internalRootRef}
      role="group"
      aria-label={ariaLabel}
    >
      {avatar && <div className={styles.avatar}>{avatar}</div>}

      <div className={clsx(styles.bubble, styles[`chat-bubble-bg-${backgroundColor}`])}>
        <div
          className={clsx(styles["content-container"], showLoadingBar && !inlineActions && styles["has-loading-bar"])}
        >
          <div className={styles.content}>{children}</div>

          {showLoadingBar && <InternalLoadingBar variant="gen-ai-masked" />}

          {inlineActions && <div className={styles["inline-actions"]}>{inlineActions}</div>}
        </div>
      </div>
    </div>
  );
}

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
  color,
  children,
  avatar,
  actions,
  showLoadingBar,
  hideAvatar,
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
      {avatar && (
        // `inert` is used to prevent any interactions with the avatar when it's hidden.
        // It is added by spreading object because it doesn't exist in react types yet.
        <div className={clsx(styles.avatar, hideAvatar && styles.hide)} {...{ inert: hideAvatar ? "" : undefined }}>
          {avatar}
        </div>
      )}

      <div className={clsx(styles.bubble, color && styles[`chat-bubble-color-${color}`])}>
        <div className={clsx(styles["content-container"], showLoadingBar && !actions && styles["has-loading-bar"])}>
          <div className={styles.content}>{children}</div>

          {showLoadingBar && <InternalLoadingBar variant="gen-ai-masked" />}

          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </div>
    </div>
  );
}

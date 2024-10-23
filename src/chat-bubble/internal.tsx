// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from "react";
import clsx from "clsx";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { InternalLoadingBar } from "../loading-bar/internal";
import { ChatBubbleProps } from "./interfaces.js";

import styles from "./styles.css.js";

export interface InternalChatBubbleProps extends ChatBubbleProps, InternalBaseComponentProps {}

export default function InternalChatBubble({
  type,
  children,
  avatar,
  actions,
  isGeneratingContent,
  hideAvatar = false,
  ariaLabel,
  __internalRootRef = null,
  ...rest
}: InternalChatBubbleProps) {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We have to do this because `inert` isn't properly supported until
    // React 19 and this seems much more maintainable than version detection.
    // `inert` is better than `hidden` because it also blocks pointer and
    // focus events as well as hiding the contents from screen readers.
    // https://github.com/facebook/react/issues/17157
    if (avatarRef.current) {
      avatarRef.current.inert = hideAvatar;
    }
  }, [hideAvatar]);

  return (
    <div
      className={styles.root}
      {...getDataAttributes(rest)}
      ref={__internalRootRef}
      role="group"
      aria-label={ariaLabel}
    >
      {avatar && (
        <div ref={avatarRef} className={clsx(styles.avatar, hideAvatar && styles.hide)}>
          {avatar}
        </div>
      )}

      <div
        className={clsx(styles["message-area"], styles[`chat-bubble-type-${type}`], {
          [styles["generating-content-indicator-bottom"]]: isGeneratingContent,
        })}
      >
        <div className={styles.content}>{children}</div>

        {actions && <div className={styles.actions}>{actions}</div>}

        {isGeneratingContent && <InternalLoadingBar variant="gen-ai-masked" />}
      </div>
    </div>
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useRef } from "react";
import clsx from "clsx";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { fireNonCancelableEvent } from "../internal/events";
import { InternalLoadingBar } from "../loading-bar/internal";
import { ChatBubbleProps } from "./interfaces.js";

import styles from "./styles.css.js";

export interface InternalChatBubbleProps extends ChatBubbleProps, InternalBaseComponentProps {}

export default function InternalChatBubble({
  type,
  children,
  avatar,
  actions,
  showLoadingBar,
  hideAvatar = false,
  ariaLabel,
  selectionType,
  selected,
  onSelect,
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

  const Tag = selectionType === "click" && onSelect ? "button" : "div";

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

      <Tag
        aria-pressed={selected}
        onClick={() => fireNonCancelableEvent(onSelect)}
        className={clsx(styles["message-area"], styles[`chat-bubble-type-${type}`], {
          [styles["with-loading-bar"]]: showLoadingBar,
          [styles["message-area-selectable"]]: !!selectionType,
          [styles["message-area-clickable"]]: selectionType === "click",
          [styles["message-area-selected"]]: selected,
        })}
      >
        <div className={styles.content}>{children}</div>

        {actions && <div className={styles.actions}>{actions}</div>}

        {showLoadingBar && <InternalLoadingBar variant="gen-ai-masked" />}
      </Tag>
    </div>
  );
}

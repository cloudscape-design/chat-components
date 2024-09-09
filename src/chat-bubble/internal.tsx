// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useState } from "react";
import clsx from "clsx";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { ChatBubbleProps } from "./interfaces.js";

import styles from "./styles.css.js";

export interface InternalChatBubbleProps extends ChatBubbleProps, InternalBaseComponentProps {}

export default function InternalChatBubble({
  backgroundColor,
  children,
  avatar,
  inlineActions,
  showInlineActionsOnHover,
  staggered,
  ariaRole,
  __internalRootRef = null,
  ...rest
}: InternalChatBubbleProps) {
  const [hasHoverOrFocus, setHasHoverOrFocus] = useState(false);

  return (
    <div
      className={clsx(styles.root, staggered && styles.staggered)}
      {...getDataAttributes(rest)}
      ref={__internalRootRef}
    >
      {avatar && <div className={styles.avatar}>{avatar}</div>}

      <div
        tabIndex={0}
        role={ariaRole}
        // role=""
        // aria-roledescription="" // ?
        // aria-label="" // what to announce?
        className={clsx(styles.bubble, styles[`chat-bubble-bg-${backgroundColor}`], staggered && styles.staggered)}
        onMouseEnter={() => setHasHoverOrFocus(true)}
        onMouseLeave={() => setHasHoverOrFocus(false)}
        onFocus={() => setHasHoverOrFocus(true)}
        onBlur={() => setHasHoverOrFocus(false)}
        // onTouchStart and onTouchEnd?
      >
        <div className={styles["content-container"]}>
          <div className={styles.content}>{children}</div>

          {/* removing inline actions when bubble is not focused is alright but if all inline actions stay in the dom, aria labels must be different? To be discussed with a11y */}
          {/* visibility css doesn't work bc button sets it to visible so setting it here doesn't work */}
          {inlineActions && (
            <div
              className={clsx(styles["inline-actions"], showInlineActionsOnHover && !hasHoverOrFocus && styles.hide)}
              hidden={showInlineActionsOnHover && !hasHoverOrFocus} // test fails without this saying element is visible even though it has opacity set to 0 by "hide" class?
            >
              {inlineActions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

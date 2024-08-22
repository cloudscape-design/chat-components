// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useState } from "react";
import clsx from "clsx";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { ChatBubbleProps } from "./interfaces.js";

import styles from "./styles.css.js";

export interface InternalChatBubbleProps extends ChatBubbleProps, InternalBaseComponentProps {}

// function SourceLink({ external, target, href, text }: ChatBubbleProps.Source) {
//   return (
//     <div key={`${text}-${href}`}>
//       <Link external={external} href={href} target={target}>
//         {text || href}
//       </Link>
//     </div>
//   );
// }

export default function InternalChatBubble({
  backgroundColor,
  children,
  avatar,
  inlineActions,
  showInlineActionsOnHover,
  __internalRootRef = null,
  ...rest
}: InternalChatBubbleProps) {
  const [hasHover, setHasHover] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div className={styles.root} {...getDataAttributes(rest)} ref={__internalRootRef}>
      {avatar && <div className={styles.avatar}>{avatar}</div>}

      <div
        tabIndex={0}
        // role=""
        // aria-roledescription="" // ?
        // aria-label="" // what to announce?
        className={clsx(styles.bubble, styles[`chat-bubble-bg-${backgroundColor}`])}
        onMouseEnter={() => setHasHover(true)}
        onMouseLeave={() => setHasHover(false)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        // onTouchStart and onTouchEnd?
      >
        <div className={styles["content-container"]}>
          <div className={styles.content}>{children}</div>

          {/* {sources && sources.length > 0 && (
            <ExpandableSection headerText="Sources">{sources.map(SourceLink)}</ExpandableSection>
          )} */}

          {/* removing inline actions when bubble is not focused is alright but if all inline actions stay in the dom, aria labels must be different? To be discussed with a11y */}
          {/* visibility css doesn't work bc button sets it to visible so setting it here doesn't work */}
          {inlineActions && (
            <div
              className={clsx(
                styles["inline-actions"],
                showInlineActionsOnHover && !(hasFocus || hasHover) && styles.hide,
              )}
            >
              {inlineActions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

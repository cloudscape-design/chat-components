// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from "clsx";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { fireCancelableEvent } from "../internal/events";
import { SupportPromptGroupProps } from "./interfaces";

import styles from "./styles.css.js";

export function InternalSupportPromptGroup({
  alignment,
  onItemClick,
  items,
  __internalRootRef,
  ariaLabel,
  ...rest
}: SupportPromptGroupProps & InternalBaseComponentProps) {
  const handleClick = (event: React.MouseEvent, label: string) => {
    const { altKey, button, ctrlKey, metaKey, shiftKey } = event;
    fireCancelableEvent(onItemClick, { label, altKey, button, ctrlKey, metaKey, shiftKey }, event);
  };

  return (
    <div
      role="menubar"
      className={clsx(styles.root, {
        [styles.vertical]: alignment === "vertical",
      })}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <button
          key={index}
          role="menuitem"
          onClick={(event) => handleClick(event, item.label)}
          ref={__internalRootRef}
          {...getDataAttributes(rest)}
          className={clsx(styles["support-prompt"])}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

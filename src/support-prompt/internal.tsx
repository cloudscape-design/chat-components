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
  ...rest
}: SupportPromptGroupProps & InternalBaseComponentProps) {
  const handleClick = (event: React.MouseEvent, id: string) => {
    const { altKey, button, ctrlKey, metaKey, shiftKey } = event;
    fireCancelableEvent(onItemClick, { id, altKey, button, ctrlKey, metaKey, shiftKey }, event);
  };

  return (
    <div role="menubar">
      {items.map((item) => (
        <button
          key={item.id}
          role="menuitem"
          id={item.id}
          onClick={(event) => handleClick(event, item.id)}
          ref={__internalRootRef}
          {...getDataAttributes(rest)}
          className={clsx([styles.root], alignment === "horizontal" && [styles.horizontal])}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

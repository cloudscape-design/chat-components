// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef } from "react";
import clsx from "clsx";

import { KeyCode } from "@cloudscape-design/component-toolkit/internal";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { fireCancelableEvent } from "../internal/events";
import { getAllFocusables } from "../internal/focus-lock/utils";
import {
  //useSingleTabStopNavigation,
  SingleTabStopNavigationAPI,
  SingleTabStopNavigationProvider,
} from "../internal/single-tab-stop";
import { circleIndex } from "../internal/utils/circle-index";
import handleKey from "../internal/utils/handle-key";
import { useMergeRefs } from "../internal/utils/use-merge-refs";
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
  const focusedIdRef = useRef<null | string>(null);
  const navigationAPI = useRef<SingleTabStopNavigationAPI>(null);
  const containerObjectRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Record<string, any | null>>({});

  const mergedRef = useMergeRefs(containerObjectRef, __internalRootRef);

  const handleClick = (event: React.MouseEvent, id: string) => {
    const { altKey, button, ctrlKey, metaKey, shiftKey } = event;
    fireCancelableEvent(onItemClick, { id, altKey, button, ctrlKey, metaKey, shiftKey }, event);
  };

  function getNextFocusTarget(): null | HTMLElement {
    if (containerObjectRef.current) {
      const buttons: HTMLButtonElement[] = Array.from(
        containerObjectRef.current.querySelectorAll(`.${styles["support-prompt"]}`),
      );
      const activeButtons = buttons.filter((button) => !button.disabled);
      return activeButtons.find((button) => button.dataset.itemid === focusedIdRef.current) ?? activeButtons[0] ?? null;
    }
    return null;
  }

  function onUnregisterActive(focusableElement: HTMLElement) {
    // Only refocus when the node is actually removed (no such ID anymore).
    const target = navigationAPI.current?.getFocusTarget();

    if (target && target.dataset.itemid !== focusableElement.dataset.itemid) {
      target.focus();
    }
  }

  useEffect(() => {
    navigationAPI.current?.updateFocusTarget();
  });

  function onFocus(event: React.FocusEvent) {
    if (event.target instanceof HTMLElement && event.target.dataset.itemid) {
      focusedIdRef.current = event.target.dataset.itemid;
    }

    navigationAPI.current?.updateFocusTarget();
  }

  function onBlur() {
    navigationAPI.current?.updateFocusTarget();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    const focusTarget = navigationAPI.current?.getFocusTarget();
    const specialKeys = [KeyCode.right, KeyCode.left, KeyCode.end, KeyCode.home, KeyCode.pageUp, KeyCode.pageDown];

    const hasModifierKeys = (event: React.MouseEvent | React.KeyboardEvent) => {
      return event.ctrlKey || event.altKey || event.shiftKey || event.metaKey;
    };

    if (hasModifierKeys(event) || specialKeys.indexOf(event.keyCode) === -1) {
      return;
    }
    if (!containerObjectRef.current || !focusTarget) {
      return;
    }
    // Ignore navigation when the focused element is not an item.
    if (document.activeElement && !document.activeElement.matches(`.${styles["support-prompt"]}`)) {
      return;
    }
    event.preventDefault();

    const focusables = getFocusablesFrom(containerObjectRef.current);
    const activeIndex = focusables.indexOf(focusTarget);
    handleKey(event as any, {
      onHome: () => focusElement(focusables[0]),
      onEnd: () => focusElement(focusables[focusables.length - 1]),
      onInlineStart: () => focusElement(focusables[circleIndex(activeIndex - 1, [0, focusables.length - 1])]),
      onInlineEnd: () => focusElement(focusables[circleIndex(activeIndex + 1, [0, focusables.length - 1])]),
    });
  }

  function focusElement(element: HTMLElement) {
    element.focus();
  }

  // List all non-disabled and registered focusables: those are eligible for keyboard navigation.
  function getFocusablesFrom(target: HTMLElement) {
    // function isElementRegistered(element: HTMLElement) {
    //   return navigationAPI.current?.isRegistered(element) ?? false;
    // }

    // function isElementDisabled(element: HTMLElement) {
    //   if (element instanceof HTMLButtonElement) {
    //     return element.disabled;
    //   }

    //   return false;
    // }

    return getAllFocusables(target);
    //return getAllFocusables(target).filter((el) => isElementRegistered(el) && !isElementDisabled(el));
  }

  //const { tabIndex } = useSingleTabStopNavigation(itemsRef.current[item.id]);

  return (
    <SingleTabStopNavigationProvider
      ref={navigationAPI}
      navigationActive={true}
      getNextFocusTarget={getNextFocusTarget}
      onUnregisterActive={onUnregisterActive}
    >
      <div
        role="menubar"
        className={clsx(styles.root, {
          [styles.vertical]: alignment === "vertical",
        })}
        aria-label={ariaLabel}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        ref={mergedRef}
      >
        {items.map((item, index) => {
          return (
            <button
              key={index}
              role="menuitem"
              onClick={(event) => handleClick(event, item.id)}
              {...getDataAttributes(rest)}
              className={clsx(styles["support-prompt"])}
              data-itemid={item.id}
              ref={(element) => (itemsRef.current[item.id] = element)}
              //tabIndex={tabIndex}
            >
              {item.text}
            </button>
          );
        })}
      </div>
    </SingleTabStopNavigationProvider>
  );
}

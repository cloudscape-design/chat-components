// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { forwardRef, Ref, useEffect, useImperativeHandle, useRef } from "react";
import clsx from "clsx";

import {
  circleIndex,
  getAllFocusables,
  handleKey,
  KeyCode,
  SingleTabStopNavigationAPI,
  SingleTabStopNavigationProvider,
  useMergeRefs,
  warnOnce,
} from "@cloudscape-design/component-toolkit/internal";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { InternalBaseComponentProps } from "../internal/base-component/use-base-component";
import { fireNonCancelableEvent } from "../internal/events";
import { getNextFocusTarget, onUnregisterActive } from "./focus-helpers";
import { SupportPromptGroupProps } from "./interfaces";
import { Prompt } from "./prompt";

import styles from "./styles.css.js";

export const InternalSupportPromptGroup = forwardRef(
  (
    {
      alignment = "vertical",
      onItemClick,
      items,
      __internalRootRef,
      ariaLabel,
      ...rest
    }: SupportPromptGroupProps & InternalBaseComponentProps,
    ref: Ref<SupportPromptGroupProps.Ref>,
  ) => {
    const focusedIdRef = useRef<null | string>(null);
    const navigationAPI = useRef<SingleTabStopNavigationAPI>(null);
    const containerObjectRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<Record<string, any | null>>({});

    const mergedRef = useMergeRefs(containerObjectRef, __internalRootRef);

    useImperativeHandle(ref, () => ({
      focus: (id) => {
        if (!itemsRef.current[id]) {
          warnOnce("SupportPromptGroup", "No matching ID found to focus.");
        }
        itemsRef.current[id]?.focus();
      },
    }));

    const handleClick = (event: React.MouseEvent, id: string) => {
      const { altKey, button, ctrlKey, metaKey, shiftKey } = event;

      fireNonCancelableEvent(onItemClick, { id, altKey, button, ctrlKey, metaKey, shiftKey });
    };

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
      const specialKeys = [
        KeyCode.right,
        KeyCode.left,
        KeyCode.up,
        KeyCode.down,
        KeyCode.end,
        KeyCode.home,
        KeyCode.pageUp,
        KeyCode.pageDown,
      ];

      const hasModifierKeys = (event: React.MouseEvent | React.KeyboardEvent) => {
        return event.ctrlKey || event.altKey || event.shiftKey || event.metaKey;
      };

      if (hasModifierKeys(event) || !specialKeys.includes(event.keyCode)) {
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
        onBlockStart: () => focusElement(focusables[circleIndex(activeIndex - 1, [0, focusables.length - 1])]),
        onBlockEnd: () => focusElement(focusables[circleIndex(activeIndex + 1, [0, focusables.length - 1])]),
      });
    }

    function focusElement(element: HTMLElement) {
      element.focus();
    }

    // List all non-disabled and registered focusables: those are eligible for keyboard navigation.
    function getFocusablesFrom(target: HTMLElement) {
      function isElementRegistered(element: HTMLElement) {
        return navigationAPI.current?.isRegistered(element) ?? false;
      }

      return getAllFocusables(target).filter((el) => isElementRegistered(el));
    }

    if (!items || items.length === 0) {
      return <div />;
    }

    return (
      <div
        {...getDataAttributes(rest)}
        role="menubar"
        className={clsx(styles.root, { [styles.vertical]: alignment !== "horizontal" })}
        aria-label={ariaLabel}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        ref={mergedRef}
      >
        <SingleTabStopNavigationProvider
          ref={navigationAPI}
          navigationActive={true}
          getNextFocusTarget={() => getNextFocusTarget(containerObjectRef, focusedIdRef)}
          onUnregisterActive={(element: HTMLElement) => onUnregisterActive(element, navigationAPI)}
        >
          {items.map((item, index) => {
            return (
              <Prompt
                key={index}
                onClick={(event) => handleClick(event, item.id)}
                id={item.id}
                ref={(element) => (itemsRef.current[item.id] = element)}
                iconName={item.iconName}
                iconSvg={item.iconSvg}
                iconPosition={item.iconPosition}
                iconVerticalAlignment={item.iconVerticalAlignment}
                ariaLabel={item.ariaLabel}
              >
                {item.text}
              </Prompt>
            );
          })}
        </SingleTabStopNavigationProvider>
      </div>
    );
  },
);

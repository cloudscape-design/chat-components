// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import styles from "./styles.css.js";

export function getNextFocusTarget(
  containerObjectRef: React.RefObject<HTMLDivElement>,
  focusedIdRef: React.MutableRefObject<string | null>,
): null | HTMLElement {
  if (containerObjectRef.current) {
    const buttons: HTMLButtonElement[] = Array.from(
      containerObjectRef?.current.querySelectorAll(`.${styles["support-prompt"]}`),
    );

    if (focusedIdRef.current) {
      const buttonWithId = buttons.find((button) => button.dataset.itemid === focusedIdRef.current);
      if (buttonWithId) {
        return buttonWithId;
      }
    }

    return buttons[0] ?? null;
  }
  return null;
}

export function onUnregisterActive(
  focusableElement: HTMLElement,
  navigationAPI: React.RefObject<{ getFocusTarget: () => HTMLElement | null }>,
) {
  const target = navigationAPI.current?.getFocusTarget();

  if (target && target.dataset.itemid !== focusableElement.dataset.itemid) {
    target.focus();
  }
}

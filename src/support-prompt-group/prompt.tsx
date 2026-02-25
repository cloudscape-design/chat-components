// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { forwardRef, Ref, useRef } from "react";
import clsx from "clsx";

import { useSingleTabStopNavigation } from "@cloudscape-design/component-toolkit/internal";
import Icon, { IconProps } from "@cloudscape-design/components/icon";

import useForwardFocus from "../internal/utils/use-forward-focus";

import styles from "./styles.css.js";

export interface PromptProps {
  children: string;
  id: string;
  onClick: (event: React.MouseEvent, id: string) => void;
  iconName?: IconProps.Name;
  iconSvg?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconVerticalAlignment?: "center" | "start" | "end";
  ariaLabel?: string;
}

export const Prompt = forwardRef(
  (
    {
      children,
      id,
      onClick,
      iconName,
      iconSvg,
      iconPosition = "left",
      iconVerticalAlignment = "start",
      ariaLabel,
    }: PromptProps,
    ref: Ref<HTMLButtonElement | null>,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    useForwardFocus(ref, buttonRef);

    const { tabIndex } = useSingleTabStopNavigation(buttonRef);

    // Helper function to conditionally render the icon
    // iconSvg takes precedence over iconName
    const renderIcon = () => {
      if (!iconSvg && !iconName) {
        return null;
      }

      return (
        <span className={clsx(styles["support-prompt-icon"], styles[`icon-align-${iconVerticalAlignment}`])}>
          <Icon name={iconName} svg={iconSvg} size="inherit" />
        </span>
      );
    };

    return (
      <button
        role="menuitem"
        tabIndex={tabIndex}
        ref={buttonRef}
        onClick={(event) => {
          onClick(event, id);
        }}
        id={id}
        data-testid={id}
        data-itemid={id}
        className={clsx(styles["support-prompt"])}
        aria-label={ariaLabel}
      >
        {iconPosition !== "right" && renderIcon()}
        <span className={styles["support-prompt-text"]}>{children}</span>
        {iconPosition === "right" && renderIcon()}
      </button>
    );
  },
);

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { forwardRef, Ref, useRef } from "react";
import clsx from "clsx";

import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import { useSingleTabStopNavigation } from "../internal/single-tab-stop";
import useForwardFocus from "../internal/utils/use-forward-focus";

import styles from "./styles.css.js";

export interface PromptProps {
  children: string;
  id: string;
  onClick: (event: React.MouseEvent, id: string) => void;
}

export const Prompt = forwardRef(
  ({ children, id, onClick, ...rest }: PromptProps, ref: Ref<HTMLButtonElement | null>) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    useForwardFocus(ref, buttonRef);

    const { tabIndex } = useSingleTabStopNavigation(buttonRef);

    return (
      <button
        {...getDataAttributes(rest)}
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
      >
        {children}
      </button>
    );
  },
);

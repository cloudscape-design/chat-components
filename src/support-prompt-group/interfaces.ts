// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ReactNode } from "react";

import { IconProps } from "@cloudscape-design/components/icon";

import { ClickDetail as _ClickDetail, NonCancelableEventHandler } from "../internal/events";

export interface SupportPromptGroupProps {
  /**
   * Alignment of the prompts. Defaults to `vertical`.
   **/
  alignment?: SupportPromptGroupProps.Alignment;

  /**
   * An array of objects representing support prompts.
   * Each item has the following properties:
   *   - text: The text of the support prompt.
   *   - content: The content of the support prompt, will be used instead of text when specified.
   *   - id: The ID of the support prompt.
   *   - iconName (optional): The name of a built-in icon to display.
   *   - iconSvg (optional): A custom SVG icon to display. Takes precedence over iconName.
   *   - iconPosition (optional): Position of the icon relative to text. Can be "left" (default) or "right".
   *   - iconVerticalAlignment (optional): Vertical alignment of the icon. Can be "center", "start" (default), or "end".
   *   - ariaLabel (optional): Custom accessible label for the prompt.
   **/
  items: ReadonlyArray<SupportPromptGroupProps.Item>;

  /**
   * Called when the user clicks on a support prompt. The event detail object contains the ID of the clicked item.
   */
  onItemClick: NonCancelableEventHandler<SupportPromptGroupProps.ItemClickDetail>;

  /**
   * Adds an aria label to the support prompt group.
   * Use this to provide a unique accessible name for each support prompt group on the page.
   */
  ariaLabel: string;
}

export namespace SupportPromptGroupProps {
  export type Alignment = "vertical" | "horizontal";

  export interface Item {
    text: string;
    content?: ReactNode;
    id: string;
    iconName?: IconProps.Name;
    iconSvg?: React.ReactNode;
    iconPosition?: "left" | "right";
    iconVerticalAlignment?: "center" | "start" | "end";
    ariaLabel?: string;
  }

  export interface ItemClickDetail extends _ClickDetail {
    id: string;
  }

  export interface Ref {
    /**
     * Focuses support prompt group item by ID.
     */
    focus(itemId: string): void;
  }
}

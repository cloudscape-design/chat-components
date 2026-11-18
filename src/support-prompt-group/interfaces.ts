// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ReactNode } from "react";

import { IconProps } from "@cloudscape-design/components/icon";

import { ClickDetail as _ClickDetail, NonCancelableEventHandler } from "../types/events";
import { StyleSlot } from "../types/utils";

export interface SupportPromptGroupProps {
  /**
   * Alignment of the prompts. Defaults to `vertical`.
   **/
  alignment?: SupportPromptGroupProps.Alignment;

  /**
   * An array of objects representing support prompts.
   * Each item has the following properties:
   *   - text: The text or ReactNode content of the support prompt.
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

  /**
   * CSS class names for the slots of the component that can be styled with the Style API.
   * Available slots: item.
   * Refer to the [style docs](/components/support-prompt-group/?tabId=style) for more details.
   * @awsuiSystem core
   */
  styleClassNames?: SupportPromptGroupProps.StyleClassNames;
}

export namespace SupportPromptGroupProps {
  export interface StyleClassNames {
    item?: StyleSlot<{ item: SupportPromptGroupProps.Item }>;
  }

  export type Alignment = "vertical" | "horizontal";

  export interface Item {
    text: ReactNode;
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

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ReactNode } from "react";

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
   *   - id: The ID of the support prompt.
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
    text: ReactNode;
    id: string;
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

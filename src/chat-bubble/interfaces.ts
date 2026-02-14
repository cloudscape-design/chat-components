// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export interface ChatBubbleProps {
  /** Avatar slot paired with the chat bubble content. Use [avatar](/components/avatar/). */
  avatar: React.ReactNode;

  /** Defines the type of the chat bubble and sets its color accordingly.  */
  type: ChatBubbleProps.Type;

  /** Content of the chat bubble */
  children: React.ReactNode;

  /** Actions slot of the chat bubble, placed at the footer. Use [button group](/components/button-group/). */
  actions?: React.ReactNode;

  /**
   * Adds a loading bar to the bottom of the chat bubble. This property should only be used for Generative AI loading state.
   * If avatar is being used, set its `loading` state to true.
   */
  showLoadingBar?: boolean;

  /**
   * Adds aria-label to the chat bubble container. Use this to provide a unique accessible name for each chat bubble on the page.
   * For example, "John Doe at 3:42:10am".
   */
  ariaLabel: string;

  /**
   * Hides the avatar while preserving its space.
   * Useful for when there are multiple consecutive messages coming from the same author.
   */
  hideAvatar?: boolean;

  /**
   * An object containing CSS properties to customize the chat bubble's visual appearance.
   * @awsuiSystem core
   */
  style?: ChatBubbleProps.Style;
}

export namespace ChatBubbleProps {
  export type Type = "incoming" | "outgoing";
  export interface Style {
    root?: {
      columnGap?: string;
    };
    bubble?: {
      background?: string;
      borderColor?: string;
      borderRadius?: string;
      borderWidth?: string;
      boxShadow?: string;
      color?: string;
      fontSize?: string;
      fontWeight?: string;
      rowGap?: string;
      paddingBlock?: string;
      paddingInline?: string;
    };
  }
}

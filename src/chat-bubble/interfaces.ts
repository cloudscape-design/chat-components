// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export interface ChatBubbleProps {
  /** Slot for avatar */
  avatar?: React.ReactNode;

  /** Determines the color of the chat bubble.  */
  color?: ChatBubbleProps.Color;

  /** Content of the chat bubble */
  children: React.ReactNode;

  /** Actions placed at the footer of the bubble. */
  actions?: React.ReactNode;

  /**
   * Adds a loading bar to the bottom of the chat bubble. This property should only be used for Generative AI loading state.
   * If avatar is being used, set its `loading` state to true.
   */
  showLoadingBar?: boolean;

  /** Adds aria-label to the chat bubble group. Use this to provide a unique accessible name for each chat bubble on the page. */
  ariaLabel: string;

  /**
   * Hides the avatar while preserving its space.
   * Useful for when there are multiple consecutive messages coming from the same author.
   */
  hideAvatar?: boolean;
}

export namespace ChatBubbleProps {
  export type Color = "low-contrast";
}

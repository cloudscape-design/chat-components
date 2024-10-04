// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export interface ChatBubbleProps {
  /** Avatar slot paired with the chat bubble. */
  avatar: React.ReactNode;

  /** Defines the type of the chat bubble and sets its color accordingly.  */
  type?: ChatBubbleProps.Type;

  /** Content of the chat bubble */
  children: React.ReactNode;

  /** Actions slot of chat bubble, placed at bottom left. */
  actions?: React.ReactNode;

  /**
   * Adds a loading bar to the bottom of the chat bubble. This property should only be used for Generative AI loading state.
   * If avatar is being used, set its `loading` state to true.
   */
  isGeneratingContent?: boolean;

  /** Adds aria-label to the chat bubble container. Use this to provide a unique accessible name for each chat bubble on the page. */
  ariaLabel: string;

  /**
   * Hides the avatar while preserving its space.
   * Useful for when there are multiple consecutive messages coming from the same author.
   */
  hideAvatar?: boolean;
}

export namespace ChatBubbleProps {
  export type Type = "sent" | "received";
}

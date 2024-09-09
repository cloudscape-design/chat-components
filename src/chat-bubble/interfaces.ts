// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export interface ChatBubbleProps {
  /** Props for the avatar of the chat bubble */
  avatar?: React.ReactNode;

  /** Background color of the chat bubble */
  backgroundColor?: ChatBubbleProps.BackgroundColor;

  /** Content of the chat bubble */
  children: React.ReactNode;

  /** Actions such as buttons placed at the footer of the bubble, should we call it footerActions? */
  inlineActions?: React.ReactNode;

  /**
   * Setting it true makes inline actions appear when chat bubble is hovered or focused.
   */
  showInlineActionsOnHover?: boolean;

  staggered?: boolean;

  /**
   * Adding for testing purposes
   */
  ariaRole?: string;
}

export namespace ChatBubbleProps {
  export type BackgroundColor = "grey" | "transparent" | "high-contrast";
}

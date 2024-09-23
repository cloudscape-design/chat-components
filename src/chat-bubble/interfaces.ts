// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export interface ChatBubbleProps {
  /** Props for the avatar of the chat bubble
   * Questions for API review:
   * - Why is avatar included in chat bubble?
   * - Why is it a slot?
   */
  avatar?: React.ReactNode;

  /** Background color of the chat bubble
   * Questions for API review:
   * - Why backgroundColor over having a variant and setting the color of bubble and avatar out of the box?
   * - - Chat bubble can be used in a chat experience where there are multiple authors and each author has a different colored chat bubble.
   */
  backgroundColor?: ChatBubbleProps.BackgroundColor;

  /** Content of the chat bubble */
  children?: React.ReactNode;

  /** Actions such as buttons placed at the footer of the bubble
   * Questions for API review:
   * - Maybe a different name for it?
   * - - footerActions?
   * - Why slot? It could be a part of the content rendered by customer?
   * - - Even though we'll suggest customers to use button-group for this slot, they may want to render a different kind of button or control.
   */
  inlineActions?: React.ReactNode;

  /**
   * Adds a loading bar to the bottom of the chat bubble. This property should only be used for Generative AI loading state.
   * If avatar is being used, set its `loading` state to true.
   * Make sure loading bar is paired with a loading text and announce the loading text using aria-live.
   */
  showLoadingBar?: boolean;

  /**
   * Adds aria-label to the chat bubble group. Use this to provide a unique accessible name for each chat bubble on the page.
   * For example, "Jane Doe, message {index}".
   */
  ariaLabel?: string;
}

export namespace ChatBubbleProps {
  export type BackgroundColor = "grey" | "transparent";
}

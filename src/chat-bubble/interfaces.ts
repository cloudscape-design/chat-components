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
   * - - It could be rendered by customer but this slot is always positioned at the footer of bubble, on the right side. Should we provide the option to render actions in different places e.g. top right?
   */
  inlineActions?: React.ReactNode;

  /**
   * Setting it true makes inline actions appear when chat bubble is hovered or focused.
   */
  showInlineActionsOnHover?: boolean;

  /**
   * Setting it true enables staggered view of chat bubble where avatar and bubble are aligned to the opposite side and bubble wraps the content instead of occupying the whole width.
   */
  staggered?: boolean;

  /**
   * Adding for testing purposes
   */
  ariaRole?: string;

  /**
   * Adding for testing purposes
   */
  focusHighlightContainer?: boolean;

  /**
   * Adding for testing purposes
   */
  focusHighlightBubble?: boolean;

  // /**
  //  * Text shown when chat bubble is loading
  //  * Need to add i18n? e.g. loading? generating? typing?
  //  */
  // loadingText?: string;

  // /**
  //  * When set to true, `loadingText` is shown.
  //  * If avatar is being used, set its `loading` state to true.
  //  */
  // loading?: boolean;

  // /**
  //  * Adds a loading bar to the bottom of the chat bubble with `loadingText`.
  //  * This property should only be used for Generative AI loading state.
  //  * If avatar is being used, set its `loading` state to true.
  //  */
  // loadingWithBar?: boolean;
}

export namespace ChatBubbleProps {
  export type BackgroundColor = "grey" | "transparent" | "high-contrast";
}

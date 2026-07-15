// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ChatBubbleProps } from "./interfaces";

/**
 * `ChatBubbleProps.Style` plus the internal `_borderStyle` escape hatch on `bubble`.
 * Consumers pass it by casting the `style` value to this type.
 */
export type ChatBubbleInternalStyle = ChatBubbleProps.Style & {
  bubble?: NonNullable<ChatBubbleProps.Style["bubble"]> & {
    /** CSS `border-style`. Defaults to `"solid"` when `borderWidth` is set and this is not. */
    _borderStyle?: string;
  };
};

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { SYSTEM } from "../internal/environment";
import { ChatBubbleProps } from "./interfaces";
import { ChatBubbleInternalStyle } from "./internal-interfaces";

export function getChatBubbleRootStyle(style: ChatBubbleProps.Style | undefined) {
  if (SYSTEM !== "core") {
    return {};
  }

  return {
    columnGap: style?.root?.columnGap,
  };
}

export function getBubbleStyle(style: ChatBubbleProps.Style | undefined) {
  if (SYSTEM !== "core") {
    return {};
  }

  // `_borderStyle`: internal escape hatch, not part of the public Style.
  const internalBubble = (style as ChatBubbleInternalStyle | undefined)?.bubble;

  return {
    background: style?.bubble?.background,
    borderColor: style?.bubble?.borderColor,
    borderRadius: style?.bubble?.borderRadius,
    borderStyle: internalBubble?._borderStyle ?? (style?.bubble?.borderWidth ? "solid" : undefined),
    borderWidth: style?.bubble?.borderWidth,
    boxShadow: style?.bubble?.boxShadow,
    color: style?.bubble?.color,
    fontFamily: style?.bubble?.fontFamily,
    fontSize: style?.bubble?.fontSize,
    fontWeight: style?.bubble?.fontWeight,
    letterSpacing: style?.bubble?.letterSpacing,
    paddingBlock: style?.bubble?.paddingBlock,
    paddingInline: style?.bubble?.paddingInline,
    rowGap: style?.bubble?.rowGap,
  };
}

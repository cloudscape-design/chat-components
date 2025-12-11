// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { SYSTEM } from "../internal/environment";
import { ChatBubbleProps } from "./interfaces";

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

  return {
    background: style?.bubble?.background,
    borderColor: style?.bubble?.borderColor,
    borderRadius: style?.bubble?.borderRadius,
    borderStyle: style?.bubble?.borderWidth ? "solid" : undefined,
    borderWidth: style?.bubble?.borderWidth,
    boxShadow: style?.bubble?.boxShadow,
    color: style?.bubble?.color,
    fontSize: style?.bubble?.fontSize,
    fontWeight: style?.bubble?.fontWeight,
    paddingBlock: style?.bubble?.paddingBlock,
    paddingInline: style?.bubble?.paddingInline,
    rowGap: style?.bubble?.rowGap,
  };
}

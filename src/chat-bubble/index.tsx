// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
"use client";
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import { ChatBubbleProps } from "./interfaces";
import InternalChatBubble from "./internal";

export type { ChatBubbleProps };

export default function ChatBubble({
  type,
  hideAvatar,
  showLoadingBar,
  stretch,
  align = "start",
  ...props
}: ChatBubbleProps) {
  const baseComponentProps = useBaseComponent("ChatBubble", {
    props: { type, stretch, align },
  });
  return (
    <InternalChatBubble
      type={type}
      hideAvatar={hideAvatar}
      showLoadingBar={showLoadingBar}
      stretch={stretch}
      align={align}
      {...props}
      {...baseComponentProps}
    />
  );
}
applyDisplayName(ChatBubble, "ChatBubble");

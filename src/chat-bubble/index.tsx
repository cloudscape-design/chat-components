// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import { ChatBubbleProps } from "./interfaces";
import InternalChatBubble from "./internal";

export type { ChatBubbleProps };

export default function ChatBubble({
  backgroundColor = "transparent",
  showInlineActionsOnHover = false,
  ...props
}: ChatBubbleProps) {
  const baseComponentProps = useBaseComponent("ChatBubble", { props: { backgroundColor, showInlineActionsOnHover } });
  return (
    <InternalChatBubble
      backgroundColor={backgroundColor}
      showInlineActionsOnHover={showInlineActionsOnHover}
      {...props}
      {...baseComponentProps}
    />
  );
}
applyDisplayName(ChatBubble, "ChatBubble");

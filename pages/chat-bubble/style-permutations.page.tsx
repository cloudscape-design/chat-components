// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { createPermutations, PermutationsView } from "@cloudscape-design/build-tools/dev-pages-utils";

import { ChatBubble, ChatBubbleProps } from "../../lib/components";
import { ChatBubbleAvatarGenAI, ChatBubbleAvatarUser } from "./util-components";

const style1 = {
  root: {
    columnGap: "32px",
  },
  bubble: {
    borderColor: "#f59e0b",
    borderWidth: "2px",
    borderRadius: "16px",
    backgroundColor: "#fde68a",
    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.15)",
    color: "#78350f",
  },
};

const style2 = {
  bubble: {
    background: "light-dark(#f0f8ff, #1a1a2e)",
    color: "light-dark(#333, #eee)",
    borderColor: "light-dark(#e74c3c, #ff6b6b)",
    borderWidth: "2px",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
    fontSize: "16px",
    fontWeight: "bold",
    paddingBlock: "20px",
    paddingInline: "24px",
  },
};

const permutations = createPermutations<ChatBubbleProps>([
  {
    type: ["incoming", "outgoing"],
    avatar: [<ChatBubbleAvatarGenAI key="genai" />, <ChatBubbleAvatarUser key="user" />],
    ariaLabel: ["Chat bubble permutation"],
    children: ["This is a test message", "A longer test message with more content to see how styles affect layout"],
    showLoadingBar: [undefined, true],
    hideAvatar: [undefined, true],
    style: [undefined, style1, style2],
  },
]);

export default function ChatBubbleStylePermutations() {
  return (
    <>
      <h1>ChatBubble Style permutations</h1>
      <div>
        <PermutationsView
          permutations={permutations}
          render={(permutation: ChatBubbleProps) => <ChatBubble {...permutation} />}
        />
      </div>
    </>
  );
}

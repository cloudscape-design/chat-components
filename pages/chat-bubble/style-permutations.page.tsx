// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { createPermutations, PermutationsView } from "@cloudscape-design/build-tools/lib/dev-pages-utils";

import { ChatBubble, ChatBubbleProps } from "../../lib/components";
import { Page } from "../app/templates";
import { Actions, ChatBubbleAvatarGenAI, ChatBubbleAvatarUser, ChatContainer } from "./util-components";

const styles = [
  {
    bubble: { borderColor: "light-dark(#e74c3c, #ff6b6b)", borderWidth: "2px", borderRadius: "20px" },
  },
  { bubble: { fontSize: "18px", fontWeight: "bold", color: "light-dark(#8e44ad, #bb86fc)" } },
  { bubble: { boxShadow: "10px 5px 5px red" } },
  {
    bubble: {
      background: "light-dark(#fff3cd, #3d3d00)",
      borderColor: "light-dark(#ffc107, #ffeb3b)",
      borderWidth: "1px",
    },
  },
  { bubble: { background: "light-dark(#e8f5e8, #1b2e1b)", borderRadius: "18px", rowGap: "25px" } },
  {
    root: {
      columnGap: "25px",
    },
    bubble: {
      background: "light-dark(#ffffff, #2d2d2d)",
      color: "light-dark(#1b5e20, #81c784)",
      borderColor: "light-dark(#4caf50, #66bb6a)",
      borderWidth: "2px",
      borderRadius: "24px",
      boxShadow: "0 4px 12px rgb(29, 130, 118)",
      fontSize: "16px",
      fontWeight: "bold",
      paddingBlock: "20px",
      paddingInline: "30px",
      rowGap: "20px",
    },
  },
];

const permutations = createPermutations<ChatBubbleProps>([
  {
    type: ["incoming"],
    avatar: [<ChatBubbleAvatarGenAI key="genai" />],
    ariaLabel: ["Chat bubble permutation"],
    children: ["Response coming from AI"],
    showLoadingBar: [false, true],
    actions: [<Actions key="action" />],
    hideAvatar: [false],
    style: styles,
  },
  {
    type: ["outgoing"],
    avatar: [<ChatBubbleAvatarUser key="user" />],
    ariaLabel: ["Chat bubble permutation"],
    children: ["A message sent from the user"],
    showLoadingBar: [false],
    hideAvatar: [false],
    style: styles,
  },
]);

export default function ChatBubbleStylePermutations() {
  return (
    <Page title="Chat bubble">
      <ChatContainer>
        <PermutationsView
          permutations={permutations}
          render={(permutation: ChatBubbleProps) => (
            <div style={{ padding: "20px" }}>
              <ChatBubble {...permutation} />
            </div>
          )}
        />
      </ChatContainer>
    </Page>
  );
}

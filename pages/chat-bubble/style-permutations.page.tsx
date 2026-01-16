// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { createPermutations, PermutationsView } from "@cloudscape-design/build-tools/lib/dev-pages-utils";

import { ChatBubble, ChatBubbleProps } from "../../lib/components";
import { Page } from "../app/templates";
import { TestBed } from "../app/test-bed";
import { ChatBubbleAvatarGenAI, ChatBubbleAvatarUser, ChatContainer } from "./util-components";

const style1 = {
  root: {
    columnGap: "32px",
  },
  bubble: {
    borderColor: "light-dark(#e74c3c, #ff6b6b)",
    borderWidth: "2px",
    color: "light-dark(#333, #eee)",
    borderRadius: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

const style2 = {
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
};

const permutations = createPermutations<ChatBubbleProps>([
  {
    type: ["incoming"],
    avatar: [<ChatBubbleAvatarGenAI key="genai" />],
    ariaLabel: ["Chat bubble permutation"],
    children: ["Response coming from AI"],
    showLoadingBar: [false, true],
    hideAvatar: [false],
    style: [style1, style2],
  },
  {
    type: ["outgoing"],
    avatar: [<ChatBubbleAvatarUser key="user" />],
    ariaLabel: ["Chat bubble permutation"],
    children: ["A message sent from the user"],
    showLoadingBar: [false],
    hideAvatar: [false],
    style: [style1, style2],
  },
]);

export default function ChatBubbleStylePermutations() {
  return (
    <>
      <Page title="Chat bubble">
        <TestBed>
          <ChatContainer>
            <PermutationsView
              permutations={permutations}
              render={(permutation: ChatBubbleProps) => <ChatBubble {...permutation} />}
            />
          </ChatContainer>
        </TestBed>
      </Page>
    </>
  );
}

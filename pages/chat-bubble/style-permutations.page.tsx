// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import Box from "@cloudscape-design/components/box";

import { ChatBubble } from "../../lib/components";
import { Page } from "../app/templates";
import { TestBed } from "../app/test-bed";
import { Actions, ChatBubbleAvatarGenAI, ChatBubbleAvatarUser, ChatContainer } from "./util-components";

export default function ChatBubblePage() {
  return (
    <Page title="Chat bubble">
      <TestBed>
        <ChatContainer>
          {/* Background Color with Dark Mode */}
          <ChatBubble
            style={{ bubble: { background: "light-dark(#f0f8ff, #1a1a2e)", color: "light-dark(#333, #eee)" } }}
            type="incoming"
            avatar={<ChatBubbleAvatarGenAI />}
            ariaLabel="Background test"
          >
            Light blue/dark purple background with adaptive text color
          </ChatBubble>

          {/* Border Styles with Dark Mode */}
          <ChatBubble
            style={{
              bubble: { borderColor: "light-dark(#e74c3c, #ff6b6b)", borderWidth: "2px", borderRadius: "20px" },
            }}
            type="outgoing"
            avatar={<ChatBubbleAvatarUser />}
            ariaLabel="Border test"
          >
            Adaptive red border with rounded corners
          </ChatBubble>

          {/* Typography with Dark Mode */}
          <ChatBubble
            style={{ bubble: { fontSize: "18px", fontWeight: "bold", color: "light-dark(#8e44ad, #bb86fc)" } }}
            type="incoming"
            avatar={<ChatBubbleAvatarGenAI />}
            ariaLabel="Typography test"
          >
            Large bold adaptive purple text
          </ChatBubble>

          {/* Shadow Effect with Dark Mode */}
          <ChatBubble
            style={{
              bubble: { boxShadow: "10px 5px 5px red" },
            }}
            type="outgoing"
            avatar={<ChatBubbleAvatarUser />}
            ariaLabel="Shadow test"
          >
            Adaptive shadow for elevation
          </ChatBubble>

          {/* Spacing */}
          <ChatBubble
            style={{ root: { columnGap: "32px" }, bubble: { paddingBlock: "20px", paddingInline: "24px" } }}
            type="incoming"
            avatar={<ChatBubbleAvatarGenAI />}
            ariaLabel="Spacing test"
          >
            Wide avatar spacing with generous padding
          </ChatBubble>

          {/* Loading State with Dark Mode */}
          <ChatBubble
            style={{
              bubble: {
                background: "light-dark(#fff3cd, #3d3d00)",
                borderColor: "light-dark(#ffc107, #ffeb3b)",
                borderWidth: "1px",
              },
            }}
            avatar={<ChatBubbleAvatarGenAI loading={true} />}
            type="incoming"
            showLoadingBar={true}
            ariaLabel="Loading test"
          >
            <Box color="text-body-secondary">Generating response...</Box>
          </ChatBubble>

          {/* With Actions and Dark Mode */}
          <ChatBubble
            style={{ bubble: { background: "light-dark(#e8f5e8, #1b2e1b)", borderRadius: "18px", rowGap: "25px" } }}
            avatar={<ChatBubbleAvatarGenAI />}
            type="incoming"
            actions={<Actions />}
            ariaLabel="Actions test"
          >
            Message with action buttons
          </ChatBubble>

          {/* All Properties Combined with Dark Mode */}
          <ChatBubble
            style={{
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
            }}
            type="outgoing"
            avatar={<ChatBubbleAvatarUser />}
            actions={<Actions />}
            ariaLabel="All properties test"
            showLoadingBar={true}
          >
            All style properties combined
          </ChatBubble>
        </ChatContainer>
      </TestBed>
    </Page>
  );
}

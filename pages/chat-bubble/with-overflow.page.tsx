// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import CodeView from "@cloudscape-design/code-view/code-view";

import { ChatBubble } from "../../lib/components";
import { Page } from "../app/templates";
import { TestBed } from "../app/test-bed";
import smiley from "../avatar/smiley.png";
import { ChatBubbleAvatarGenAI, ChatContainer } from "./util-components";

export default function ChatBubbleWithOverflowPage() {
  return (
    <Page
      title="Chat bubble with overflowing content"
      subtitle="These chat bubbles have content that is wider than the available space. The chat bubbles should render a scroll
        bar."
    >
      <TestBed>
        <ChatContainer>
          <ChatBubble type="incoming" avatar={<ChatBubbleAvatarGenAI />} ariaLabel="Gen AI at 4:24:25pm">
            This is a regular chat bubble with small content.
          </ChatBubble>

          <ChatBubble type="incoming" avatar={<ChatBubbleAvatarGenAI />} ariaLabel="Gen AI at 4:24:25pm">
            This chat bubble contains some code.
            <CodeView content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
          </ChatBubble>

          <ChatBubble type="incoming" avatar={<ChatBubbleAvatarGenAI />} ariaLabel="Gen AI at 4:24:26pm">
            This chat bubble contains an image.
            <img src={smiley} width={3000} height={200} />
          </ChatBubble>
        </ChatContainer>
      </TestBed>
    </Page>
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useState } from "react";

import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";

import ChatBubble from "../../lib/components/chat-bubble";
import { Page } from "../app/templates";
import { Actions, ChatBubbleAvatarGenAI, ChatBubbleAvatarUser, ChatContainer } from "./util-components";

const firstBubbleTimestamp = new Date().toLocaleTimeString();

export default function ChatBubblesWithUpdates() {
  const [bubbleTimestamps, setBubbleTimestamps] = useState<Array<string>>([]);
  const [defaultChatBubbleUpdateCount, setDefaultChatBubbleUpdateCount] = useState(0);

  return (
    <Page title="With updates">
      <SpaceBetween size="m">
        <SpaceBetween direction="horizontal" size="xs">
          <Button onClick={() => setDefaultChatBubbleUpdateCount(defaultChatBubbleUpdateCount + 1)}>
            Update first chat bubble
          </Button>
          <Button onClick={() => setBubbleTimestamps([new Date().toLocaleTimeString(), ...bubbleTimestamps])}>
            Add new chat bubble
          </Button>
        </SpaceBetween>

        <ChatContainer>
          <ChatBubble type="outgoing" ariaLabel={firstBubbleTimestamp} avatar={<ChatBubbleAvatarUser />}>
            Bubble updated {defaultChatBubbleUpdateCount} times
          </ChatBubble>
          {bubbleTimestamps.map((timestamp: string, index: number) => {
            const isGenAi = index % 2 === 0;

            return (
              <ChatBubble
                key={timestamp + index}
                ariaLabel={`${isGenAi ? "Gen AI assistant" : "Jane Doe"} at ${timestamp}`}
                type={isGenAi ? "incoming" : "outgoing"}
                avatar={isGenAi ? <ChatBubbleAvatarGenAI /> : <ChatBubbleAvatarUser />}
                actions={isGenAi ? <Actions /> : undefined}
              >
                Chat bubble number {index + 1}
              </ChatBubble>
            );
          })}
        </ChatContainer>
      </SpaceBetween>
    </Page>
  );
}

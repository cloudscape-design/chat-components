// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useState } from "react";

import Button from "@cloudscape-design/components/button";

import ChatBubble from "../../lib/components/chat-bubble";
import { Actions, ChatBubbleAvatarGenAI, ChatBubbleAvatarUser, ChatContainer } from "./util-components";

export default function ChatBubblesWithUpdates() {
  const [bubbleTimestamps, setBubbleTimestamps] = useState<Array<string>>([]);
  const [defaultChatBubbleUpdateCount, setDefaultChatBubbleUpdateCount] = useState(0);

  return (
    <>
      <h1> With updates</h1>

      <Button onClick={() => setDefaultChatBubbleUpdateCount(defaultChatBubbleUpdateCount + 1)}>
        Update first chat bubble
      </Button>
      <Button onClick={() => setBubbleTimestamps([new Date().toLocaleTimeString(), ...bubbleTimestamps])}>
        Add new chat bubble
      </Button>

      <ChatContainer>
        <ChatBubble type="outgoing" avatar={<ChatBubbleAvatarUser />}>
          Bubble updated {defaultChatBubbleUpdateCount} times
        </ChatBubble>
        {bubbleTimestamps.map((timestamp: string, index: number) => {
          const isGenAi = index % 2 === 0;

          return (
            <ChatBubble
              key={timestamp + index}
              type={isGenAi ? "incoming" : "outgoing"}
              avatar={isGenAi ? <ChatBubbleAvatarGenAI /> : <ChatBubbleAvatarUser />}
              actions={isGenAi ? <Actions /> : undefined}
            >
              Chat bubble number {index + 1}
            </ChatBubble>
          );
        })}
      </ChatContainer>
    </>
  );
}

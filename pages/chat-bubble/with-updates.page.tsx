// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useState } from "react";

import Button from "@cloudscape-design/components/button";

import ChatBubble from "../../lib/components/chat-bubble";
import { Actions, ChatBubbleAvatarGenAI, ChatBubbleAvatarUser, ChatContainer } from "./util-components";

const firstBubbleTimestamp = new Date().toLocaleTimeString();

export default function ChatBubblesWithUpdates() {
  const [bubbleAriaLabels, setBubbleAriaLabels] = useState<Array<string>>([]);
  const [defaultChatBubbleUpdateCount, setDefaultChatBubbleUpdateCount] = useState(0);

  return (
    <>
      <h1> With updates</h1>

      <Button onClick={() => setDefaultChatBubbleUpdateCount(defaultChatBubbleUpdateCount + 1)}>
        Update first chat bubble
      </Button>
      <Button onClick={() => setBubbleAriaLabels([...bubbleAriaLabels, new Date().toLocaleTimeString()])}>
        Add new chat bubble
      </Button>

      <ChatContainer>
        <ChatBubble type="outgoing" ariaLabel={firstBubbleTimestamp} avatar={<ChatBubbleAvatarUser />}>
          Bubble updated {defaultChatBubbleUpdateCount} times
        </ChatBubble>

        {bubbleAriaLabels.map((ariaLabel: string, index: number) => {
          const isGenAi = index % 2 === 0;

          return (
            <ChatBubble
              key={ariaLabel + index}
              ariaLabel={ariaLabel}
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

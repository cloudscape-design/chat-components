// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Box from "@cloudscape-design/components/box";

import { ChatBubble } from "../../lib/components";
import {
  Actions,
  ChatBubbleAvatarGenAI,
  ChatBubbleAvatarUser,
  ChatContainer,
  longText,
  Sources,
} from "./util-components";

// General guideline; beware of the background color of chat bubble or specific guideline for specific components

// Check API of board component
// We can implement board component like API for chat demo and in the future we can use it to convert it to a component and migration would be seamless

// Simple keyboard navigation in chat is using arrow keys to navigate from a bubble to another (keyboard navigation inside chat bubble with overrides is the tricky one)
// If simple keyboard navigation is not yet implemented in chat demo or component, and customer wants to use it, we can expose onFocus and onBlur callbacks to chat bubble (with customer request)

export default function ChatBubblePage() {
  const colorGenAI = "low-contrast";

  return (
    <>
      <h1>Chat bubble</h1>

      <ChatContainer>
        <ChatBubble avatar={<ChatBubbleAvatarUser />} ariaLabel="User message 1">
          What can I do with Amazon S3?
        </ChatBubble>
        <ChatBubble avatar={<ChatBubbleAvatarGenAI />} color={colorGenAI} ariaLabel="Gen AI message 2">
          Amazon S3 provides a simple web service interface that you can use to store and retrieve any amount of data,
          at any time, from anywhere.
        </ChatBubble>

        <ChatBubble avatar={<ChatBubbleAvatarUser />} ariaLabel="User message 3">
          How can I create configurations?
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          color={colorGenAI}
          actions={<Actions />}
          ariaLabel="Gen AI message 4"
        >
          Next, follow these steps:
          <ol>
            <li>In the Buckets list, choose the name of the bucket that you want.</li>
            <li>Choose Properties.</li>
            <li>Navigate to S3.</li>
          </ol>
          <Sources />
        </ChatBubble>

        <ChatBubble avatar={<ChatBubbleAvatarUser />} ariaLabel="User message 5">
          List my S3 buckets.
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI loading={true} />}
          color={colorGenAI}
          showLoadingBar={true}
          ariaLabel="Gen AI message 6"
        >
          <div>
            <Box color="text-body-secondary">Generating a response</Box>
          </div>
        </ChatBubble>

        <ChatBubble avatar={<ChatBubbleAvatarUser />} ariaLabel="User message 7">
          Long text. {longText}
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          color={colorGenAI}
          actions={<Actions />}
          ariaLabel="Gen AI message 8"
        >
          Short answer
        </ChatBubble>
        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          color={colorGenAI}
          actions={<Actions />}
          ariaLabel="Gen AI message 9"
          hideAvatar={true}
        >
          Double text
        </ChatBubble>
      </ChatContainer>
    </>
  );
}

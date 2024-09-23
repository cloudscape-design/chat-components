// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Alert from "@cloudscape-design/components/alert";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { ChatBubble } from "../../lib/components";
import {
  ChatBubbleAvatarGenAI,
  ChatBubbleAvatarUser,
  ChatContainer,
  InlineActions,
  longText,
  Sources,
} from "./util-components";

// General guideline; beware of the background color of chat bubble or specific guideline for specific components

// Check API of board component
// We can implement board component like API for chat demo and in the future we can use it to convert it to a component and migration would be seamless

// Simple keyboard navigation in chat is using arrow keys to navigate from a bubble to another (keyboard navigation inside chat bubble with overrides is the tricky one)
// If simple keyboard navigation is not yet implemented in chat demo or component, and customer wants to use it, we can expose onFocus and onBlur callbacks to chat bubble (with customer request)

export default function ChatBubblePage() {
  const userChatBubbleBackgroundColor = "transparent";
  const backgroundColorGenAI = "grey";

  return (
    <>
      <h1>Chat bubble</h1>

      <ChatContainer>
        <ChatBubble
          avatar={<ChatBubbleAvatarUser />}
          backgroundColor={userChatBubbleBackgroundColor}
          ariaLabel="User message 1"
        >
          What can I do with Amazon S3?
        </ChatBubble>
        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          backgroundColor="grey"
          inlineActions={<InlineActions />}
          ariaLabel="Gen AI message 2"
        >
          Amazon S3 provides a simple web service interface that you can use to store and retrieve any amount of data,
          at any time, from anywhere.
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarUser initials="JD" tooltipText="Jane Doe" ariaLabel="Jane Doe" />}
          backgroundColor={userChatBubbleBackgroundColor}
          ariaLabel="User message 3"
        >
          How can I create configurations?
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI tooltipText="Gen-AI assistant" />}
          backgroundColor={backgroundColorGenAI}
          inlineActions={<InlineActions />}
          ariaLabel="Gen AI message 4"
        >
          <SpaceBetween size="s">
            <span>
              Next, follow these steps:
              <ol>
                <li>In the Buckets list, choose the name of the bucket that you want.</li>
                <li>Choose Properties.</li>
                <li>Navigate to S3.</li>
              </ol>
            </span>

            <Sources />
          </SpaceBetween>
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarUser />}
          backgroundColor={userChatBubbleBackgroundColor}
          ariaLabel="User message 5"
        >
          <span>List all the accounts in the organization.</span>
        </ChatBubble>
        <Alert statusIconAriaLabel="Error" type="error" header="Access denied">
          You don&apos;t have permissions to [AWSOrganizations:ListAccounts]. To request access, contact your AWS
          administrator.
        </Alert>

        <ChatBubble
          avatar={<ChatBubbleAvatarUser />}
          backgroundColor={userChatBubbleBackgroundColor}
          ariaLabel="User message 6"
        >
          List my S3 buckets.
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI loading={true} />}
          backgroundColor={backgroundColorGenAI}
          showLoadingBar={true}
          ariaLabel="Gen AI message 7"
        >
          <div>
            <Box color="text-body-secondary">Generating a response</Box>
          </div>
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI loading={true} />}
          backgroundColor={backgroundColorGenAI}
          inlineActions={<InlineActions />}
          showLoadingBar={true}
          ariaLabel="Gen AI message 8"
        >
          <div>
            <Box color="text-body-secondary">Generating a response, with inline actions</Box>
          </div>
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarUser />}
          backgroundColor={userChatBubbleBackgroundColor}
          ariaLabel="User message 9"
        >
          Long text. {longText}
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          backgroundColor={backgroundColorGenAI}
          inlineActions={<InlineActions />}
          ariaLabel="Gen AI message 10"
        >
          Short answer
        </ChatBubble>
      </ChatContainer>
    </>
  );
}

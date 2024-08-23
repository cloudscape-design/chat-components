// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useState } from "react";

import Alert from "@cloudscape-design/components/alert";
import Box from "@cloudscape-design/components/box";
import Checkbox from "@cloudscape-design/components/checkbox";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { ChatBubble, LoadingBar } from "../../lib/components";
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
  const [inlineActionsOnHover, setInlineActionsOnHover] = useState(false);
  const [staggeredUserBubble, setStaggeredUserBubble] = useState(false);
  const [highConstrastUserBubble, setHighContrastUserBubble] = useState(false);
  const [withoutUserAvatar, setWithoutUserAvatar] = useState(false);

  const userChatBubbleBackgroundColor = highConstrastUserBubble ? "high-contrast" : "transparent";

  return (
    <>
      <h1>Chat bubble</h1>

      <Box margin={{ bottom: "m" }}>
        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Gen-AI bubble settings</Box>
          <Checkbox checked={inlineActionsOnHover} onChange={({ detail }) => setInlineActionsOnHover(detail.checked)}>
            Show inline actions on hover
          </Checkbox>

          <Box variant="awsui-key-label">User bubble settings</Box>

          <Checkbox checked={staggeredUserBubble} onChange={({ detail }) => setStaggeredUserBubble(detail.checked)}>
            Staggered
          </Checkbox>

          <Checkbox
            checked={highConstrastUserBubble}
            onChange={({ detail }) => setHighContrastUserBubble(detail.checked)}
          >
            High contrast
          </Checkbox>

          <Checkbox checked={withoutUserAvatar} onChange={({ detail }) => setWithoutUserAvatar(detail.checked)}>
            Without avatar
          </Checkbox>
        </SpaceBetween>
      </Box>

      <ChatContainer>
        <ChatBubble
          avatar={!withoutUserAvatar && <ChatBubbleAvatarUser />}
          backgroundColor={userChatBubbleBackgroundColor}
          staggered={staggeredUserBubble}
        >
          What can I do with Amazon S3?
        </ChatBubble>
        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          backgroundColor="grey"
          inlineActions={<InlineActions />}
          showInlineActionsOnHover={inlineActionsOnHover}
        >
          Amazon S3 provides a simple web service interface that you can use to store and retrieve any amount of data,
          at any time, from anywhere.
        </ChatBubble>

        <ChatBubble
          avatar={!withoutUserAvatar && <ChatBubbleAvatarUser initials="JD" tooltipText="Jane Doe" />}
          backgroundColor={userChatBubbleBackgroundColor}
          staggered={staggeredUserBubble}
        >
          How can I create configurations?
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI tooltipText="Gen-AI assistant" />}
          backgroundColor="grey"
          inlineActions={<InlineActions />}
          showInlineActionsOnHover={inlineActionsOnHover}
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
          avatar={!withoutUserAvatar && <ChatBubbleAvatarUser />}
          backgroundColor={userChatBubbleBackgroundColor}
          staggered={staggeredUserBubble}
        >
          <span>List all the accounts in the organization.</span>
        </ChatBubble>
        <Alert statusIconAriaLabel="Error" type="error" header="Access denied">
          You don&apos;t have permissions to [AWSOrganizations:ListAccounts]. To request access, contact your AWS
          administrator.
        </Alert>

        <ChatBubble
          avatar={!withoutUserAvatar && <ChatBubbleAvatarUser />}
          backgroundColor={userChatBubbleBackgroundColor}
          staggered={staggeredUserBubble}
        >
          List my S3 buckets.
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          backgroundColor="grey"
          inlineActions={<InlineActions />}
          showInlineActionsOnHover={inlineActionsOnHover}
        >
          <div>
            <Box margin={{ bottom: "xs", left: "l" }} color="text-body-secondary">
              Generating a response
            </Box>
            <LoadingBar variant="gen-ai" />
          </div>
        </ChatBubble>

        <ChatBubble
          avatar={!withoutUserAvatar && <ChatBubbleAvatarUser />}
          backgroundColor={userChatBubbleBackgroundColor}
          staggered={staggeredUserBubble}
        >
          Long text. {longText}
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          backgroundColor="grey"
          inlineActions={<InlineActions />}
          showInlineActionsOnHover={inlineActionsOnHover}
        >
          Short answer
        </ChatBubble>
      </ChatContainer>
    </>
  );
}

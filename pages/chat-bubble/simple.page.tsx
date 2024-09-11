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
  const [logAriaRole, setLogAriaRole] = useState("");
  const [focusHighlightContainer, setFocusHighlightContainer] = useState(false);
  const [focusHighlightBubble, setFocusHighlightBubble] = useState(true);
  const [inlineActionsOnHover, setInlineActionsOnHover] = useState(false);
  const [staggeredUserBubble, setStaggeredUserBubble] = useState(false);
  const [highConstrastUserBubble, setHighContrastUserBubble] = useState(false);
  const [withoutUserAvatar, setWithoutUserAvatar] = useState(false);

  const userChatBubbleBackgroundColor = highConstrastUserBubble ? "high-contrast" : "transparent";
  const backgroundColorGenAI = "grey";

  return (
    <>
      <h1>Chat bubble</h1>

      <Box margin={{ bottom: "m" }}>
        <SpaceBetween size="s">
          <Box variant="awsui-key-label">Accessibility settings</Box>
          <Checkbox checked={!!logAriaRole} onChange={({ detail }) => setLogAriaRole(detail.checked ? "log" : "")}>
            Use aria-role `log`
          </Checkbox>

          <Checkbox
            checked={focusHighlightContainer}
            onChange={({ detail }) => setFocusHighlightContainer(detail.checked)}
          >
            Focusable container (avatar + bubble)
          </Checkbox>
          <Checkbox checked={focusHighlightBubble} onChange={({ detail }) => setFocusHighlightBubble(detail.checked)}>
            Focusable bubble
          </Checkbox>

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
          ariaRole={logAriaRole}
          focusHighlightContainer={focusHighlightContainer}
          focusHighlightBubble={focusHighlightBubble}
        >
          What can I do with Amazon S3?
        </ChatBubble>
        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          backgroundColor="grey"
          inlineActions={<InlineActions />}
          showInlineActionsOnHover={inlineActionsOnHover}
          ariaRole={logAriaRole}
          focusHighlightContainer={focusHighlightContainer}
          focusHighlightBubble={focusHighlightBubble}
        >
          Amazon S3 provides a simple web service interface that you can use to store and retrieve any amount of data,
          at any time, from anywhere.
        </ChatBubble>

        <ChatBubble
          avatar={
            !withoutUserAvatar && <ChatBubbleAvatarUser initials="JD" tooltipText="Jane Doe" ariaLabel="Jane Doe" />
          }
          backgroundColor={userChatBubbleBackgroundColor}
          staggered={staggeredUserBubble}
          ariaRole={logAriaRole}
          focusHighlightContainer={focusHighlightContainer}
          focusHighlightBubble={focusHighlightBubble}
        >
          How can I create configurations?
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI tooltipText="Gen-AI assistant" />}
          backgroundColor={backgroundColorGenAI}
          inlineActions={<InlineActions />}
          showInlineActionsOnHover={inlineActionsOnHover}
          ariaRole={logAriaRole}
          focusHighlightContainer={focusHighlightContainer}
          focusHighlightBubble={focusHighlightBubble}
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
          ariaRole={logAriaRole}
          focusHighlightContainer={focusHighlightContainer}
          focusHighlightBubble={focusHighlightBubble}
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
          ariaRole={logAriaRole}
          focusHighlightContainer={focusHighlightContainer}
          focusHighlightBubble={focusHighlightBubble}
        >
          List my S3 buckets.
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI loading={true} />}
          backgroundColor={backgroundColorGenAI}
          inlineActions={<InlineActions />}
          showInlineActionsOnHover={inlineActionsOnHover}
          ariaRole={logAriaRole}
          focusHighlightContainer={focusHighlightContainer}
          focusHighlightBubble={focusHighlightBubble}
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
          ariaRole={logAriaRole}
          focusHighlightContainer={focusHighlightContainer}
          focusHighlightBubble={focusHighlightBubble}
        >
          Long text. {longText}
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          backgroundColor={backgroundColorGenAI}
          inlineActions={<InlineActions />}
          showInlineActionsOnHover={inlineActionsOnHover}
          ariaRole={logAriaRole}
          focusHighlightContainer={focusHighlightContainer}
          focusHighlightBubble={focusHighlightBubble}
        >
          Short answer
        </ChatBubble>
        {/* <ChatBubble avatar={<ChatBubbleAvatarGenAI loading={true} />} backgroundColor={backgroundColorGenAI}>
          Passing loading bar to chat bubble in content. Loading text wrapped with a box.
          <Box margin={{ bottom: "xs" }} color="text-body-secondary">
            Generating response with gen-ai-masked variant
          </Box>
          <LoadingBar variant="gen-ai-masked" />
        </ChatBubble>
        <ChatBubble avatar={<ChatBubbleAvatarGenAI loading={true} />} backgroundColor={backgroundColorGenAI}>
          Passing loading bar to chat bubble in content. Loading text wrapped with a box.
          <Box margin={{ bottom: "xs" }} color="text-body-secondary">
            Generating response with gen-ai variant
          </Box>
          <LoadingBar variant="gen-ai" />
        </ChatBubble>

        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI loading={true} />}
          backgroundColor={backgroundColorGenAI}
          loadingText="Generating response. Using loadingBar prop of chat bubble."
          loadingWithBar={true}
        >
        </ChatBubble>
        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI loading={true} />}
          backgroundColor={backgroundColorGenAI}
          loadingText="Generating response. Using loadingText prop of chat bubble."
          loading={true}
        >
        </ChatBubble> */}
      </ChatContainer>
    </>
  );
}

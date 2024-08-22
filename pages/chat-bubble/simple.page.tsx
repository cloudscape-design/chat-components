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

  return (
    <>
      <h1>Chat bubble</h1>

      <Box padding="m">
        <Checkbox checked={inlineActionsOnHover} onChange={({ detail }) => setInlineActionsOnHover(detail.checked)}>
          Show inline actions on hover
        </Checkbox>
      </Box>

      <ChatContainer>
        <ChatBubble avatar={<ChatBubbleAvatarUser />} backgroundColor="transparent">
          This is an example content
        </ChatBubble>
        <ChatBubble
          avatar={<ChatBubbleAvatarGenAI />}
          backgroundColor="grey"
          inlineActions={<InlineActions />}
          showInlineActionsOnHover={inlineActionsOnHover}
        >
          This is an example content
        </ChatBubble>

        <ChatBubble avatar={<ChatBubbleAvatarUser />} backgroundColor="transparent">
          This is an example content
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
          avatar={<ChatBubbleAvatarGenAI />}
          backgroundColor="grey"
          inlineActions={<InlineActions />}
          showInlineActionsOnHover={inlineActionsOnHover}
        >
          <SpaceBetween size="s">
            <span>{longText}</span>

            <Sources />
          </SpaceBetween>
        </ChatBubble>

        <ChatBubble avatar={<ChatBubbleAvatarUser />} backgroundColor="transparent">
          <span>What can I do with Amazon S3?</span>
        </ChatBubble>
        <Alert statusIconAriaLabel="Error" type="error" header="Access denied">
          You don&apos;t have permissions to [AWSOrganizations:ListAccounts]. To request access, contact your AWS
          administrator.
        </Alert>
      </ChatContainer>
    </>
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Box from "@cloudscape-design/components/box";

import { ChatBubble } from "../../lib/components";
import { TestBed } from "../app/test-bed";
import { ScreenshotArea } from "../screenshot-area";
import { Actions, ChatBubbleAvatarGenAI, ChatBubbleAvatarUser, ChatContainer, longText } from "./util-components";

export default function ChatBubblePage() {
  return (
    <ScreenshotArea>
      <h1>Chat bubble</h1>

      <TestBed>
        <ChatContainer>
          <ChatBubble type="outgoing" avatar={<ChatBubbleAvatarUser />}>
            What can I do with Amazon S3?
          </ChatBubble>
          <ChatBubble avatar={<ChatBubbleAvatarGenAI />} type="incoming">
            Amazon S3 provides a simple web service interface that you can use to store and retrieve any amount of data,
            at any time, from anywhere.
          </ChatBubble>

          <ChatBubble type="outgoing" avatar={<ChatBubbleAvatarUser />}>
            Long text. {longText}
          </ChatBubble>

          <ChatBubble avatar={<ChatBubbleAvatarGenAI />} type="incoming" actions={<Actions />}>
            Long text. {longText}
          </ChatBubble>
          <ChatBubble avatar={<ChatBubbleAvatarGenAI />} type="incoming" actions={<Actions />} hideAvatar={true}>
            Second consecutive message coming from the same author, avatar is hidden.
          </ChatBubble>

          <ChatBubble avatar={<ChatBubbleAvatarGenAI loading={true} />} type="incoming" showLoadingBar={true}>
            <Box color="text-body-secondary">Generating a response (using Box)</Box>
          </ChatBubble>

          <ChatBubble
            avatar={<ChatBubbleAvatarGenAI loading={true} />}
            type="incoming"
            showLoadingBar={true}
            actions={<Actions />}
          >
            Generating a response with actions
          </ChatBubble>
        </ChatContainer>
      </TestBed>
    </ScreenshotArea>
  );
}

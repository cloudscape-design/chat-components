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
          <ChatBubble type="outgoing" avatar={<ChatBubbleAvatarUser />} ariaLabel="User at 4:23:20pm">
            What can I do with Amazon S3?
          </ChatBubble>
          <ChatBubble avatar={<ChatBubbleAvatarGenAI />} type="incoming" ariaLabel="Gen AI at at 4:23:23pm">
            Amazon S3 provides a simple web service interface that you can use to store and retrieve any amount of data,
            at any time, from anywhere.
          </ChatBubble>

          <ChatBubble type="outgoing" avatar={<ChatBubbleAvatarUser />} ariaLabel="User at 4:25:00pm">
            Long text. {longText}
          </ChatBubble>

          <ChatBubble
            avatar={<ChatBubbleAvatarGenAI />}
            type="incoming"
            actions={<Actions />}
            ariaLabel="Gen AI at 4:25:05pm"
          >
            Long text. {longText}
          </ChatBubble>
          <ChatBubble
            avatar={<ChatBubbleAvatarGenAI />}
            type="incoming"
            actions={<Actions />}
            ariaLabel="Gen AI at 4:25:07pm"
            hideAvatar={true}
          >
            Second consecutive message coming from the same author, avatar is hidden.
          </ChatBubble>

          <ChatBubble
            avatar={<ChatBubbleAvatarGenAI loading={true} />}
            type="incoming"
            isGeneratingContent={true}
            ariaLabel="Gen AI at 4:24:24pm"
          >
            <Box color="text-body-secondary">Generating a response (using Box)</Box>
          </ChatBubble>

          <ChatBubble
            avatar={<ChatBubbleAvatarGenAI loading={true} />}
            type="incoming"
            isGeneratingContent={true}
            actions={<Actions />}
            ariaLabel="Gen AI at 4:24:25pm"
          >
            Generating a response with actions
          </ChatBubble>
        </ChatContainer>
      </TestBed>
    </ScreenshotArea>
  );
}

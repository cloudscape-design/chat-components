// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Box from "@cloudscape-design/components/box";
import Link from "@cloudscape-design/components/link";

import { ChatBubble } from "../../lib/components";
import { Page } from "../app/templates";
import { TestBed } from "../app/test-bed";
import { ChatBubbleAvatarGenAI, ChatContainer } from "./util-components";

export default function ChatBubbleStretchPage() {
  return (
    <Page title="Chat bubble: stretch">
      <TestBed>
        <Box variant="h2">Default (width fits content)</Box>
        <ChatContainer>{messages()}</ChatContainer>

        <Box variant="h2">stretch=true (width fills container, aligned elements line up)</Box>
        <ChatContainer>{messages({ stretch: true })}</ChatContainer>
      </TestBed>
    </Page>
  );
}

function messages({ stretch = false }: { stretch?: boolean } = {}) {
  return (
    <>
      <ChatBubble type="incoming" avatar={<ChatBubbleAvatarGenAI />} ariaLabel="Gen AI at 3:45:01pm" stretch={stretch}>
        Short answer.
        <Box textAlign="center">
          <Link href="#">View all</Link>
        </Box>
        <Box textAlign="right" fontSize="body-s" color="text-body-secondary">
          15:45
        </Box>
      </ChatBubble>

      <ChatBubble type="incoming" avatar={<ChatBubbleAvatarGenAI />} ariaLabel="Gen AI at 3:46:10pm" stretch={stretch}>
        A medium-length answer that is a bit longer than the previous one, so this bubble gets a different width.
        <Box textAlign="center">
          <Link href="#">View all</Link>
        </Box>
        <Box textAlign="right" fontSize="body-s" color="text-body-secondary">
          15:46
        </Box>
      </ChatBubble>

      <ChatBubble type="incoming" avatar={<ChatBubbleAvatarGenAI />} ariaLabel="Gen AI at 3:47:30pm" stretch={stretch}>
        An even longer answer: Amazon S3 provides a simple web service interface that you can use to store and retrieve
        any amount of data, at any time, from anywhere. Because this line is the longest, this bubble is the widest of
        the three.
        <Box textAlign="center">
          <Link href="#">View all</Link>
        </Box>
        <Box textAlign="right" fontSize="body-s" color="text-body-secondary">
          15:47
        </Box>
      </ChatBubble>
    </>
  );
}

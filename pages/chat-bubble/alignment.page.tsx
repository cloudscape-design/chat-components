// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Box from "@cloudscape-design/components/box";

import { ChatBubble } from "../../lib/components";
import { Page } from "../app/templates";
import { TestBed } from "../app/test-bed";
import { Actions, ChatBubbleAvatarGenAI, ChatBubbleAvatarUser, ChatContainer, longText } from "./util-components";

export default function ChatBubbleAlignmentPage() {
  return (
    <Page title="Chat bubble: alignment">
      <TestBed>
        <Box variant="h2">align=&quot;start&quot; (default) — avatar on the inline-start</Box>
        <ChatContainer>
          <ChatBubble
            type="incoming"
            avatar={<ChatBubbleAvatarGenAI />}
            ariaLabel="Gen AI at 3:42pm"
            actions={<Actions />}
          >
            What can I do with Amazon S3?
          </ChatBubble>
          <ChatBubble
            type="incoming"
            avatar={<ChatBubbleAvatarGenAI />}
            ariaLabel="Gen AI at 3:42pm"
            hideAvatar={true}
            actions={<Actions />}
          >
            This is a consecutive message with the avatar hidden but space preserved.
          </ChatBubble>
        </ChatContainer>

        <Box variant="h2">align=&quot;end&quot; — avatar on the inline-end (outgoing)</Box>
        <ChatContainer>
          <ChatBubble type="outgoing" align="end" avatar={<ChatBubbleAvatarUser />} ariaLabel="Jane Doe at 3:42pm">
            How do I create an S3 bucket?
          </ChatBubble>
          <ChatBubble
            type="outgoing"
            align="end"
            avatar={<ChatBubbleAvatarUser />}
            ariaLabel="Jane Doe at 3:43pm"
            hideAvatar={true}
          >
            Consecutive message — avatar is hidden but space is preserved.
          </ChatBubble>
        </ChatContainer>

        <Box variant="h2">Full conversation — both sides using avatars</Box>
        <ChatContainer>
          <ChatBubble type="outgoing" align="end" avatar={<ChatBubbleAvatarUser />} ariaLabel="Jane Doe at 3:42pm">
            How do I create an S3 bucket?
          </ChatBubble>
          <ChatBubble
            type="incoming"
            avatar={<ChatBubbleAvatarGenAI />}
            ariaLabel="Gen AI at 3:43pm"
            actions={<Actions />}
          >
            To create an S3 bucket, navigate to the S3 console and choose &ldquo;Create bucket&rdquo;.
          </ChatBubble>
          <ChatBubble type="outgoing" align="end" avatar={<ChatBubbleAvatarUser />} ariaLabel="Jane Doe at 3:42pm">
            And what&apos;s the cheapest storage class?
          </ChatBubble>
          <ChatBubble
            type="incoming"
            avatar={<ChatBubbleAvatarGenAI />}
            ariaLabel="Gen AI at 3:43pm"
            actions={<Actions />}
          >
            The cheapest storage class is S3 Glacier Deep Archive.
          </ChatBubble>
        </ChatContainer>

        <Box variant="h2">align=&quot;end&quot; with stretch=true</Box>
        <ChatContainer>
          <ChatBubble
            type="outgoing"
            align="end"
            stretch={true}
            avatar={<ChatBubbleAvatarUser />}
            ariaLabel="Jane Doe at 3:45pm"
          >
            This bubble stretches to fill available width, avatar still on the end.
          </ChatBubble>
        </ChatContainer>

        <Box variant="h2">align=&quot;end&quot; with long text</Box>
        <ChatContainer>
          <ChatBubble type="outgoing" align="end" avatar={<ChatBubbleAvatarUser />} ariaLabel="Jane Doe at 3:46pm">
            Long text. {longText}
          </ChatBubble>
        </ChatContainer>
      </TestBed>
    </Page>
  );
}

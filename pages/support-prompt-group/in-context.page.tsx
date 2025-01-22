// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import PromptInput from "@cloudscape-design/components/prompt-input";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { ChatBubble } from "../../lib/components";
import { SupportPromptGroup } from "../../lib/components";
import { TestBed } from "../app/test-bed";
import { ChatBubbleAvatarGenAI, ChatBubbleAvatarUser } from "../chat-bubble/util-components";
import { ScreenshotArea } from "../screenshot-area";

export default function SupportPromptPage() {
  return (
    <ScreenshotArea>
      <main style={{ maxWidth: "800px" }}>
        <TestBed>
          <Container header={<Header>Image generator</Header>}>
            <SpaceBetween direction="vertical" size="xxl">
              <div style={{ height: "100px" }} />

              <SpaceBetween direction="vertical" size="m">
                <SupportPromptGroup
                  ariaLabel="Horizontal support prompt group"
                  alignment="horizontal"
                  onItemClick={({ detail }) => console.log(detail)}
                  items={[
                    {
                      text: "Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. ",
                      id: "image",
                    },
                    {
                      text: "Help me brainstorm for an upcoming sign-off. Help me brainstorm for an upcoming sign-off. Help me brainstorm for an upcoming sign-off.",
                      id: "brainstorm",
                    },
                    {
                      text: "Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. ",
                      id: "summarize",
                    },
                  ]}
                />
                <PromptInput placeholder="Write a prompt" value="" actionButtonIconName="send" />
              </SpaceBetween>
            </SpaceBetween>
          </Container>

          <Container header={<Header>Image generator</Header>}>
            <SpaceBetween direction="vertical" size="xxl">
              <div>
                <ChatBubble type="outgoing" avatar={<ChatBubbleAvatarUser />} ariaLabel="User at 4:23:20pm">
                  What can I do with Amazon S3?
                </ChatBubble>
                <SpaceBetween direction="vertical" size="xs">
                  <ChatBubble avatar={<ChatBubbleAvatarGenAI />} type="incoming" ariaLabel="Gen AI at at 4:23:23pm">
                    Amazon S3 provides a simple web service interface that you can use to store and retrieve any amount
                    of data, at any time, from anywhere.
                  </ChatBubble>
                  <div style={{ marginInlineStart: "36px" }}>
                    <SupportPromptGroup
                      ariaLabel="Horizontal support prompt group"
                      alignment="vertical"
                      onItemClick={({ detail }) => console.log(detail)}
                      items={[
                        {
                          text: "Create a really detailed and powerful image.",
                          id: "image",
                        },
                        {
                          text: "Help me brainstorm for an upcoming sign-off.",
                          id: "brainstorm",
                        },
                        {
                          text: "Summarize this long and complex PDF for me.",
                          id: "summarize",
                        },
                      ]}
                    />
                  </div>
                </SpaceBetween>
              </div>

              <SpaceBetween direction="vertical" size="m">
                <PromptInput placeholder="Write a prompt" value="" actionButtonIconName="send" />
              </SpaceBetween>
            </SpaceBetween>
          </Container>
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

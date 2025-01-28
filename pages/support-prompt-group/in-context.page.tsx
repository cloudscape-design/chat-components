// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { createRef, useState } from "react";

import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import PromptInput from "@cloudscape-design/components/prompt-input";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { ChatBubble, SupportPromptGroup } from "../../lib/components";
import { TestBed } from "../app/test-bed";
import { ChatBubbleAvatarGenAI, ChatBubbleAvatarUser } from "../chat-bubble/util-components";
import { ScreenshotArea } from "../screenshot-area";

import styles from "./styles.module.scss";

export default function SupportPromptPage() {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [sentText, setSentText] = useState("");
  const ref = createRef<HTMLTextAreaElement>();

  const items = [
    {
      text: "Create a really detailed and powerful image. The image should be of a mountain scene with a blue lake and green hills, with a sunset in the background. In the lake, there should be 3 whales leaping out of the water.",
      id: "image",
    },
    {
      text: "Help me brainstorm for an upcoming sign-off.",
      id: "brainstorm",
    },
    {
      text: "Summarize this long and complex PDF for me. Include a paragraph containing 3-4 sentences that capture the main ideas and overall message of the documents, a list of 5 to 10 key points from the document, and up to 3 follow-up questions that arise from the content of the document.",
      id: "summarize",
    },
  ];

  const items2 = [
    {
      text: "Create a really detailed and powerful image.",
      id: "image",
    },
    {
      text: "Help me brainstorm for an upcoming sign-off.",
      id: "brainstorm",
    },
    {
      text: "Summarize this long PDF for me.",
      id: "summarize",
    },
  ];

  return (
    <ScreenshotArea>
      <main className={styles.container}>
        <TestBed>
          <SpaceBetween size="xl">
            <Container
              header={
                <Header actions={<Button onClick={() => setText("")}>Reset</Button>}>Support prompt test: send</Header>
              }
            >
              <SpaceBetween direction="vertical" size="xxl">
                <div>
                  <ChatBubble type="outgoing" avatar={<ChatBubbleAvatarUser />} ariaLabel="User at 4:23:20pm">
                    What can I do with Amazon S3?
                  </ChatBubble>
                  <SpaceBetween direction="vertical" size="xs">
                    <ChatBubble avatar={<ChatBubbleAvatarGenAI />} type="incoming" ariaLabel="Gen AI at at 4:23:23pm">
                      Amazon S3 provides a simple web service interface that you can use to store and retrieve any
                      amount of data, at any time, from anywhere.
                    </ChatBubble>
                    {text === "" && (
                      <div className={styles["support-prompt-container"]}>
                        <SupportPromptGroup
                          ariaLabel="Test support prompt group 1"
                          alignment="vertical"
                          onItemClick={({ detail }) => {
                            const activeItem = items.find((item) => item.id === detail.id);
                            setText(activeItem?.text || "");
                            console.log(detail);
                          }}
                          items={items}
                        />
                      </div>
                    )}
                  </SpaceBetween>
                  {text !== "" && (
                    <ChatBubble type="outgoing" avatar={<ChatBubbleAvatarUser />} ariaLabel="User at 4:23:20pm">
                      {text}
                    </ChatBubble>
                  )}
                </div>

                <SpaceBetween direction="vertical" size="m">
                  <PromptInput placeholder="Write a prompt" value="" actionButtonIconName="send" />
                </SpaceBetween>
              </SpaceBetween>
            </Container>
            <Container
              header={
                <Header actions={<Button onClick={() => setSentText("")}>Reset</Button>}>
                  Support prompt test: draft
                </Header>
              }
            >
              <SpaceBetween direction="vertical" size="m">
                <div className={styles.placeholder} />
                {sentText !== "" && (
                  <ChatBubble type="outgoing" avatar={<ChatBubbleAvatarUser />} ariaLabel="User at 4:23:20pm">
                    {sentText}
                  </ChatBubble>
                )}
                <SpaceBetween direction="vertical" size="m">
                  {sentText === "" && (
                    <SupportPromptGroup
                      alignment="horizontal"
                      ariaLabel="Test support prompt group 2"
                      onItemClick={({ detail }) => {
                        const activeItem = items2.find((item) => item.id === detail.id);
                        setText2(activeItem?.text || "");
                        ref.current?.focus();
                      }}
                      items={items2}
                    />
                  )}

                  <PromptInput
                    ref={ref}
                    placeholder="Write a prompt"
                    value={text2}
                    actionButtonIconName="send"
                    onAction={() => {
                      setSentText(text2);
                      setText2("");
                    }}
                  />
                </SpaceBetween>
              </SpaceBetween>
            </Container>
          </SpaceBetween>
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useState } from "react";

import Box from "@cloudscape-design/components/box";
import ButtonGroup from "@cloudscape-design/components/button-group";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Card from "@cloudscape-design/components/internal/components/card";
import PromptInput from "@cloudscape-design/components/prompt-input";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { spaceScaledXs } from "@cloudscape-design/design-tokens";

import Avatar from "../../lib/components/avatar";
import ChatBubble from "../../lib/components/chat-bubble";

export default function ButtonsScenario() {
  const [promptValue, setPromptValue] = useState("");

  return (
    <article>
      <h1>Code snippet</h1>
      <Container
        header={<Header variant="h2">Generative AI assistant</Header>}
        footer={
          <PromptInput
            value={promptValue}
            onChange={({ detail }) => setPromptValue(detail.value)}
            onAction={() => {
              console.log("Submitted:", promptValue);
              setPromptValue("");
            }}
            actionButtonAriaLabel="Submit prompt"
            actionButtonIconName="send"
            placeholder="Ask a question or describe what you need..."
            secondaryActions={
              <ButtonGroup
                variant="icon"
                items={[
                  { type: "icon-button", id: "attach", iconName: "upload", text: "Attach file" },
                  { type: "icon-button", id: "at", iconName: "contact", text: "Mention" },
                  { type: "icon-button", id: "slash", iconName: "status-info", text: "Commands" },
                ]}
              />
            }
          />
        }
      >
        <SpaceBetween size="l">
          <ChatBubble
            type="outgoing"
            avatar={<Avatar ariaLabel="User avatar" iconName="user-profile" />}
            ariaLabel="User message"
          >
            Show me the simplest Lambda function to log S3 uploads
          </ChatBubble>

          <div style={{ display: "flex", gap: spaceScaledXs }}>
            <div style={{ paddingBlockStart: spaceScaledXs }}>
              <Avatar
                color="gen-ai"
                iconName="gen-ai"
                ariaLabel="Generative AI assistant"
                tooltipText="Generative AI assistant"
              />
            </div>

            <div style={{ minInlineSize: 500 }}>
              <Card
                header="Python"
                actions={
                  <ButtonGroup
                    variant="icon"
                    items={[
                      { type: "icon-button", id: "download", iconName: "download", text: "Download code" },
                      { type: "icon-button", id: "copy", iconName: "copy", text: "Copy code" },
                    ]}
                  />
                }
              >
                <Box variant="code">
                  <pre
                    style={{
                      backgroundColor: "light-dark(#f8f8f8, #ffffff1a)",
                      borderRadius: 8,
                      margin: 0,
                      padding: 8,
                    }}
                  >
                    {`def lambda_handler(event, context):
  bucket = event['Records'][0]['s3']['bucket']['name']
  key = event['Records'][0]['s3']['object']['key']
  print(f'New file uploaded: {key} in bucket {bucket}')
  return {'statusCode': 200}`}
                  </pre>
                </Box>
              </Card>
            </div>
          </div>

          <ChatBubble
            type="incoming"
            avatar={<Avatar ariaLabel="AI assistant avatar" iconName="gen-ai" color="gen-ai" />}
            ariaLabel="AI assistant response"
            hideAvatar={true}
            actions={
              <ButtonGroup
                variant="icon"
                items={[
                  { type: "icon-button", id: "thumbs-up", iconName: "thumbs-up", text: "Good response" },
                  { type: "icon-button", id: "thumbs-down", iconName: "thumbs-down", text: "Bad response" },
                  { type: "icon-button", id: "refresh", iconName: "refresh", text: "Regenerate" },
                ]}
              />
            }
          >
            <SpaceBetween size="m">
              <Box>Here is a a snippet of the simplest Lambda function to log S3 uploads.</Box>
            </SpaceBetween>
          </ChatBubble>
        </SpaceBetween>
      </Container>
    </article>
  );
}

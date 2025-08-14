// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useState } from "react";

import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { ChatBubble } from "../../lib/components";
import { Page } from "../app/templates";
import { ChatBubbleAvatarGenAI, ChatBubbleAvatarUser } from "./util-components";

export default function ChatBubbleSelectablePage() {
  const [selectedCardId, setSelectedCardId] = useState<null | string>(null);
  return (
    <Page title="Chat bubble: selectable">
      <SpaceBetween direction="horizontal" size="l">
        <Container header={<Header variant="h3">Chat container</Header>}>
          <SpaceBetween size="m">
            <ChatBubble avatar={<ChatBubbleAvatarUser />} type="outgoing" ariaLabel="User at 4:24:12pm">
              <Box color="text-body-secondary">User request example</Box>
            </ChatBubble>

            <ChatBubble avatar={<ChatBubbleAvatarGenAI />} type="incoming" ariaLabel="Gen AI at 4:24:24pm">
              <Box color="text-body-secondary">Normal response example</Box>
            </ChatBubble>

            <ChatBubble
              avatar={<ChatBubbleAvatarGenAI />}
              hideAvatar={true}
              type="incoming"
              ariaLabel="Gen AI at 4:24:25pm"
              selectionType="click"
              onSelect={() => setSelectedCardId((prev) => (prev !== "1" ? "1" : null))}
              selected={selectedCardId === "1"}
            >
              <Box variant="h4">Selectable response example</Box>
              <Box variant="p">This entire card is clickable</Box>
            </ChatBubble>

            <ChatBubble
              avatar={<ChatBubbleAvatarGenAI />}
              hideAvatar={true}
              type="incoming"
              ariaLabel="Gen AI at 4:24:25pm"
              selectionType="custom"
              selected={selectedCardId === "2"}
            >
              <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
                <Box variant="h4">Selectable response example</Box>
                {selectedCardId !== "2" ? (
                  <Button variant="inline-link" onClick={() => setSelectedCardId("2")}>
                    Show
                  </Button>
                ) : (
                  <Button variant="inline-link" onClick={() => setSelectedCardId(null)}>
                    Hide
                  </Button>
                )}
              </div>
              <Box variant="p">
                This entire card is not clickable. Instead, there is a custom action in the top-right.
              </Box>
            </ChatBubble>
          </SpaceBetween>
        </Container>

        <Container header={<Header variant="h3">Presentation container</Header>}>
          {selectedCardId ? (
            <SpaceBetween size="m">
              <Box>{selectedCardId === "1" ? "First" : "Second"} card is selected</Box>
              <Button onClick={() => setSelectedCardId(null)}>Clear selection</Button>
            </SpaceBetween>
          ) : null}
        </Container>
      </SpaceBetween>
    </Page>
  );
}

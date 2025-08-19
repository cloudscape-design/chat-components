// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useContext, useState } from "react";

import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Checkbox from "@cloudscape-design/components/checkbox";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Icon from "@cloudscape-design/components/icon";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { ChatBubble, SupportPromptGroup } from "../../lib/components";
import AppContext, { AppContextType } from "../app/app-context";
import { Page } from "../app/templates";
import { ChatBubbleAvatarGenAI, ChatBubbleAvatarUser } from "../chat-bubble/util-components";

interface PageSettings {
  alignment: "horizontal" | "vertical";
}

type PageContext<PageSettings> = React.Context<AppContextType<Partial<PageSettings>>>;

export default function ChatBubbleSelectablePage() {
  const {
    urlParams: { alignment = "horizontal" },
    setUrlParams,
  } = useContext(AppContext as PageContext<PageSettings>);
  const [selectedCardId, setSelectedCardId] = useState<null | string>(null);
  return (
    <Page
      title="Support prompts: selectable"
      settings={
        <SpaceBetween size="m">
          <Checkbox
            checked={alignment === "vertical"}
            onChange={({ detail }) => setUrlParams({ alignment: detail.checked ? "vertical" : "horizontal" })}
          >
            Use vertical prompts
          </Checkbox>
        </SpaceBetween>
      }
    >
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
              additionalContent={
                <SupportPromptGroup
                  ariaLabel="additional actions"
                  alignment={alignment}
                  onItemClick={({ detail }) =>
                    detail.id === selectedCardId ? setSelectedCardId(null) : setSelectedCardId(detail.id)
                  }
                  toggledItems={selectedCardId ? [selectedCardId] : []}
                  items={[
                    {
                      id: "1",
                      text: "Expandable option 1 content",
                      header: {
                        text: "Expandable option 1",
                        icon: <Icon name="expand" />,
                        pressedIcon: <Icon name="shrink" />,
                      },
                    },
                    {
                      id: "2",
                      text: "Expandable option 2 content",
                      header: {
                        text: "Expandable option 2",
                        icon: <Icon name="expand" />,
                        pressedIcon: <Icon name="shrink" />,
                      },
                    },
                  ]}
                />
              }
            >
              Selectable response example
            </ChatBubble>
          </SpaceBetween>
        </Container>

        <Container header={<Header variant="h3">Presentation container</Header>}>
          {selectedCardId ? (
            <SpaceBetween size="m">
              <Box>Option {selectedCardId} is selected</Box>
              <Button onClick={() => setSelectedCardId(null)}>Clear selection</Button>
            </SpaceBetween>
          ) : null}
        </Container>
      </SpaceBetween>
    </Page>
  );
}

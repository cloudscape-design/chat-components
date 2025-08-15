// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useState } from "react";
import clsx from "clsx";

import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import Icon, { IconProps } from "@cloudscape-design/components/icon";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { ChatBubble } from "../../lib/components";
import { Page } from "../app/templates";
import { ChatBubbleAvatarGenAI, ChatBubbleAvatarUser } from "./util-components";

import styles from "./styles.module.scss";

export default function ChatBubbleSelectableCustomPage() {
  const [selectedCardId, setSelectedCardId] = useState<null | string>(null);
  return (
    <Page title="Chat bubble: selectable custom card">
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
                <SpaceBetween size="s" direction="horizontal">
                  <CustomSelectableCard
                    header="Selectable card 1"
                    pressed={selectedCardId === "1"}
                    iconName="expand"
                    iconNamePressed="shrink"
                    onClick={() => setSelectedCardId(selectedCardId === "1" ? null : "1")}
                  >
                    Selectable card 1 content
                  </CustomSelectableCard>
                  <CustomSelectableCard
                    header="Selectable card 2"
                    pressed={selectedCardId === "2"}
                    iconName="expand"
                    iconNamePressed="shrink"
                    onClick={() => setSelectedCardId(selectedCardId === "2" ? null : "2")}
                  >
                    Selectable card 2 content
                  </CustomSelectableCard>
                </SpaceBetween>
              }
            >
              Selectable response example
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

function CustomSelectableCard({
  header,
  children,
  iconName,
  iconNamePressed,
  pressed,
  onClick,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  iconName: IconProps.Name;
  iconNamePressed: IconProps.Name;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={pressed}
      className={clsx(styles["selectable-card"], pressed && styles["selectable-card-pressed"])}
      onClick={onClick}
    >
      <SpaceBetween size="s">
        <div className={styles["selectable-card-header"]}>
          <Box fontWeight="bold">{header}</Box>
          <Icon name={pressed ? iconNamePressed : iconName} />
        </div>
        <Box>{children}</Box>
      </SpaceBetween>
    </button>
  );
}

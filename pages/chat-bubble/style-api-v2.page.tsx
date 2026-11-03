// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import SpaceBetween from "@cloudscape-design/components/space-between";

import { ChatBubble } from "../../lib/components";
import { Page } from "../app/templates";
import { Actions, ChatBubbleAvatarGenAI, ChatBubbleAvatarUser, ChatContainer } from "./util-components";

import styles from "./style-api-v2.module.scss";

export default function () {
  return (
    <Page title="Chat bubble - Style API v2">
      <ChatContainer>
        <SpaceBetween size="m">
          <ChatBubble
            type="incoming"
            avatar={<ChatBubbleAvatarGenAI />}
            ariaLabel="Generative AI assistant"
            actions={<Actions />}
            {...{ styleClassNames: { root: styles.root, bubble: styles.bubble } }}
          >
            A styled bubble with custom colors, border, padding, gaps and font.
          </ChatBubble>
          <ChatBubble
            type="outgoing"
            avatar={<ChatBubbleAvatarUser />}
            ariaLabel="User"
            {...{ styleClassNames: { bubble: styles["bubble-dashed"] } }}
          >
            A bubble with a dashed border.
          </ChatBubble>
        </SpaceBetween>
      </ChatContainer>
    </Page>
  );
}

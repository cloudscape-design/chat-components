// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useState } from "react";

import ButtonGroup from "@cloudscape-design/components/button-group";
import ExpandableSection from "@cloudscape-design/components/expandable-section";
import Link from "@cloudscape-design/components/link";
import StatusIndicator from "@cloudscape-design/components/status-indicator";

import { Avatar } from "../../lib/components";

export const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum finibus maximus. Quisque blandit volutpat nulla id ullamcorper. Morbi at felis sit amet nisl hendrerit sodales. Fusce eget quam feugiat nulla mollis lacinia. Donec vestibulum nibh at ullamcorper faucibus. Donec at nunc sapien. Curabitur eleifend in lacus eget tincidunt. Ut porta sodales nisi a faucibus. Donec sagittis lobortis tempus.";

export function ChatBubbleAvatarUser({ initials, tooltipText }: { initials?: string; tooltipText?: string }) {
  return <Avatar ariaLabel="chat-bubble-avatar-user" initials={initials} tooltipText={tooltipText} />;
}

export function ChatBubbleAvatarGenAI({ tooltipText, loading }: { tooltipText?: string; loading?: boolean }) {
  return (
    <Avatar
      ariaLabel="chat-bubble-avatar-genai"
      color="gen-ai"
      iconName="gen-ai"
      tooltipText={tooltipText}
      loading={loading}
    />
  );
}

export function InlineActions() {
  const [helpfulChoice, setHelpfulChoice] = useState("");

  return (
    <ButtonGroup
      variant="icon"
      onItemClick={({ detail }) => {
        if (["helpful", "not-helpful"].includes(detail.id)) {
          setHelpfulChoice(detail.id);
        }
      }}
      items={[
        {
          type: "group",
          text: "Feedback",
          items: [
            {
              type: "icon-button",
              id: "helpful",
              iconName: helpfulChoice === "helpful" ? "thumbs-up-filled" : "thumbs-up",
              text: "Helpful",
            },
            {
              type: "icon-button",
              id: "not-helpful",
              iconName: helpfulChoice === "not-helpful" ? "thumbs-down-filled" : "thumbs-down",
              text: "Not helpful",
            },
          ],
        },
        {
          type: "icon-button",
          id: "copy",
          iconName: "copy",
          text: "Copy",
          popoverFeedback: <StatusIndicator type="success">Message copied</StatusIndicator>,
        },
      ]}
    />
  );
}

export function Sources() {
  return (
    <ExpandableSection headerText="Sources">
      <div>
        <Link href="https://cloudscape.aws.dev/components/link?tabId=playground&example=external-link">
          Example link
        </Link>
      </div>
      <div>
        <Link href="https://cloudscape.aws.dev/components/link?tabId=playground&example=external-link">
          Example link 2
        </Link>
      </div>
    </ExpandableSection>
  );
}

interface ChatContainerProps {
  children: string | JSX.Element | JSX.Element[];
}
export function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        border: "1px solid #B6BEC9",
        borderRadius: "16px",
        padding: "12px",
        width: "70%",
        height: "30%",
      }}
    >
      {children}
    </div>
  );
}

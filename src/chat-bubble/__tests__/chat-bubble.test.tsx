// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import ButtonGroup from "@cloudscape-design/components/button-group";
import ExpandableSection from "@cloudscape-design/components/expandable-section";

import { Avatar } from "../../../lib/components";
import ChatBubble, { ChatBubbleProps } from "../../../lib/components/chat-bubble";
import createWrapper from "../../../lib/components/test-utils/dom";

function renderChatBubble(props: ChatBubbleProps) {
  const { container } = render(<ChatBubble {...props} />);

  return createWrapper(container).findChatBubble()!;
}

describe("Chat bubble", () => {
  afterEach(() => {
    cleanup();
  });

  test("Can access slots and elements inside", () => {
    const wrapper = renderChatBubble({
      type: "outgoing",
      avatar: <Avatar ariaLabel="Avatar" />,
      children: (
        <>
          Content
          <ExpandableSection headerText="Sources">Sources</ExpandableSection>
        </>
      ),
      ariaLabel: "Chat bubble",
      actions: (
        <ButtonGroup
          variant="icon"
          items={[
            {
              type: "group",
              text: "Feedback",
              items: [
                {
                  type: "icon-button",
                  id: "helpful",
                  iconName: "thumbs-up",
                  text: "Helpful",
                },
                {
                  type: "icon-button",
                  id: "not-helpful",
                  iconName: "thumbs-down",
                  text: "Not helpful",
                },
              ],
            },
          ]}
        />
      ),
    });

    expect(wrapper.findAvatarSlot()!.findAvatar()!.getElement()).toBeVisible();
    expect(wrapper.findContentSlot()!.findExpandableSection()!.getElement()).toBeVisible();
    expect(wrapper.findActionsSlot()!.findButtonGroup()!.getElement()).toBeVisible();
  });

  test("Can access generating content indicator", () => {
    const wrapper = renderChatBubble({
      type: "outgoing",
      avatar: <Avatar ariaLabel="Avatar" />,
      children: "Test content",
      ariaLabel: "Chat bubble",
      isGeneratingContent: true,
    });

    expect(wrapper.findGeneratingContentIndicator()!.getElement()).toBeVisible();
  });

  test("Generating content indicator is null when set to false", () => {
    const wrapper = renderChatBubble({
      type: "outgoing",
      avatar: <Avatar ariaLabel="Avatar" />,
      children: "Test content",
      ariaLabel: "Chat bubble",
      isGeneratingContent: false,
    });

    expect(wrapper.findGeneratingContentIndicator()).toBeNull();
  });

  test("Hides the avatar", () => {
    const wrapper = renderChatBubble({
      type: "outgoing",
      avatar: <Avatar ariaLabel="Avatar" />,
      children: "Test content",
      ariaLabel: "Chat bubble",
      hideAvatar: true,
    });

    expect(wrapper.findAvatarSlot()).toBeNull();
  });
});

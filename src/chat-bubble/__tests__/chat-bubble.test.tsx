// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ButtonGroup from "@cloudscape-design/components/button-group";
import ExpandableSection from "@cloudscape-design/components/expandable-section";
import createWrapper from "@cloudscape-design/components/test-utils/dom";

import "../../../lib/components/test-utils/dom";
import { Avatar } from "../../../lib/components";
import ChatBubble, { ChatBubbleProps } from "../../../lib/components/chat-bubble";

import styles from "../../../lib/components/chat-bubble/styles.selectors.js";

function renderChatBubble(props: ChatBubbleProps) {
  const { container } = render(<ChatBubble {...props} />);

  return createWrapper(container).findChatBubble()!;
}

describe("Chat bubble", () => {
  test("Can access slots and elements inside the slots", () => {
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

  test("Can access loading bar", () => {
    const wrapper = renderChatBubble({
      type: "outgoing",
      avatar: <Avatar ariaLabel="Avatar" />,
      children: "Test content",
      ariaLabel: "Chat bubble",
      showLoadingBar: true,
    });

    expect(wrapper.findLoadingBar()!.getElement()).toBeVisible();
  });

  test("findLoadingBar returns null when showLoadingBar is set to false", () => {
    const wrapper = renderChatBubble({
      type: "outgoing",
      avatar: <Avatar ariaLabel="Avatar" />,
      children: "Test content",
      ariaLabel: "Chat bubble",
      showLoadingBar: false,
    });

    expect(wrapper.findLoadingBar()).toBeNull();
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

    const avatar = wrapper.findByClassName(styles.avatar)?.getElement();
    expect(avatar).toHaveClass(styles.hide);
    expect(avatar!.inert).toBe(true);
  });
});

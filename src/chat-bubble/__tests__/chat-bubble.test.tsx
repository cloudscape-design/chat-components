// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import ButtonGroup from "@cloudscape-design/components/button-group";
import ExpandableSection from "@cloudscape-design/components/expandable-section";

import { Avatar } from "../../../lib/components";
import ChatBubble, { ChatBubbleProps } from "../../../lib/components/chat-bubble";
import createWrapper from "../../../lib/components/test-utils/dom";

import styles from "../../../lib/components/chat-bubble/styles.selectors.js";

function renderChatBubble(props: Partial<ChatBubbleProps>) {
  const { container } = render(<ChatBubble type="sent" ariaLabel="Chat bubble" {...props} />);

  return createWrapper(container).findChatBubble()!;
}

describe("Chat bubble", () => {
  afterEach(() => {
    cleanup();
  });

  test("Can access slots and elements inside", () => {
    const wrapper = renderChatBubble({
      avatar: <Avatar ariaLabel="Avatar" />,
      children: (
        <>
          Content
          <ExpandableSection headerText="Sources">Sources</ExpandableSection>
        </>
      ),
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

    expect(wrapper.findAvatarSlot()?.findAvatar()?.getElement()).toBeVisible();
    expect(wrapper.findContentSlot()?.findExpandableSection()?.getElement()).toBeVisible();
    expect(wrapper.findActionsSlot()?.findButtonGroup()?.getElement()).toBeVisible();
  });

  test("Can access generating content indicator", () => {
    const wrapper = renderChatBubble({
      avatar: <Avatar ariaLabel="Avatar" />,
      children: "Test content",
      isGeneratingContent: true,
    });

    expect(wrapper.findGeneratingContentIndicator()?.getElement()).toBeVisible();
  });

  test("Hides the avatar", () => {
    const withVisibleAvatar = renderChatBubble({
      avatar: <Avatar ariaLabel="Avatar" />,
      children: "Test content",
    });
    expect(withVisibleAvatar.findAvatarSlot()?.getElement()).not.toHaveClass(styles.hide);
    expect(withVisibleAvatar.findAvatarSlot()?.getElement()).not.toHaveAttribute("inert");

    const withHiddenAvatar = renderChatBubble({
      avatar: <Avatar ariaLabel="Avatar" />,
      children: "Test content",
      hideAvatar: true,
    });

    // Even though `hide` class adds opacity 0, test doesn't detect it unless it's added directly to the div
    // so testing the class existence instead of visibility
    expect(withHiddenAvatar.findAvatarSlot()?.getElement()).toHaveClass(styles.hide);
    expect(withHiddenAvatar.findAvatarSlot()?.getElement()).toHaveAttribute("inert");
  });
});

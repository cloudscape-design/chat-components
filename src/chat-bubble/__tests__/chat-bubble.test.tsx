// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

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

  test("Hides the avatar", () => {
    const withVisibleAvatar = renderChatBubble({
      avatar: <Avatar ariaLabel="Avatar" />,
      children: "Test content",
      ariaLabel: "Chat bubble",
    });
    expect(withVisibleAvatar.findAvatarSlot()?.getElement()).not.toHaveAttribute("inert");
    expect(withVisibleAvatar.findAvatarSlot()?.findAvatar()?.getElement()).toBeVisible();

    const withHiddenAvatar = renderChatBubble({
      children: "Test content",
      ariaLabel: "Chat bubble",
      hideAvatar: true,
    });

    expect(withHiddenAvatar.findAvatarSlot()?.getElement()).toBeUndefined();
  });
});

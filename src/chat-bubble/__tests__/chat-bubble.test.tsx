// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";

import ChatBubble, { ChatBubbleProps } from "../../../lib/components/chat-bubble";
import createWrapper from "../../../lib/components/test-utils/dom";

import styles from "../../../lib/components/chat-bubble/styles.selectors.js";

function renderChatBubble(props: ChatBubbleProps) {
  const { container } = render(<ChatBubble {...props} />);

  return createWrapper(container).findChatBubble()!;
}

describe("Chat bubble", () => {
  afterEach(() => {
    cleanup();
  });

  test("Inline actions are shown on focus", () => {
    const wrapper = renderChatBubble({
      children: "Test content",
      inlineActions: <button>Inline action</button>,
      showInlineActionsOnHover: true,
    });

    wrapper.findBubble()?.focus();
    expect(wrapper.findByClassName(styles["inline-actions"])?.getElement()).toBeVisible();

    wrapper.findBubble()?.blur();
    expect(wrapper.findByClassName(styles["inline-actions"])?.getElement()).not.toBeVisible();
  });

  test("Inline actions are shown on mouse enter", () => {
    const wrapper = renderChatBubble({
      children: "Test content",
      inlineActions: <button>Inline action</button>,
      showInlineActionsOnHover: true,
    });

    act(() => {
      fireEvent.mouseEnter(wrapper.findBubble()!.getElement());
    });
    expect(wrapper.findByClassName(styles["inline-actions"])?.getElement()).toBeVisible();

    act(() => {
      fireEvent.mouseLeave(wrapper.findBubble()!.getElement());
    });
    expect(wrapper.findByClassName(styles["inline-actions"])?.getElement()).not.toBeVisible();
  });
});

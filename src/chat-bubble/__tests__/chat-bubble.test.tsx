// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { cleanup, render } from "@testing-library/react";
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

  // to be updated
  test("Inline actions are shown", () => {
    const wrapper = renderChatBubble({
      children: "Test content",
      inlineActions: <button>Inline action</button>,
    });

    console.log(
      'wrapper.findByClassName(styles["inline-actions"])?.getElement(): ',
      wrapper.findByClassName(styles["inline-actions"])?.getElement(),
    );
    expect(wrapper.findByClassName(styles["inline-actions"])?.getElement()).toBeVisible();
  });
});

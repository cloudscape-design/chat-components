// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import ChatBubble from "../../../lib/components/chat-bubble";
import createWrapper from "../../../lib/components/test-utils/dom";

function renderChatBubble(styleClassNames: Record<string, string>) {
  const { container } = render(
    <ChatBubble type="incoming" avatar={<div />} ariaLabel="Message" {...({ styleClassNames } as object)}>
      Content
    </ChatBubble>,
  );
  return { container, wrapper: createWrapper(container).findChatBubble()! };
}

describe("ChatBubble Style API v2", () => {
  test("applies styleClassNames to the root and bubble slots", () => {
    const { container, wrapper } = renderChatBubble({ root: "a", bubble: "b", unknown: "c" });
    expect(wrapper.getElement()).toHaveClass("a");
    expect(wrapper.findContentSlot()!.getElement().parentElement).toHaveClass("b");
    expect(container.querySelector(".c")).toBeNull();
  });

  test("does not leak the styleClassNames prop to the DOM", () => {
    const { container } = renderChatBubble({ root: "a" });
    expect(container.querySelector("[styleClassNames]")).toBeNull();
  });
});

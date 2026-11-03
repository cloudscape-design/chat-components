// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import SupportPromptGroup, { SupportPromptGroupProps } from "../../../lib/components/support-prompt-group";
import createWrapper from "../../../lib/components/test-utils/dom";

const items: SupportPromptGroupProps.Item[] = [
  { id: "one", text: "One" },
  { id: "two", text: "Two" },
];

function renderGroup(styleClassNames: Record<string, unknown>) {
  const { container } = render(
    <SupportPromptGroup
      ariaLabel="Prompts"
      items={items}
      onItemClick={() => {}}
      {...({ styleClassNames } as object)}
    />,
  );
  return { container, wrapper: createWrapper(container).findSupportPromptGroup()! };
}

describe("SupportPromptGroup Style API v2", () => {
  test("applies the item slot to every prompt", () => {
    const { container, wrapper } = renderGroup({ item: "a", unknown: "b" });
    for (const id of ["one", "two"]) {
      expect(wrapper.findItemById(id)!.getElement()).toHaveClass("a");
    }
    expect(container.querySelector(".b")).toBeNull();
  });

  test("accepts a callback for the item slot", () => {
    const { wrapper } = renderGroup({ item: ({ item }: { item: SupportPromptGroupProps.Item }) => `item-${item.id}` });
    expect(wrapper.findItemById("one")!.getElement()).toHaveClass("item-one");
    expect(wrapper.findItemById("two")!.getElement()).toHaveClass("item-two");
  });

  test("does not leak the styleClassNames prop to the DOM", () => {
    const { container } = renderGroup({ item: "a" });
    expect(container.querySelector("[styleClassNames]")).toBeNull();
  });
});

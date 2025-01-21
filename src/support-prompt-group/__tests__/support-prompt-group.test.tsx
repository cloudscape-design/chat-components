// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import SupportPromptGroup, { SupportPromptGroupProps } from "../../../lib/components/support-prompt-group";
import createWrapper from "../../../lib/components/test-utils/dom";

import styles from "../../../lib/components/support-prompt-group/styles.selectors.js";

const onItemClick = vi.fn();

const defaultProps = {
  onItemClick,
  ariaLabel: "Test support prompt group",
};

function renderSupportPromptGroup(props: SupportPromptGroupProps) {
  const { container } = render(<SupportPromptGroup {...props} />);

  return createWrapper(container).findSupportPromptGroup()!;
}

describe("Support prompt group", () => {
  test("Renders null with no items", () => {
    const wrapper = renderSupportPromptGroup({
      ...defaultProps,
      items: [],
    });

    expect(wrapper).toBeNull();
  });

  test("Finds number of items", () => {
    const wrapper = renderSupportPromptGroup({
      ...defaultProps,
      items: [
        {
          text: "Item 1",
          id: "item-1",
        },
        {
          text: "Item 2",
          id: "item-2",
        },
      ],
    });

    expect(wrapper.findItems().length).toBe(2);
  });

  test("Finds item by id", () => {
    const wrapper = renderSupportPromptGroup({
      ...defaultProps,
      items: [
        {
          text: "Item 1",
          id: "item-1",
        },
        {
          text: "Item 2",
          id: "item-2",
        },
      ],
    });

    expect(wrapper.findItemById("item-1")?.getElement()).toHaveTextContent("Item 1");
  });

  test("fires onClick", () => {
    const wrapper = renderSupportPromptGroup({
      ...defaultProps,
      items: [
        {
          text: "Item 1",
          id: "item-1",
        },
      ],
    });

    wrapper.findItemById("item-1")!.click();

    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  test("Assigns vertical class with vertical alignment", () => {
    const wrapper = renderSupportPromptGroup({
      ...defaultProps,
      alignment: "vertical",
      items: [
        {
          text: "Item 1",
          id: "item-1",
        },
      ],
    });

    expect(wrapper.getElement()).toHaveClass(styles.vertical);
  });

  describe("a11y", () => {
    test("Assigns correct aria label", () => {
      const wrapper = renderSupportPromptGroup({
        ...defaultProps,
        items: [
          {
            text: "Item 1",
            id: "item-1",
          },
        ],
      });

      expect(wrapper.getElement()).toHaveAccessibleName("Test support prompt group");
    });
  });
});

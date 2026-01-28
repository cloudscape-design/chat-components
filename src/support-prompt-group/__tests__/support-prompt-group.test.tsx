// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import * as ComponentToolkitInternal from "@cloudscape-design/component-toolkit/internal";

import SupportPromptGroup, { SupportPromptGroupProps } from "../../../lib/components/support-prompt-group";
import createWrapper from "../../../lib/components/test-utils/dom";

import styles from "../../../lib/components/support-prompt-group/styles.selectors.js";

vi.mock("@cloudscape-design/component-toolkit/internal", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@cloudscape-design/component-toolkit/internal")>();
  return {
    ...actual,
    warnOnce: vi.fn(),
  };
});

const warnOnce = vi.mocked(ComponentToolkitInternal.warnOnce);

const onItemClick = vi.fn();

const defaultProps = {
  onItemClick,
  ariaLabel: "Test support prompt group",
  items: [
    {
      text: "Item 1",
      id: "item-1",
    },
    {
      text: "Item 2",
      id: "item-2",
    },
    {
      text: "Item 3",
      id: "item-3",
    },
  ],
};

export function renderSupportPromptGroup(
  props: Partial<SupportPromptGroupProps>,
  ref?: React.Ref<SupportPromptGroupProps.Ref>,
) {
  const renderResult = render(<SupportPromptGroup ref={ref} {...defaultProps} {...props} />);
  const wrapper = createWrapper(renderResult.container).findSupportPromptGroup()!;

  return wrapper;
}

describe("Support prompt group", () => {
  afterEach(() => {
    cleanup();
  });

  test("Renders null with no items", () => {
    const wrapper = renderSupportPromptGroup({
      items: [],
    });

    expect(wrapper).toBeNull();
  });

  test("Finds number of items", () => {
    const wrapper = renderSupportPromptGroup({});

    expect(wrapper.findItems().length).toBe(3);
  });

  test("Finds item by id", () => {
    const wrapper = renderSupportPromptGroup({});

    expect(wrapper.findItemById("item-1")!.getElement()).toHaveTextContent("Item 1");
  });

  test("fires onClick", () => {
    const wrapper = renderSupportPromptGroup({});

    wrapper.findItemById("item-1")!.click();

    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  test("Assigns vertical class with vertical alignment", () => {
    const wrapper = renderSupportPromptGroup({
      alignment: "vertical",
    });

    expect(wrapper.getElement()).toHaveClass(styles.vertical);
  });

  describe("a11y", () => {
    test("Group has accessible name", () => {
      const wrapper = renderSupportPromptGroup({});

      expect(wrapper.getElement()).toHaveAccessibleName("Test support prompt group");
    });

    test("Prompt has accessible name", () => {
      const wrapper = renderSupportPromptGroup({});

      expect(wrapper.findItemById("item-1")!.getElement()).toHaveAccessibleName("Item 1");
    });
  });

  describe("focus", () => {
    const ref: { current: SupportPromptGroupProps.Ref | null } = { current: null };

    test("Focuses on element using ref", () => {
      const wrapper = renderSupportPromptGroup({}, ref);

      ref.current!.focus("item-1");

      expect(wrapper.findItemById("item-1")!.getElement()).toHaveFocus();
    });

    test("Throws console warning when no ID is found", () => {
      renderSupportPromptGroup({}, ref);

      ref.current!.focus("doesnt-exist");

      expect(document.body).toHaveFocus();

      expect(warnOnce).toHaveBeenCalledTimes(1);
      expect(warnOnce).toHaveBeenCalledWith("SupportPromptGroup", `No matching ID found to focus.`);
    });
  });
  describe("Keyboard navigation", () => {
    const ref: { current: SupportPromptGroupProps.Ref | null } = { current: null };
    const { KeyCode } = ComponentToolkitInternal;

    test("Arrow keys move focus in vertical alignment", () => {
      const wrapper = renderSupportPromptGroup({}, ref);

      ref.current!.focus("item-1");

      fireEvent.keyDown(wrapper.getElement(), { keyCode: KeyCode.right });
      expect(wrapper.findItemById("item-2")!.getElement()).toHaveFocus();

      fireEvent.keyDown(wrapper.getElement(), { keyCode: KeyCode.down });
      expect(wrapper.findItemById("item-3")!.getElement()).toHaveFocus();
    });

    test("Arrow keys move focus in horizontal alignment", () => {
      const wrapper = renderSupportPromptGroup({ alignment: "horizontal" }, ref);

      ref.current!.focus("item-1");

      fireEvent.keyDown(wrapper.getElement(), { keyCode: KeyCode.down });
      expect(wrapper.findItemById("item-2")!.getElement()).toHaveFocus();

      fireEvent.keyDown(wrapper.getElement(), { keyCode: KeyCode.right });
      expect(wrapper.findItemById("item-3")!.getElement()).toHaveFocus();
    });

    test("Focus loops", () => {
      const wrapper = renderSupportPromptGroup({}, ref);

      ref.current!.focus("item-1");

      fireEvent.keyDown(wrapper.getElement(), { keyCode: KeyCode.right });
      fireEvent.keyDown(wrapper.getElement(), { keyCode: KeyCode.right });
      fireEvent.keyDown(wrapper.getElement(), { keyCode: KeyCode.right });
      fireEvent.keyDown(wrapper.getElement(), { keyCode: KeyCode.right });
      expect(wrapper.findItemById("item-2")!.getElement()).toHaveFocus();
    });

    test("Modifier keys don't move focus", () => {
      const wrapper = renderSupportPromptGroup({}, ref);

      ref.current!.focus("item-1");

      fireEvent.keyDown(wrapper.getElement(), { keyCode: KeyCode.down, ctrlKey: true });
      expect(wrapper.findItemById("item-1")!.getElement()).toHaveFocus();
    });

    test("Nonexistent target doesn't move focus", () => {
      const wrapper = renderSupportPromptGroup({}, ref);
      ref.current!.focus("doesnt-exist");

      fireEvent.keyDown(wrapper.getElement(), { keyCode: KeyCode.down });
      expect(document.body).toHaveFocus();
    });
  });
});

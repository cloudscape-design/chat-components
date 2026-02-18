// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import SupportPromptGroup, { SupportPromptGroupProps } from "../../../lib/components/support-prompt-group";
import createWrapper from "../../../lib/components/test-utils/dom";

const onItemClick = vi.fn();

const defaultProps = {
  onItemClick,
  ariaLabel: "Test support prompt group",
};

function renderSupportPromptGroup(
  props: Partial<SupportPromptGroupProps> & { items: ReadonlyArray<SupportPromptGroupProps.Item> },
) {
  const renderResult = render(<SupportPromptGroup {...defaultProps} {...props} />);
  const wrapper = createWrapper(renderResult.container).findSupportPromptGroup()!;
  return { wrapper, container: renderResult.container };
}

describe("Icon Rendering", () => {
  afterEach(() => {
    cleanup();
  });

  test("items with iconName render icons", () => {
    const items = [
      { text: "Edit", id: "edit-1", iconName: "edit" as const },
      { text: "Settings", id: "settings-1", iconName: "settings" as const },
    ];

    const { wrapper, container } = renderSupportPromptGroup({ items });

    for (const item of items) {
      const itemElement = wrapper.findItemById(item.id);
      expect(itemElement).not.toBeNull();

      const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
      const iconElement = buttonElement?.querySelector("svg");
      expect(iconElement).not.toBeNull();
    }
  });

  test("items with iconSvg render custom icons", () => {
    const item = {
      text: "Custom",
      id: "custom-1",
      iconSvg: (
        <svg>
          <circle r="5" />
        </svg>
      ),
    };

    const { wrapper, container } = renderSupportPromptGroup({ items: [item] });

    const itemElement = wrapper.findItemById(item.id);
    expect(itemElement).not.toBeNull();

    const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
    const iconElement = buttonElement?.querySelector("svg");
    expect(iconElement).not.toBeNull();
  });

  test("items without icon properties do not render icons", () => {
    const items = [
      { text: "Plain 1", id: "plain-1" },
      { text: "Plain 2", id: "plain-2" },
    ];

    const { wrapper, container } = renderSupportPromptGroup({ items });

    for (const item of items) {
      const itemElement = wrapper.findItemById(item.id);
      expect(itemElement).not.toBeNull();

      const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
      const iconElement = buttonElement?.querySelector("svg");
      expect(iconElement).toBeNull();
    }
  });
});

describe("IconSvg Precedence", () => {
  afterEach(() => {
    cleanup();
  });

  test("iconSvg takes precedence over iconName", () => {
    const item = {
      text: "Test",
      id: "test-1",
      iconName: "edit" as const,
      iconSvg: (
        <svg data-testid="custom-svg">
          <circle r="10" />
        </svg>
      ),
    };

    const { container } = renderSupportPromptGroup({ items: [item] });

    const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
    expect(buttonElement).not.toBeNull();

    const customSvg = buttonElement?.querySelector(`[data-testid="custom-svg"]`);
    expect(customSvg).not.toBeNull();
  });
});

describe("Icon Positioning", () => {
  afterEach(() => {
    cleanup();
  });

  test("icon position left - icon appears before text", () => {
    const items = [
      { text: "Edit", id: "edit-1", iconName: "edit" as const, iconPosition: "left" as const },
      { text: "Search", id: "search-1", iconName: "search" as const }, // default is left
    ];

    for (const item of items) {
      const { container } = renderSupportPromptGroup({ items: [item] });

      const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
      const children = Array.from(buttonElement?.children || []);

      expect(children.length).toBe(2);
      expect(children[0]?.querySelector("svg")).not.toBeNull(); // icon first
      expect(children[1]?.querySelector("svg")).toBeNull(); // text second

      cleanup();
    }
  });

  test("icon position right - icon appears after text", () => {
    const items = [
      { text: "Edit", id: "edit-2", iconName: "edit" as const, iconPosition: "right" as const },
      { text: "Settings", id: "settings-2", iconName: "settings" as const, iconPosition: "right" as const },
    ];

    for (const item of items) {
      const { container } = renderSupportPromptGroup({ items: [item] });

      const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
      const children = Array.from(buttonElement?.children || []);

      expect(children.length).toBe(2);
      expect(children[0]?.querySelector("svg")).toBeNull(); // text first
      expect(children[1]?.querySelector("svg")).not.toBeNull(); // icon second

      cleanup();
    }
  });
});

describe("IconPosition Without Icon", () => {
  afterEach(() => {
    cleanup();
  });

  test("iconPosition is ignored when no icon is present", () => {
    const items = [
      { text: "Plain 1", id: "plain-1", iconPosition: "left" as const },
      { text: "Plain 2", id: "plain-2", iconPosition: "right" as const },
    ];

    const { container } = renderSupportPromptGroup({ items });

    for (const item of items) {
      const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
      expect(buttonElement).not.toBeNull();

      const iconElement = buttonElement?.querySelector("svg");
      expect(iconElement).toBeNull();

      const textSpan = buttonElement?.querySelector("span");
      expect(textSpan?.textContent).toBe(item.text);
    }
  });
});

describe("AriaLabel Handling", () => {
  afterEach(() => {
    cleanup();
  });

  test("ariaLabel is applied when provided", () => {
    const items = [
      { text: "Edit", id: "edit-1", ariaLabel: "Edit this item" },
      { text: "Settings", id: "settings-1", ariaLabel: "Open settings menu" },
    ];

    for (const item of items) {
      const { container } = renderSupportPromptGroup({ items: [item] });

      const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
      const ariaLabel = buttonElement?.getAttribute("aria-label");
      expect(ariaLabel).toBe(item.ariaLabel);

      cleanup();
    }
  });

  test("text is used as accessible name when ariaLabel is not provided", () => {
    const items = [
      { text: "Edit", id: "edit-2" },
      { text: "Settings", id: "settings-2" },
    ];

    for (const item of items) {
      const { container } = renderSupportPromptGroup({ items: [item] });

      const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
      // When ariaLabel is not provided, the button should not have an aria-label attribute
      // The accessible name will be derived from the text content
      const ariaLabel = buttonElement?.getAttribute("aria-label");
      expect(ariaLabel).toBeNull();

      cleanup();
    }
  });

  test("ariaLabel works with icon properties", () => {
    const items = [
      { text: "Edit", id: "edit-icon-1", iconName: "edit" as const, ariaLabel: "Edit this document" },
      {
        text: "Custom",
        id: "custom-icon-1",
        iconSvg: (
          <svg>
            <circle r="5" />
          </svg>
        ),
        ariaLabel: "Custom action",
      },
    ];

    for (const item of items) {
      const { container } = renderSupportPromptGroup({ items: [item] });

      const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
      const ariaLabel = buttonElement?.getAttribute("aria-label");
      expect(ariaLabel).toBe(item.ariaLabel);

      cleanup();
    }
  });
});

describe("ARIA Roles Preservation", () => {
  afterEach(() => {
    cleanup();
  });

  test("all prompt buttons have role=menuitem", () => {
    const items = [
      { text: "Edit", id: "edit-1", iconName: "edit" as const },
      { text: "Plain", id: "plain-1" },
      {
        text: "Custom",
        id: "custom-1",
        iconSvg: (
          <svg>
            <circle r="5" />
          </svg>
        ),
      },
    ];

    const { container } = renderSupportPromptGroup({ items });

    for (const item of items) {
      const buttonElement = container.querySelector(`[data-testid="${item.id}"]`);
      const role = buttonElement?.getAttribute("role");
      expect(role).toBe("menuitem");
    }
  });

  test("container has role=menubar with ariaLabel", () => {
    const items = [
      { text: "Edit", id: "edit-1", iconName: "edit" as const },
      { text: "Delete", id: "delete-1" },
    ];

    const { container } = renderSupportPromptGroup({ items, ariaLabel: "Support actions" });

    const menubar = container.querySelector('[role="menubar"]');
    expect(menubar).not.toBeNull();
    expect(menubar?.getAttribute("aria-label")).toBe("Support actions");
  });
});

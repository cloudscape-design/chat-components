// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import * as ComponentToolkitInternal from "@cloudscape-design/component-toolkit/internal";

import Avatar, { AvatarProps } from "../../../lib/components/avatar";
import createWrapper from "../../../lib/components/test-utils/dom";

import loadingDotsStyles from "../../../lib/components/avatar/loading-dots/styles.selectors.js";

const defaultAvatarProps: AvatarProps = { ariaLabel: "Avatar" };

function renderAvatar(props: AvatarProps) {
  const { container } = render(<Avatar {...props} />);

  return createWrapper(container).findAvatar()!;
}

describe("Avatar", () => {
  afterEach(() => {
    cleanup();
  });

  test("Renders avatar with initials", () => {
    const initials = "JD";
    const wrapper = renderAvatar({ ...defaultAvatarProps, initials });

    expect(wrapper.getElement().textContent).toBe(initials);
  });

  test("Shows tooltip on focus", () => {
    const tooltipText = "Jane Doe";
    const wrapper = renderAvatar({ ...defaultAvatarProps, color: "default", tooltipText });
    wrapper.focus();
    expect(wrapper.findTooltip()?.getElement().textContent).toBe(tooltipText);

    wrapper?.blur();
    expect(wrapper.findTooltip()?.getElement()).toBeUndefined();
  });

  test("Shows tooltip on mouse enter", () => {
    const tooltipText = "Jane Doe";
    const wrapper = renderAvatar({ ...defaultAvatarProps, color: "default", tooltipText });
    act(() => {
      fireEvent.mouseEnter(wrapper.getElement());
    });
    expect(wrapper.findTooltip()?.getElement().textContent).toBe(tooltipText);

    act(() => {
      fireEvent.mouseLeave(wrapper.getElement());
    });
    expect(wrapper.findTooltip()?.getElement()).toBeUndefined();
  });

  test("Does not render tooltip when tooltipText is not passed", () => {
    const wrapper = renderAvatar({ ...defaultAvatarProps, color: "default" });
    wrapper.focus();
    expect(wrapper.findTooltip()?.getElement()).toBeUndefined();
  });

  test("Renders avatar in loading state", () => {
    const wrapper = renderAvatar({ ...defaultAvatarProps, loading: true });

    const loading = wrapper.findByClassName(loadingDotsStyles.root)?.getElement();
    expect(loading).toBeInTheDocument();
  });

  test("Loading takes precedence over initials", () => {
    const initials = "JD";
    const wrapper = renderAvatar({ ...defaultAvatarProps, initials, loading: true });

    const loading = wrapper.findByClassName(loadingDotsStyles.root)?.getElement();
    expect(loading).toBeInTheDocument();
  });

  test("Shows warning when initials length is longer than 2", () => {
    const warnOnce = vi.spyOn(ComponentToolkitInternal, "warnOnce");

    const initials = "JDD";
    renderAvatar({ ...defaultAvatarProps, initials });

    expect(warnOnce).toHaveBeenCalledTimes(1);
    expect(warnOnce).toHaveBeenCalledWith(
      "Avatar",
      `"initials" is longer than 2 characters. Only the first two characters are shown.`,
    );
  });

  test.skip("a11y - Validates", async () => {
    const props: AvatarProps = {
      color: "default",
      initials: "JD",
      tooltipText: "Jane Doe",
      ariaLabel: "User avatar",
    };
    const { container } = render(<Avatar {...props} />);
    await expect(container).toValidateA11y();
  });

  test("a11y - ariaLabel is directly used", () => {
    const ariaLabel = "User avatar JD Jane Doe";
    const wrapper = renderAvatar({ ariaLabel, initials: "JD", tooltipText: "Jane Doe" });
    expect(wrapper.getElement()).toHaveAttribute("aria-label", ariaLabel);
  });
});

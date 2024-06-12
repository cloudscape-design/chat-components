// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import Avatar from "../../../lib/components/avatar";
import createWrapper from "../../../lib/components/test-utils/dom";

describe("Avatar", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders avatar", () => {
    render(<Avatar initials="GW" />);
    const wrapper = createWrapper().findAvatar()!;

    expect(wrapper.getElement().textContent).toBe("GW");
  });
});

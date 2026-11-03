// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import Avatar from "../../../lib/components/avatar";
import createWrapper from "../../../lib/components/test-utils/dom";

describe("Avatar Style API v2", () => {
  test("applies styleClassNames to the root slot", () => {
    const { container } = render(
      <Avatar ariaLabel="Avatar" {...({ styleClassNames: { root: "a", unknown: "b" } } as object)} />,
    );
    expect(createWrapper(container).findAvatar()!.getElement()).toHaveClass("a");
    expect(container.querySelector(".b")).toBeNull();
  });

  test("does not leak the styleClassNames prop to the DOM", () => {
    const { container } = render(<Avatar ariaLabel="Avatar" {...({ styleClassNames: { root: "a" } } as object)} />);
    expect(container.querySelector("[styleClassNames]")).toBeNull();
  });
});

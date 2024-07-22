// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line no-restricted-imports
import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { useMergeRefs } from "../use-merge-refs";

const Demo = React.forwardRef((props, ref) => {
  const ref2 = React.createRef<HTMLDivElement>();
  const mergedRef = useMergeRefs(ref, ref2);
  return (
    <>
      <div ref={mergedRef} className="element1"></div>
    </>
  );
});

describe("use merge refs", function () {
  test("merges two refs", () => {
    const ref1 = React.createRef<HTMLDivElement>();
    render(<Demo ref={ref1} />);
    expect(ref1.current).toHaveClass("element1");
  });
  test("ref callback has been called", () => {
    const ref1 = vi.fn();
    render(<Demo ref={ref1} />);
    expect(ref1).toHaveBeenCalledTimes(1);
    expect(ref1).toHaveBeenCalledWith(expect.objectContaining({ className: "element1" }));
  });
});

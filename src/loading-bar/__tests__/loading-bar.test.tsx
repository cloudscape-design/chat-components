// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import LoadingBar from "../../../lib/components/loading-bar";
import createWrapper from "../../../lib/components/test-utils/dom";

describe("LoadingBar", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders LoadingBar", () => {
    render(<LoadingBar variant="gen-ai" />);
    const wrapper = createWrapper().findLoadingBar()!;

    expect(wrapper.getElement()).toBeTruthy();
  });
});

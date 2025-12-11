// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { afterEach, describe, expect, test, vi } from "vitest";

import { getBubbleStyle, getChatBubbleRootStyle } from "../style";

vi.mock("../internal/environment", () => ({
  SYSTEM: "core",
}));

const allStyles = {
  root: {
    columnGap: "10px",
  },
  bubble: {
    background: "#f0f0f0",
    borderColor: "#ccc",
    borderRadius: "8px",
    borderWidth: "2px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    color: "#333",
    fontSize: "16px",
    fontWeight: "500",
    rowGap: "12px",
    paddingBlock: "20px",
    paddingInline: "24px",
  },
};

describe("getChatBubbleRootStyle", () => {
  afterEach(() => {
    vi.resetModules();
  });

  test("handles all possible style configurations", () => {
    expect(getChatBubbleRootStyle(undefined)).toMatchSnapshot();
    expect(getChatBubbleRootStyle({})).toMatchSnapshot();
    expect(getChatBubbleRootStyle(allStyles)).toMatchSnapshot();
  });

  test("returns empty object when SYSTEM is not core", async () => {
    vi.resetModules();
    vi.doMock("../internal/environment", () => ({
      SYSTEM: "visual-refresh",
    }));

    const { getChatBubbleRootStyle: getChatBubbleRootStyleNonCore } = await import("../style.js");

    const style = {
      root: {
        columnGap: "10px",
      },
    };

    const result = getChatBubbleRootStyleNonCore(style);
    expect(result).toEqual({});
  });
});

describe("getBubbleStyle", () => {
  afterEach(() => {
    vi.resetModules();
  });

  test("handles all possible style configurations", () => {
    expect(getBubbleStyle(undefined)).toMatchSnapshot();
    expect(getBubbleStyle({})).toMatchSnapshot();
    expect(getBubbleStyle(allStyles)).toMatchSnapshot();
  });

  test("returns empty object when SYSTEM is not core", async () => {
    vi.resetModules();
    vi.doMock("../internal/environment", () => ({
      SYSTEM: "visual-refresh",
    }));

    const { getBubbleStyle: getBubbleStyleNonCore } = await import("../style.js");

    const style = {
      bubble: {
        background: "#f0f0f0",
        borderRadius: "8px",
        fontSize: "16px",
      },
    };

    const result = getBubbleStyleNonCore(style);
    expect(result).toEqual({});
  });
});

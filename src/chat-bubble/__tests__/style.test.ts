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
    borderStyle: "dashed",
    borderWidth: "2px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    fontWeight: "500",
    letterSpacing: "0.5px",
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

  test("defaults borderStyle to 'solid' when borderWidth is set but borderStyle is not", () => {
    const result = getBubbleStyle({ bubble: { borderWidth: "1px" } });
    expect(result.borderStyle).toBe("solid");
  });

  test("uses explicit borderStyle when provided alongside borderWidth", () => {
    const result = getBubbleStyle({ bubble: { borderWidth: "2px", borderStyle: "dashed" } });
    expect(result.borderStyle).toBe("dashed");
  });

  test("uses explicit borderStyle when provided without borderWidth", () => {
    const result = getBubbleStyle({ bubble: { borderStyle: "dotted" } });
    expect(result.borderStyle).toBe("dotted");
  });

  test("borderStyle is undefined when neither borderWidth nor borderStyle is set", () => {
    const result = getBubbleStyle({ bubble: { background: "#fff" } });
    expect(result.borderStyle).toBeUndefined();
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

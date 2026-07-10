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

  // ── borderStyle fallback — three-branch matrix ────────────────────────────

  test("borderStyle: explicit value wins over solid fallback (with borderWidth)", () => {
    // Branch (a): borderStyle provided — ?? left-hand side is truthy, used verbatim
    expect(getBubbleStyle({ bubble: { borderWidth: "2px", borderStyle: "dashed" } }).borderStyle).toBe("dashed");
    // Also covers 'none' — must NOT be overridden to 'solid'
    expect(getBubbleStyle({ bubble: { borderWidth: "2px", borderStyle: "none" } }).borderStyle).toBe("none");
  });

  test("borderStyle: explicit value used without borderWidth", () => {
    // Branch (a) without borderWidth — borderStyle still emitted
    expect(getBubbleStyle({ bubble: { borderStyle: "dotted" } }).borderStyle).toBe("dotted");
  });

  test("borderStyle: falls back to 'solid' when borderWidth is set but borderStyle is not (regression guard)", () => {
    // Branch (b): borderStyle absent, borderWidth present → ?? right-hand side ternary true branch
    const result = getBubbleStyle({ bubble: { borderWidth: "1px" } });
    expect(result.borderStyle).toBe("solid");
    expect(result.borderWidth).toBe("1px");
  });

  test("borderStyle: undefined when neither borderWidth nor borderStyle is set", () => {
    // Branch (c): both absent → ?? right-hand side ternary false branch
    expect(getBubbleStyle({ bubble: { background: "#fff" } }).borderStyle).toBeUndefined();
  });

  test("borderStyle does not disturb sibling border props", () => {
    const result = getBubbleStyle({
      bubble: { borderColor: "#0077cc", borderRadius: "8px", borderStyle: "dashed", borderWidth: "2px" },
    });
    expect(result.borderStyle).toBe("dashed");
    expect(result.borderColor).toBe("#0077cc");
    expect(result.borderRadius).toBe("8px");
    expect(result.borderWidth).toBe("2px");
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

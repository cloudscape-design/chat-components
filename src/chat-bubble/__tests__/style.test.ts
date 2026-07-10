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

  // ── borderStyle fallback logic ────────────────────────────────────────────

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

  // ── extended borderStyle matrix ───────────────────────────────────────────

  test("emits 'dotted' verbatim regardless of borderWidth being absent", () => {
    const result = getBubbleStyle({ bubble: { borderStyle: "dotted" } });
    expect(result.borderStyle).toBe("dotted");
  });

  test("emits 'none' verbatim — explicit borderStyle wins over solid fallback even when borderWidth is set", () => {
    // 'none' must not be overridden to 'solid' just because borderWidth is present
    const result = getBubbleStyle({ bubble: { borderWidth: "2px", borderStyle: "none" } });
    expect(result.borderStyle).toBe("none");
  });

  test("emits 'double' verbatim alongside borderWidth", () => {
    const result = getBubbleStyle({ bubble: { borderWidth: "4px", borderStyle: "double" } });
    expect(result.borderStyle).toBe("double");
  });

  test("borderWidth set without borderStyle always falls back to 'solid' (regression guard)", () => {
    // This is the pre-existing legacy behaviour; must never regress to undefined
    const result = getBubbleStyle({ bubble: { borderWidth: "3px" } });
    expect(result.borderStyle).toBe("solid");
    expect(result.borderWidth).toBe("3px");
  });

  test("borderStyle does not disturb borderColor when set together", () => {
    const result = getBubbleStyle({ bubble: { borderColor: "#ff0000", borderStyle: "dashed" } });
    expect(result.borderStyle).toBe("dashed");
    expect(result.borderColor).toBe("#ff0000");
  });

  test("borderStyle does not disturb borderRadius when set together", () => {
    const result = getBubbleStyle({ bubble: { borderRadius: "12px", borderStyle: "dotted" } });
    expect(result.borderStyle).toBe("dotted");
    expect(result.borderRadius).toBe("12px");
  });

  test("borderStyle, borderColor, borderWidth, and borderRadius all coexist correctly", () => {
    const result = getBubbleStyle({
      bubble: {
        borderColor: "#0077cc",
        borderRadius: "8px",
        borderStyle: "dashed",
        borderWidth: "2px",
      },
    });
    expect(result.borderStyle).toBe("dashed");
    expect(result.borderColor).toBe("#0077cc");
    expect(result.borderRadius).toBe("8px");
    expect(result.borderWidth).toBe("2px");
  });

  test("non-border props are unaffected when only borderStyle is set", () => {
    const result = getBubbleStyle({
      bubble: {
        background: "#fff",
        color: "#333",
        fontSize: "14px",
        borderStyle: "dashed",
      },
    });
    expect(result.borderStyle).toBe("dashed");
    expect(result.background).toBe("#fff");
    expect(result.color).toBe("#333");
    expect(result.fontSize).toBe("14px");
    // unset border props must remain undefined (not coerced to 'solid')
    expect(result.borderWidth).toBeUndefined();
    expect(result.borderColor).toBeUndefined();
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

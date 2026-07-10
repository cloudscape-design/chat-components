// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { afterEach, describe, expect, test, vi } from "vitest";

import { getContentStyles, getImageStyles, getLoadingDotsStyle, getRootStyles } from "../style";

vi.mock("../internal/environment", () => ({
  SYSTEM: "core",
}));

const allStyles = {
  root: {
    background: "#f0f0f0",
    borderColor: "#ccc",
    borderRadius: "50%",
    borderWidth: "2px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    color: "#333",
    focusRing: {
      borderColor: "#0077cc",
      borderRadius: "50%",
      borderWidth: "2px",
    },
  },
};

type StyleRecord = Record<string, unknown>;

describe("getRootStyles", () => {
  test("returns empty object when style is undefined", () => {
    expect(getRootStyles(undefined)).toEqual({});
  });

  test("returns empty object when style.root is not set", () => {
    expect(getRootStyles({})).toEqual({});
  });

  test("maps all root style properties when SYSTEM is core", () => {
    const result = getRootStyles(allStyles) as StyleRecord;
    expect(result.background).toBe("#f0f0f0");
    expect(result.borderRadius).toBe("50%");
    expect(result.boxShadow).toBe("0 2px 4px rgba(0,0,0,0.2)");
    expect(result.color).toBe("#333");
    // CSS custom properties are also set
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });
});

describe("getContentStyles", () => {
  test("returns empty object when style is undefined", () => {
    expect(getContentStyles(undefined)).toEqual({});
  });

  test("maps border props when SYSTEM is core", () => {
    const result = getContentStyles(allStyles) as StyleRecord;
    expect(result.borderColor).toBe("#ccc");
    expect(result.borderRadius).toBe("50%");
    expect(result.borderWidth).toBe("2px");
    // borderStyle is set to "solid" when borderWidth is present
    expect(result.borderStyle).toBe("solid");
  });
});

describe("getImageStyles", () => {
  afterEach(() => {
    vi.resetModules();
  });

  test("returns empty object when style is undefined", () => {
    expect(getImageStyles(undefined)).toEqual({});
  });

  test("returns empty object when style.root is not set", () => {
    expect(getImageStyles({})).toEqual({});
  });

  test("maps borderRadius when SYSTEM is core and style.root is set", () => {
    // This covers the previously-uncovered branch: SYSTEM=core && style?.root truthy
    const result = getImageStyles(allStyles) as StyleRecord;
    expect(result.borderRadius).toBe("50%");
  });
});

describe("getLoadingDotsStyle", () => {
  afterEach(() => {
    vi.resetModules();
  });

  test("returns empty object when style is undefined", () => {
    expect(getLoadingDotsStyle(undefined)).toEqual({});
  });

  test("returns empty object when style.root is not set", () => {
    expect(getLoadingDotsStyle({})).toEqual({});
  });

  test("maps borderRadius when SYSTEM is core and style.root is set", () => {
    // This covers the previously-uncovered branch: SYSTEM=core && style?.root truthy
    const result = getLoadingDotsStyle(allStyles) as StyleRecord;
    expect(result.borderRadius).toBe("50%");
  });
});

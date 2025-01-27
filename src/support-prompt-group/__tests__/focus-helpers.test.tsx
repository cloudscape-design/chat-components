// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test, vi } from "vitest";

import { getNextFocusTarget, onUnregisterActive } from "../../../lib/components/support-prompt-group/internal.js";

describe("getNextFocusTarget", () => {
  test("should return null if containerObjectRef.current is null", () => {
    const containerObjectRef = { current: null }; // Simulate null container
    const focusedIdRef = { current: null }; // Simulate no focused item

    const result = getNextFocusTarget(containerObjectRef, focusedIdRef);

    expect(result).toBeNull();
  });
});

describe("onUnregisterActive", () => {
  test("should call target.focus() when target exists and has a different dataset.itemid", () => {
    const mockFocus = vi.fn();
    const mockTarget = document.createElement("button");
    mockTarget.dataset.itemid = "different-id";
    mockTarget.focus = mockFocus;

    const mockNavigationAPI = {
      current: {
        getFocusTarget: vi.fn(() => mockTarget),
      },
    };

    const focusableElement = document.createElement("div");
    focusableElement.dataset.itemid = "current-id";

    onUnregisterActive(focusableElement, mockNavigationAPI);

    expect(mockNavigationAPI.current?.getFocusTarget).toHaveBeenCalled();
    expect(mockFocus).toHaveBeenCalledTimes(1);
  });

  test("should not call target.focus() when target.dataset.itemid matches focusableElement.dataset.itemid", () => {
    const mockFocus = vi.fn();
    const mockTarget = document.createElement("button");
    mockTarget.dataset.itemid = "same-id";
    mockTarget.focus = mockFocus;

    const mockNavigationAPI = {
      current: {
        getFocusTarget: vi.fn(() => mockTarget),
      },
    };

    const focusableElement = document.createElement("div");
    focusableElement.dataset.itemid = "same-id";

    onUnregisterActive(focusableElement, mockNavigationAPI);

    expect(mockNavigationAPI.current?.getFocusTarget).toHaveBeenCalled();
    expect(mockFocus).not.toHaveBeenCalled();
  });

  test("should not call target.focus() when getFocusTarget returns null", () => {
    const mockNavigationAPI = {
      current: {
        getFocusTarget: vi.fn(() => null),
      },
    };

    const focusableElement = document.createElement("div");
    focusableElement.dataset.itemid = "current-id";

    onUnregisterActive(focusableElement, mockNavigationAPI);

    expect(mockNavigationAPI.current?.getFocusTarget).toHaveBeenCalled();
  });
});

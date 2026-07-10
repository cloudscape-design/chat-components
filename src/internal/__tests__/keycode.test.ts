// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from "vitest";

import { KeyCode } from "../keycode";

describe("KeyCode", () => {
  it("has the correct numeric values for all key codes", () => {
    expect(KeyCode.pageUp).toEqual(33);
    expect(KeyCode.pageDown).toEqual(34);
    expect(KeyCode.end).toEqual(35);
    expect(KeyCode.home).toEqual(36);
    expect(KeyCode.backspace).toEqual(8);
    expect(KeyCode.space).toEqual(32);
    expect(KeyCode.down).toEqual(40);
    expect(KeyCode.left).toEqual(37);
    expect(KeyCode.right).toEqual(39);
    expect(KeyCode.up).toEqual(38);
    expect(KeyCode.escape).toEqual(27);
    expect(KeyCode.enter).toEqual(13);
    expect(KeyCode.tab).toEqual(9);
    expect(KeyCode.shift).toEqual(16);
    expect(KeyCode.control).toEqual(17);
    expect(KeyCode.alt).toEqual(18);
    expect(KeyCode.meta).toEqual(91);
  });
});

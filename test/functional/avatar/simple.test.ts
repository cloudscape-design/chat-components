// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { BasePageObject } from "@cloudscape-design/browser-test-tools/page-objects";
import { describe, expect, test } from "vitest";
import createWrapper from "../../../lib/components/test-utils/selectors";
import { setupTest } from "../../utils";

const wrapper = createWrapper();
const avatarWrapper = wrapper.findAvatar();

describe("avatar functional tests", () => {
  test(
    "renders",
    setupTest("/index.html#/avatar/simple", BasePageObject, async (page) => {
      await expect(page.getElementsText(avatarWrapper.toSelector())).resolves.toEqual(["GW"]);
    }),
  );
});

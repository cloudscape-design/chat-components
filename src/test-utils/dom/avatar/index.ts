// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/dom";

import createWrapper from "..";

import avatarStyles from "../../../avatar/styles.selectors.js";

export default class AvatarWrapper extends ComponentWrapper {
  static rootSelector: string = avatarStyles.root;

  findTooltip(): ElementWrapper | null {
    return createWrapper().find(`.${avatarStyles.tooltip}`);
  }
}

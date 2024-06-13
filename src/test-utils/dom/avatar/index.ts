// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper } from "@cloudscape-design/test-utils-core/dom";
import avatarStyles from "../../../avatar/styles.selectors.js";

export default class AvatarWrapper extends ComponentWrapper {
  static rootSelector: string = avatarStyles.root;
}

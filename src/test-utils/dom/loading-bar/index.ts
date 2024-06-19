// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper } from "@cloudscape-design/test-utils-core/dom";
import loadingBarStyles from "../../../loading-bar/styles.selectors.js";

export default class LoadingBarWrapper extends ComponentWrapper {
  static rootSelector: string = loadingBarStyles.root;
}

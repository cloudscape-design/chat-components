// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/dom";

import styles from "../../../support-prompt-group/styles.selectors.js";

export default class SupportPromptGroupWrapper extends ComponentWrapper {
  static rootSelector: string = styles.root;

  /**
   * Finds all items.
   */
  findItems(): Array<ElementWrapper> {
    return this.findAllByClassName(styles["support-prompt"]);
  }

  /**
   * Finds a support prompt item by its id.
   */
  findItemById(id: string): null | SupportPromptWrapper {
    const itemSelector = `.${styles["support-prompt"]}[data-testid="${CSS.escape(id)}"]`;
    const wrapper = this.find(itemSelector) as ElementWrapper<HTMLButtonElement>;
    return wrapper && new SupportPromptWrapper(wrapper.getElement());
  }
}

export class SupportPromptWrapper extends ComponentWrapper<HTMLButtonElement> {
  static rootSelector: string = styles["support-prompt"];
}

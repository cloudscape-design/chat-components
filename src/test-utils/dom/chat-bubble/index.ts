// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { ComponentWrapper, ElementWrapper } from "@cloudscape-design/test-utils-core/dom";

import chatBubbleStyles from "../../../chat-bubble/styles.selectors.js";

export default class ChatBubbleWrapper extends ComponentWrapper {
  static rootSelector: string = chatBubbleStyles.root;

  findAvatarSlot(): ElementWrapper | null {
    return this.findByClassName(chatBubbleStyles.avatar);
  }

  findContent(): ElementWrapper | null {
    return this.findByClassName(chatBubbleStyles.content);
  }

  findActionsSlot(): ElementWrapper | null {
    return this.findByClassName(chatBubbleStyles.actions);
  }
}

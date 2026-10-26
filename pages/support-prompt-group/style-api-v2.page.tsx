// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import clsx from "clsx";

import { SupportPromptGroup, SupportPromptGroupProps } from "../../lib/components";
import { Page } from "../app/templates";

import styles from "./style-api-v2.module.scss";

const items: SupportPromptGroupProps.Item[] = [
  { id: "summarize", text: "Summarize this conversation", iconName: "gen-ai" },
  { id: "explain", text: "Explain the last answer" },
  { id: "draft", text: "Draft a reply" },
];

// The callback form styles one item differently from the others.
const styleClassNames = {
  item: ({ item }: { item: SupportPromptGroupProps.Item }) =>
    clsx(styles.item, item.id === "summarize" && styles["item-featured"]),
};

export default function () {
  return (
    <Page title="Support prompt group - Style API v2">
      <SupportPromptGroup ariaLabel="Prompts" items={items} onItemClick={() => {}} {...{ styleClassNames }} />
    </Page>
  );
}

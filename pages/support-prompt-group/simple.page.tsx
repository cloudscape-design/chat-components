// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { SupportPromptGroup } from "../../lib/components";
import { TestBed } from "../app/test-bed";
import { ScreenshotArea } from "../screenshot-area";

export default function SupportPromptPage() {
  return (
    <ScreenshotArea>
      <h1>Support prompt</h1>
      <main>
        <TestBed>
          <button>Before</button>
          <h2>horizontal group</h2>
          <SupportPromptGroup
            ariaLabel="Horizontal support prompt group"
            alignment="horizontal"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: "Create image",
                id: "image",
              },
              {
                text: "Brainstorm",
                id: "brainstorm",
              },
              {
                text: "Summarize text",
                id: "summarize",
              },
            ]}
          />

          <h2>vertical group</h2>
          <SupportPromptGroup
            ariaLabel="Vertical support prompt group"
            alignment="vertical"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: "Create image",
                id: "image-2",
              },
              {
                text: "Brainstorm",
                id: "brainstorm-2",
              },
              {
                text: "Summarize text",
                id: "summarize-2",
              },
            ]}
          />
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

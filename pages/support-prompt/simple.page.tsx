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
          <h2>horizontal group</h2>
          <SupportPromptGroup
            alignment="horizontal"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                label: "Create image",
              },
              {
                label: "Brainstorm",
              },
              {
                label: "Summarize text",
              },
            ]}
          />

          <h2>vertical group</h2>
          <SupportPromptGroup
            alignment="vertical"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                label: "Create image",
              },
              {
                label: "Brainstorm",
              },
              {
                label: "Summarize text",
              },
            ]}
          />
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

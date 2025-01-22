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

          <h2>group with really long text</h2>
          <SupportPromptGroup
            ariaLabel="Horizontal support prompt group"
            alignment="horizontal"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: "Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. ",
                id: "image",
              },
              {
                text: "Help me brainstorm for an upcoming sign-off. Help me brainstorm for an upcoming sign-off. Help me brainstorm for an upcoming sign-off.",
                id: "brainstorm",
              },
              {
                text: "Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. ",
                id: "summarize",
              },
            ]}
          />

          <h2>vertical group with really long text</h2>
          <SupportPromptGroup
            ariaLabel="Horizontal support prompt group"
            alignment="vertical"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: "Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. Create a really detailed and powerful image. ",
                id: "image",
              },
              {
                text: "Help me brainstorm for an upcoming sign-off. Help me brainstorm for an upcoming sign-off. Help me brainstorm for an upcoming sign-off.",
                id: "brainstorm",
              },
              {
                text: "Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. Summarize this long and complex PDF for me. ",
                id: "summarize",
              },
            ]}
          />
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

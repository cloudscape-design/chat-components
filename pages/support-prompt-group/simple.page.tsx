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

          <h2>Horizontal group with really long text</h2>
          <SupportPromptGroup
            ariaLabel="Horizontal support prompt group"
            alignment="horizontal"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: "Create a really detailed and powerful image. The image should be of a mountain scene with a blue lake and green hills, with a sunset in the background. In the lake, there should be 3 whales leaping out of the water.",
                id: "image",
              },
              {
                text: "Help me brainstorm for an upcoming sign-off.",
                id: "brainstorm",
              },
              {
                text: "Summarize this long and complex PDF for me. Include a paragraph containing 3-4 sentences that capture the main ideas and overall message of the documents, a list of 5 to 10 key points from the document, and up to 3 follow-up questions that arise from the content of the document.",
                id: "summarize",
              },
              {
                text: "What  questions remain unanswered after reading the document(s)? The response shall consider all current or past uploaded documents.",
                id: "image-2",
              },
            ]}
          />

          <h2>vertical group with really long text</h2>
          <SupportPromptGroup
            ariaLabel="Horizontal support prompt group"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: "Create a really detailed and powerful image. The image should be of a mountain scene with a blue lake and green hills, with a sunset in the background. In the lake, there should be 3 whales leaping out of the water.",
                id: "image",
              },
              {
                text: "Help me brainstorm for an upcoming sign-off.",
                id: "brainstorm",
              },
              {
                text: "Summarize this long and complex PDF for me. Include a paragraph containing 3-4 sentences that capture the main ideas and overall message of the documents, a list of 5 to 10 key points from the document, and up to 3 follow-up questions that arise from the content of the document.",
                id: "summarize",
              },
              {
                text: "What  questions remain unanswered after reading the document(s)? The response shall consider all current or past uploaded documents.",
                id: "image-2",
              },
            ]}
          />
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

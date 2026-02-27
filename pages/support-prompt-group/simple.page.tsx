// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { SupportPromptGroup } from "../../lib/components";
import { Page } from "../app/templates";
import { TestBed } from "../app/test-bed";

const longPromptText =
  "Summarize this long and complex PDF for me. Include a paragraph containing 3-4 sentences that capture the main ideas and overall message of the documents, a list of 5 to 10 key points from the document, and up to 3 follow-up questions that arise from the content of the document.";

export default function SupportPromptPage() {
  return (
    <Page title="Support prompt">
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
                text: longPromptText,
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
                text: longPromptText,
                id: "summarize",
              },
              {
                text: "What  questions remain unanswered after reading the document(s)? The response shall consider all current or past uploaded documents.",
                id: "image-2",
              },
            ]}
          />

          <h2>horizontal group with icons (left position)</h2>
          <SupportPromptGroup
            ariaLabel="Support prompts with icons"
            alignment="horizontal"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: "Edit document",
                id: "edit-icon",
                iconName: "edit",
              },
              {
                text: "Generate with AI",
                id: "gen-ai-icon",
                iconName: "gen-ai",
              },
              {
                text: "Search content",
                id: "search-icon",
                iconName: "search",
              },
            ]}
          />

          <h2>vertical group with icons (right position)</h2>
          <SupportPromptGroup
            ariaLabel="Support prompts with right-aligned icons"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: "Settings",
                id: "settings-icon",
                iconName: "settings",
                iconPosition: "right",
              },
              {
                text: "Upload file",
                id: "upload-icon",
                iconName: "upload",
                iconPosition: "right",
              },
              {
                text: "Download results",
                id: "download-icon",
                iconName: "download",
                iconPosition: "right",
              },
            ]}
          />

          <h2>mixed items (with and without icons)</h2>
          <SupportPromptGroup
            ariaLabel="Mixed support prompts"
            alignment="horizontal"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: "Create image",
                id: "create-image",
                iconName: "gen-ai",
                ariaLabel: "Create image (using AI)",
              },
              {
                text: "Brainstorm ideas",
                id: "brainstorm-plain",
              },
              {
                text: "Edit content",
                id: "edit-content",
                iconName: "edit",
                iconPosition: "right",
              },
              {
                text: "Summarize text",
                id: "summarize-plain",
              },
            ]}
          />

          <h2>custom SVG icons</h2>
          <SupportPromptGroup
            ariaLabel="Support prompts with custom SVG icons"
            alignment="horizontal"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: "Custom action 1",
                id: "custom-1",
                iconSvg: (
                  <svg viewBox="0 0 16 16" focusable="false">
                    <circle cx="8" cy="8" r="6" fill="currentColor" />
                  </svg>
                ),
              },
              {
                text: "Custom action 2",
                id: "custom-2",
                iconSvg: (
                  <svg viewBox="0 0 16 16" focusable="false">
                    <rect x="4" y="4" width="8" height="8" fill="currentColor" />
                  </svg>
                ),
                iconPosition: "right",
              },
            ]}
          />

          <h2>icon vertical alignments</h2>
          <SupportPromptGroup
            ariaLabel="Support prompts with different icon alignments"
            alignment="horizontal"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: longPromptText,
                id: "align-start-left",
                iconName: "edit",
                iconVerticalAlignment: "start",
              },
              {
                text: longPromptText,
                id: "align-center-left",
                iconName: "gen-ai",
                iconVerticalAlignment: "center",
              },
              {
                text: longPromptText,
                id: "align-end-left",
                iconName: "search",
                iconVerticalAlignment: "end",
              },
              {
                text: longPromptText,
                id: "align-start-right",
                iconName: "search",
                iconPosition: "right",
                iconVerticalAlignment: "start",
              },
              {
                text: longPromptText,
                id: "align-center-right",
                iconName: "gen-ai",
                iconPosition: "right",
                iconVerticalAlignment: "center",
              },
              {
                text: longPromptText,
                id: "align-end-right",
                iconName: "edit",
                iconPosition: "right",
                iconVerticalAlignment: "end",
              },
            ]}
          />
          <h2>horizontal group with ReactNode content</h2>
          <SupportPromptGroup
            ariaLabel="Support prompt group with ReactNode content"
            alignment="horizontal"
            onItemClick={({ detail }) => console.log(detail)}
            items={[
              {
                text: (
                  <div>
                    <strong>Create image</strong> - Generate a visual
                  </div>
                ),
                id: "react-image",
              },
              {
                text: (
                  <div>
                    <strong>Brainstorm</strong> - Get creative ideas
                  </div>
                ),
                id: "react-brainstorm",
              },
              {
                text: (
                  <div>
                    <strong>Summarize</strong> - Condense text
                  </div>
                ),
                id: "react-summarize",
              },
            ]}
          />
        </TestBed>
      </main>
    </Page>
  );
}

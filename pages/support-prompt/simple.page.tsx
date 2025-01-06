// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import SpaceBetween from "@cloudscape-design/components/space-between";

import { SupportPrompt } from "../../lib/components";
import { TestBed } from "../app/test-bed";
import { ScreenshotArea } from "../screenshot-area";

export default function SupportPromptPage() {
  return (
    <ScreenshotArea>
      <h1>Support prompt</h1>
      <main>
        <TestBed>
          <h2>solo</h2>
          <SupportPrompt>test</SupportPrompt>

          <h2>group</h2>
          <SpaceBetween direction="horizontal" size="xs">
            <SupportPrompt>test</SupportPrompt>
            <SupportPrompt>test</SupportPrompt>
            <SupportPrompt>test</SupportPrompt>
          </SpaceBetween>
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

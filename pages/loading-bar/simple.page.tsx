// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Box from "@cloudscape-design/components/box";
import Container from "@cloudscape-design/components/container";
import TextContent from "@cloudscape-design/components/text-content";
import { LoadingBar } from "../../lib/components";
import { TestBed } from "../app/test-bed";
import { ScreenshotArea } from "../screenshot-area";

export default function LoadingBarPage() {
  return (
    <ScreenshotArea>
      <h1>Loading bar</h1>
      <main>
        <TestBed>
          <h2>gen-ai</h2>
          <span aria-live="polite">
            <Box margin={{ bottom: "xs", left: "l" }}>
              <TextContent>
                <small>
                  <em>Generating response</em>
                </small>
              </TextContent>
            </Box>
            <LoadingBar variant="gen-ai" />
          </span>
          <h2>gen-ai-masked in container</h2>
          <Container disableContentPaddings={true}>
            <Box padding={{ horizontal: "l", vertical: "s" }}>
              <TextContent>
                <small>
                  <em>Fetching items...</em>
                </small>
              </TextContent>
            </Box>
            <LoadingBar variant="gen-ai-masked" />
          </Container>
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

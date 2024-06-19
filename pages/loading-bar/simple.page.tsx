// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Container from "@cloudscape-design/components/container";
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
          <LoadingBar variant="gen-ai" />
          <h2>gen-ai-masked in container</h2>
          <Container media={{ content: <LoadingBar variant="gen-ai-masked" />, height: 20 }}>
            Some other content
          </Container>
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

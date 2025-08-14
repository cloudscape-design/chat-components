// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Box from "@cloudscape-design/components/box";
import Container from "@cloudscape-design/components/container";

import { LoadingBar } from "../../lib/components";
import { Page } from "../app/templates";
import { TestBed } from "../app/test-bed";

export default function LoadingBarPage() {
  return (
    <Page title="Loading bar">
      <main>
        <TestBed>
          <h2>gen-ai</h2>
          <span aria-live="polite">
            <Box margin={{ bottom: "xs", left: "l" }}>Generating response</Box>
            <LoadingBar variant="gen-ai" />
          </span>
          <h2>gen-ai-masked in container</h2>
          <Container disableContentPaddings={true}>
            <Box padding={{ horizontal: "l", vertical: "s" }}>Fetching items</Box>
            <LoadingBar variant="gen-ai-masked" />
          </Container>
        </TestBed>
      </main>
    </Page>
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Avatar } from "../../lib/components";
import { TestBed } from "../app/test-bed";
import { ScreenshotArea } from "../screenshot-area";

export default function AvatarPage() {
  return (
    <ScreenshotArea>
      <h1>Avatar</h1>
      <main>
        <TestBed>
          <Avatar initials="GW" />
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

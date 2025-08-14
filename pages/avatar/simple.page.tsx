// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useState } from "react";

import SpaceBetween from "@cloudscape-design/components/space-between";
import Toggle from "@cloudscape-design/components/toggle";

import { Avatar } from "../../lib/components";
import { Page } from "../app/templates";

export default function AvatarPage() {
  const [loading, setLoading] = useState(false);
  const [initials, setInitials] = useState(false);

  return (
    <Page title="Avatar">
      <SpaceBetween size="m">
        <Avatar
          color="default"
          loading={loading}
          initials={initials ? "TF" : undefined}
          ariaLabel="User avatar Timothee Fontaka"
          tooltipText="Timothee Fontaka"
        />
        <Avatar
          color="gen-ai"
          iconName="gen-ai"
          loading={loading}
          initials={initials ? "AI" : undefined}
          ariaLabel="Avatar Gen AI assistant"
          tooltipText="Gen AI assistant"
        />

        <Toggle checked={loading} onChange={({ detail }) => setLoading(detail.checked)}>
          Loading
        </Toggle>

        <Toggle checked={initials} onChange={({ detail }) => setInitials(detail.checked)}>
          Initials
        </Toggle>
      </SpaceBetween>
    </Page>
  );
}

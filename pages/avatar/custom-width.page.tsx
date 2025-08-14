// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useState } from "react";

import Checkbox from "@cloudscape-design/components/checkbox";
import FormField from "@cloudscape-design/components/form-field";
import Header from "@cloudscape-design/components/header";
import { IconProps } from "@cloudscape-design/components/icon";
import Input from "@cloudscape-design/components/input";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { Avatar } from "../../lib/components";
import { Page } from "../app/templates";

export default function AvatarImageAndWidth() {
  const [url, setURL] = useState(
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/08/deadpool-wolverine-hugh-jackman-mask-reveal.jpg",
  );
  const [width, setWidth] = useState("100");
  const [initials, setInitials] = useState("SO");
  const [iconName, setIconName] = useState("search");
  const [loading, setLoading] = useState(false);
  const [genAI, setGenAI] = useState(false);

  return (
    <Page title="Custom width">
      <SpaceBetween direction="vertical" size="m">
        <Header>Input an Image URL and custom size.</Header>

        <SpaceBetween alignItems="center" direction="horizontal" size="m">
          <FormField label="Width:">
            <Input onChange={({ detail }) => setWidth(detail.value)} value={width} inputMode="numeric" type="number" />
          </FormField>

          <FormField label="Image URL">
            <Input onChange={({ detail }) => setURL(detail.value)} value={url} />
          </FormField>

          <FormField label="Initials">
            <Input onChange={({ detail }) => setInitials(detail.value)} value={initials} />
          </FormField>

          <FormField label="Icon Name">
            <Input onChange={({ detail }) => setIconName(detail.value)} value={iconName} />
          </FormField>

          <Checkbox onChange={({ detail }) => setLoading(detail.checked)} checked={loading}>
            Loading
          </Checkbox>

          <Checkbox onChange={({ detail }) => setGenAI(detail.checked)} checked={genAI}>
            Gen AI
          </Checkbox>
        </SpaceBetween>

        <Avatar
          ariaLabel="Various Avatar permutations"
          color={genAI ? "gen-ai" : "default"}
          iconName={iconName as IconProps.Name}
          imgUrl={url}
          width={Number(width)}
          initials={initials}
          loading={loading}
        />
      </SpaceBetween>
    </Page>
  );
}

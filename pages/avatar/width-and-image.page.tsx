// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useState } from "react";

import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { Avatar } from "../../lib/components";

export default function AvatarImageAndWidth() {
  const [url, setURL] = useState(
    "https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/08/deadpool-wolverine-hugh-jackman-mask-reveal.jpg",
  );
  const [width, setWidth] = useState("100");

  return (
    <SpaceBetween direction="vertical" size="m">
      <Header>Input an Image URL and custom size.</Header>

      <SpaceBetween direction="horizontal" size="m">
        <Input onChange={({ detail }) => setURL(detail.value)} value={url} />

        <Input onChange={({ detail }) => setWidth(detail.value)} value={width} inputMode="numeric" type="number" />
      </SpaceBetween>

      <Avatar ariaLabel="An awesome picture of Wolverine" initials="WV" imgUrl={url} width={Number(width)} />
    </SpaceBetween>
  );
}

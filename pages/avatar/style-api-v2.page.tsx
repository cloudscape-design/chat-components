// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import SpaceBetween from "@cloudscape-design/components/space-between";

import { Avatar } from "../../lib/components";
import { Page } from "../app/templates";
import smiley from "./smiley.png";

import styles from "./style-api-v2.module.scss";

const brand = { styleClassNames: { root: styles.brand } };
const square = { styleClassNames: { root: styles.square } };

export default function () {
  return (
    <Page title="Avatar - Style API v2">
      <SpaceBetween direction="horizontal" size="m">
        <Avatar ariaLabel="Initials" initials="AB" width={64} tooltipText="Initials" {...brand} />
        <Avatar ariaLabel="Icon" iconName="gen-ai" color="gen-ai" width={64} {...brand} />
        <Avatar ariaLabel="Image" imgUrl={smiley} width={64} {...brand} />
        <Avatar ariaLabel="Loading" loading={true} width={64} {...brand} />
        <Avatar ariaLabel="Square" initials="CD" width={64} {...square} />
      </SpaceBetween>
    </Page>
  );
}

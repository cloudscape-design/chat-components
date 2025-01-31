// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import SpaceBetween from "@cloudscape-design/components/space-between";

import { Avatar } from "../../lib/components";
import { TestBed } from "../app/test-bed";
import { ScreenshotArea } from "../screenshot-area";

const customIconSvg = (
  <svg
    className="w-6 h-6 text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m8 9 3 3-3 3m5 0h3M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
    />
  </svg>
);

const wolverine =
  "https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/08/deadpool-wolverine-hugh-jackman-mask-reveal.jpg";

export default function AvatarPage() {
  return (
    <ScreenshotArea>
      <h1>Avatar</h1>
      <main>
        <TestBed>
          <Avatar ariaLabel="User avatar" />
          <Avatar color="gen-ai" iconName="gen-ai" ariaLabel="Gen AI assistant" />

          <Avatar initials="GW" ariaLabel="User avatar GW" tooltipText="User avatar" />
          <Avatar color="gen-ai" initials="GW" ariaLabel="Gen AI assistant GW" tooltipText="Gen AI assistant" />

          <Avatar loading={true} ariaLabel="User avatar typing" tooltipText="User avatar typing" />

          {/* Loading should take prioirty over image */}
          <Avatar
            color="gen-ai"
            loading={true}
            imgUrl={wolverine}
            ariaLabel="Gen AI assistant generating response"
            tooltipText="Gen AI assistant generating response"
          />

          <Avatar iconSvg={customIconSvg} ariaLabel="Avatar with custom SVG icon" />
          <Avatar color="gen-ai" iconSvg={customIconSvg} ariaLabel="Gen AI avatar with custom SVG icon" />

          <br />

          <SpaceBetween direction="vertical" size="xxs">
            {/* Image with tiny width enforce minimum of 28px */}
            <Avatar ariaLabel="An awesome picture of wolverine" imgUrl={wolverine} width={20} />

            {/* Image with default width of 28px */}
            <Avatar ariaLabel="An awesome picture of wolverine" imgUrl={wolverine} />

            {/* Image should take priority over initials */}
            <Avatar ariaLabel="An awesome picture of wolverine" initials="WV" imgUrl={wolverine} width={40} />

            {/* Image and tooltip should take priority over icon */}
            <Avatar
              ariaLabel="An awesome picture of wolverine"
              tooltipText="Snikt!"
              imgUrl={wolverine}
              iconSvg={customIconSvg}
              width={60}
            />

            {/* Icon SVG with custom width */}
            <Avatar ariaLabel="Avatar with custom SVG icon" iconSvg={customIconSvg} width={60} />

            {/* Icon name with custom width */}
            <Avatar color="gen-ai" iconName="gen-ai" ariaLabel="Gen AI assistant" width={80} />

            {/* Icon name with custom width */}
            <Avatar iconName="calendar" ariaLabel="Gen AI assistant" width={100} />

            {/* Initials with custom width */}
            <Avatar
              color="gen-ai"
              initials="GW"
              ariaLabel="Gen AI assistant GW"
              tooltipText="Gen AI assistant"
              width={140}
            />

            {/* Loading with custom width */}
            <Avatar color="gen-ai" initials="GW" loading={true} ariaLabel="Gen AI assistant GW" width={160} />

            {/* Initials with custom width */}
            <Avatar
              color="gen-ai"
              initials="GW"
              ariaLabel="Gen AI assistant GW"
              tooltipText="Gen AI assistant"
              width={180}
            />

            {/* Loading with custom width */}
            <Avatar color="gen-ai" initials="GW" loading={true} ariaLabel="Gen AI assistant GW" width={200} />
          </SpaceBetween>
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

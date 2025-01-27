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
            imgUrl="https://cdn.marvel.com/content/1x/x-men_origins_-_gambit_2009_1_art_by_david_yardin.jpg"
            ariaLabel="Gen AI assistant generating response"
            tooltipText="Gen AI assistant generating response"
          />

          <Avatar iconSvg={customIconSvg} ariaLabel="Avatar with custom SVG icon" />
          <Avatar color="gen-ai" iconSvg={customIconSvg} ariaLabel="Gen AI avatar with custom SVG icon" />

          <br />

          <SpaceBetween direction="vertical" size="xxs">
            {/* Image with tiny width enforce minimum of 28px */}
            <Avatar
              ariaLabel="An awesome picture of Wolverine"
              imgUrl="https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/08/deadpool-wolverine-hugh-jackman-mask-reveal.jpg"
              width={20}
            />

            {/* Image with default width of 28px */}
            <Avatar
              ariaLabel="An awesome picture of Wolverine"
              imgUrl="https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/08/deadpool-wolverine-hugh-jackman-mask-reveal.jpg"
            />

            {/* Image with custom width should take priority over initials */}
            <Avatar
              ariaLabel="An awesome picture of Wolverine"
              initials="WV"
              imgUrl="https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/08/deadpool-wolverine-hugh-jackman-mask-reveal.jpg"
              width={50}
            />

            {/* Image with custom width and tooltip should take priority over icon */}
            <Avatar
              ariaLabel="An awesome picture of Wolverine"
              tooltipText="Snikt!"
              imgUrl="https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/08/deadpool-wolverine-hugh-jackman-mask-reveal.jpg"
              iconSvg={customIconSvg}
              width={70}
            />

            {/* Icon SVG with custom width not allowed */}
            <Avatar iconSvg={customIconSvg} ariaLabel="Avatar with custom SVG icon" width={90} />

            {/* Initials with custom width not allowed */}
            <Avatar
              color="gen-ai"
              initials="GW"
              ariaLabel="Gen AI assistant GW"
              tooltipText="Gen AI assistant"
              width={110}
            />

            {/* Loading with custom width not allowed */}
            <Avatar
              color="gen-ai"
              initials="GW"
              loading={true}
              ariaLabel="Gen AI assistant GW"
              tooltipText="Gen AI assistant"
              width={110}
            />
          </SpaceBetween>
        </TestBed>
      </main>
    </ScreenshotArea>
  );
}

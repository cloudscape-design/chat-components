// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";

import { Avatar } from "../../lib/components";
import { Page } from "../app/templates";
import { customIconSvg } from "./permutations.page";
import smiley from "./smiley.png";

export default function CustomStyles() {
  return (
    <Page title="Custom Avatars">
      <Container>
        <SpaceBetween direction="horizontal" size="m">
          <Avatar
            color="default"
            initials="AB"
            ariaLabel="AB"
            width={200}
            style={{
              root: {
                background: "#000",
                borderColor: "magenta",
                borderRadius: "16px",
                borderWidth: "8px",
                boxShadow: "0px 0px 10px blue",
                color: "#f7f6ff",
                focusRing: {
                  borderColor: "green",
                  borderRadius: "16px",
                  borderWidth: "4px",
                },
              },
            }}
          />

          <Avatar
            color="default"
            ariaLabel="AB"
            width={80}
            iconSvg={customIconSvg}
            style={{
              root: {
                background: "#000",
                borderColor: "magenta",
                borderRadius: "8px",
                borderWidth: "3px",
                boxShadow: "0px 0px 10px blue",
                color: "#f7f6ff",
                focusRing: {
                  borderColor: "green",
                  borderRadius: "8px",
                  borderWidth: "4px",
                },
              },
            }}
          />

          <Avatar
            color="default"
            ariaLabel="AB"
            width={140}
            imgUrl={smiley}
            style={{
              root: {
                background: "#000",
                borderColor: "green",
                borderRadius: "50%",
                borderWidth: "4px",
                boxShadow: "0px 0px 10px blue",
                color: "#f7f6ff",
                focusRing: {
                  borderColor: "green",
                  borderWidth: "4px",
                },
              },
            }}
          />

          <Avatar
            color="default"
            ariaLabel="AB"
            width={80}
            imgUrl={smiley}
            style={{
              root: {
                borderColor: "green",
                borderRadius: "30px",
                borderWidth: "2px",
                focusRing: {
                  borderColor: "green",
                  borderRadius: "30px",
                  borderWidth: "4px",
                },
              },
            }}
          />

          <Avatar
            color="gen-ai"
            iconName="gen-ai"
            ariaLabel="AB"
            width={80}
            style={{
              root: {
                borderRadius: "0px",
                focusRing: {
                  borderRadius: "0px",
                },
              },
            }}
          />

          <Avatar
            loading={true}
            iconName="gen-ai"
            ariaLabel="AB"
            width={60}
            style={{
              root: {
                background: "blue",
                borderRadius: "14px",
                focusRing: {
                  borderRadius: "14px",
                },
              },
            }}
          />
        </SpaceBetween>
      </Container>
    </Page>
  );
}

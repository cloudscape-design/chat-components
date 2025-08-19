// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useState } from "react";

import AppLayout, { AppLayoutProps } from "@cloudscape-design/components/app-layout";
import Box from "@cloudscape-design/components/box";
import Drawer from "@cloudscape-design/components/drawer";
import Header from "@cloudscape-design/components/header";

import { ScreenshotArea } from "./screenshot-area";

export function Page({
  title,
  subtitle,
  settings,
  children,
  screenshotArea = true,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  settings?: React.ReactNode;
  children: React.ReactNode;
  screenshotArea?: boolean;
}) {
  const [toolsOpen, setToolsOpen] = useState(true);
  const drawers: AppLayoutProps.Drawer[] = [];
  if (settings) {
    drawers.push({
      id: "settings",
      content: <Drawer header={<Header variant="h2">Page settings</Header>}>{settings}</Drawer>,
      trigger: { iconName: "ellipsis" },
      ariaLabels: { drawerName: "Page settings", triggerButton: "Open page settings" },
    });
  }
  return (
    <AppLayout
      headerSelector="#h"
      navigationHide={true}
      activeDrawerId={toolsOpen ? "settings" : null}
      onDrawerChange={({ detail }) => setToolsOpen(!!detail.activeDrawerId)}
      drawers={drawers}
      content={
        <Box>
          <h1>{title}</h1>
          {subtitle && (
            <Box variant="p" margin={{ bottom: "xs" }}>
              {subtitle}
            </Box>
          )}
          <Box>{screenshotArea ? <ScreenshotArea>{children}</ScreenshotArea> : children}</Box>
        </Box>
      }
    />
  );
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import SpaceBetween from "@cloudscape-design/components/space-between";
import Toggle from "@cloudscape-design/components/toggle";
import { Density, Mode, applyDensity, applyMode } from "@cloudscape-design/global-styles";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { pagesMap } from "../pages";
import PageLayout from "./page-layout";

export interface PageProps {
  pageId: string;
}

export default function Page({ pageId }: PageProps) {
  const [dark, setDark] = useState(false);
  const [compact, setCompact] = useState(false);
  const [searchParams] = useSearchParams();
  const direction = searchParams.get("direction") ?? "ltr";

  useEffect(() => {
    applyMode(dark ? Mode.Dark : Mode.Light, document.documentElement);
  }, [dark]);

  useEffect(() => {
    applyDensity(compact ? Density.Compact : Density.Comfortable, document.documentElement);
  }, [compact]);

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  const Component = pagesMap[pageId];

  return (
    <PageLayout>
      <Suspense fallback="Loading">
        <SpaceBetween direction="vertical" size="m">
          <a href="/index.html#">Back to all pages</a>
          <SpaceBetween direction="horizontal" size="m">
            <Toggle checked={dark} onChange={(event) => setDark(event.detail.checked)}>
              Dark mode
            </Toggle>
            <Toggle checked={compact} onChange={(event) => setCompact(event.detail.checked)}>
              Compact mode
            </Toggle>
          </SpaceBetween>
        </SpaceBetween>
        <Component />
      </Suspense>
    </PageLayout>
  );
}

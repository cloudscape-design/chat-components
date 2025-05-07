// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { MutableRefObject } from "react";

import {
  ComponentConfiguration,
  initAwsUiVersions,
  useComponentMetadata,
  useComponentMetrics,
  useFocusVisible,
} from "@cloudscape-design/component-toolkit/internal";

import { PACKAGE_SOURCE, PACKAGE_VERSION, THEME } from "../environment";
import { getVisualTheme } from "../utils/get-visual-theme";
import { useVisualRefresh } from "./use-visual-refresh";

initAwsUiVersions(PACKAGE_SOURCE, PACKAGE_VERSION);

export interface InternalBaseComponentProps {
  __internalRootRef?: MutableRefObject<any> | null;
}

/**
 * This hook is used for components which are exported to customers. The returned __internalRootRef needs to be
 * attached to the (internal) component's root DOM node. The hook takes care of attaching the metadata to this
 * root DOM node and emits the telemetry for this component.
 */
export default function useBaseComponent<T = any>(componentName: string, config?: ComponentConfiguration) {
  const isVisualRefresh = useVisualRefresh();
  const theme = getVisualTheme(THEME, isVisualRefresh);
  useComponentMetrics(componentName, { packageSource: PACKAGE_SOURCE, packageVersion: PACKAGE_VERSION, theme }, config);
  useFocusVisible();
  const elementRef = useComponentMetadata<T>(componentName, {
    packageName: PACKAGE_SOURCE,
    version: PACKAGE_VERSION,
    theme,
  });
  return { __internalRootRef: elementRef };
}

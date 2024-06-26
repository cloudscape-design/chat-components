// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import type { LoadingBarProps } from "./interfaces";
import { InternalLoadingBar } from "./internal";

export type { LoadingBarProps };

export default function LoadingBar(props: LoadingBarProps) {
  const baseComponentProps = useBaseComponent("LoadingBar", { props: { variant: props.variant } });
  return <InternalLoadingBar {...props} {...baseComponentProps} />;
}

applyDisplayName(LoadingBar, "LoadingBar");

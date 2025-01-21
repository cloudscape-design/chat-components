// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import { SupportPromptGroupProps } from "./interfaces";
import { InternalSupportPromptGroup } from "./internal";

export type { SupportPromptGroupProps };

export default function SupportPromptGroup(props: SupportPromptGroupProps) {
  const baseComponentProps = useBaseComponent("SupportPromptGroup");
  return <InternalSupportPromptGroup {...props} {...baseComponentProps} />;
}

applyDisplayName(SupportPromptGroup, "SupportPromptGroup");

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import { SupportPromptProps } from "./interfaces";
import { InternalSupportPrompt } from "./internal";

export type { SupportPromptProps };

export default function SupportPrompt(props: SupportPromptProps) {
  const baseComponentProps = useBaseComponent("SupportPrompt");
  return <InternalSupportPrompt {...props} {...baseComponentProps} />;
}

applyDisplayName(SupportPrompt, "SupportPrompt");

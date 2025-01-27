// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { forwardRef, Ref } from "react";

import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import { SupportPromptGroupProps } from "./interfaces";
import { InternalSupportPromptGroup } from "./internal";

export type { SupportPromptGroupProps };

const SupportPromptGroup = forwardRef((props: SupportPromptGroupProps, ref: Ref<SupportPromptGroupProps.Ref>) => {
  const baseComponentProps = useBaseComponent("SupportPromptGroup");
  return <InternalSupportPromptGroup ref={ref} {...props} {...baseComponentProps} />;
});

applyDisplayName(SupportPromptGroup, "SupportPromptGroup");
export default SupportPromptGroup;

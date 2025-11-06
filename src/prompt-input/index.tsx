// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
"use client";
import { forwardRef, type Ref } from "react";

import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import { PromptInputProps } from "./interfaces";
import InternalPromptInput from "./internal";

export type { PromptInputProps };

const PromptInput = forwardRef(
  (
    {
      autoComplete,
      autoFocus,
      disableBrowserAutocorrect,
      disableActionButton,
      spellcheck,
      readOnly,
      actionButtonIconName,
      minRows = 1,
      maxRows = 3,
      ...props
    }: PromptInputProps,
    ref: Ref<PromptInputProps.Ref>,
  ) => {
    const baseComponentProps = useBaseComponent("PromptInput", {
      props: {
        readOnly,
        autoComplete,
        autoFocus,
        disableBrowserAutocorrect,
        disableActionButton,
        spellcheck,
        actionButtonIconName,
        minRows,
        maxRows,
      },
    });
    return (
      <InternalPromptInput
        readOnly={readOnly}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disableBrowserAutocorrect={disableBrowserAutocorrect}
        disableActionButton={disableActionButton}
        spellcheck={spellcheck}
        actionButtonIconName={actionButtonIconName}
        minRows={minRows}
        maxRows={maxRows}
        {...props}
        {...baseComponentProps}
        ref={ref}
      />
    );
  },
);
applyDisplayName(PromptInput, "PromptInput");
export default PromptInput;

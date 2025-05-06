// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";

export interface StarProps {
  /**
   * @awsuiSystem core
   */
  style: { width: number };
}

export default function Star({ style, ...rest }: StarProps) {
  const { __internalRootRef } = useBaseComponent("Star", { props: {} });
  return (
    <span ref={__internalRootRef} style={style} {...getDataAttributes(rest)}>
      🤖
    </span>
  );
}

applyDisplayName(Star, "Star");

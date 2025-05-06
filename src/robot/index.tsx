// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { getDataAttributes } from "../internal/base-component/get-data-attributes";
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";

export interface RobotProps {
  size: "small" | "large";
}

/**
 * @awsuiSystem core
 */
export default function Robot({ size, ...rest }: RobotProps) {
  const { __internalRootRef } = useBaseComponent("Robot", { props: { size } });
  return (
    <span ref={__internalRootRef} {...getDataAttributes(rest)}>
      🤖
    </span>
  );
}

applyDisplayName(Robot, "Robot");

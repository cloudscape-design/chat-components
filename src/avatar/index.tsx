// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import type { AvatarProps } from "./interfaces";
import { InternalAvatar } from "./internal";

export type { AvatarProps };

export default function Avatar(props: AvatarProps) {
  const baseComponentProps = useBaseComponent("Avatar");
  return <InternalAvatar {...props} {...baseComponentProps} />;
}

applyDisplayName(Avatar, "Avatar");

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import { AvatarProps } from "./interfaces";
import InternalAvatar from "./internal";

export type { AvatarProps };

export default function Avatar({ color = "default", ...props }: AvatarProps) {
  const baseComponentProps = useBaseComponent("Avatar", { props: { color } });
  return <InternalAvatar color={color} {...props} {...baseComponentProps} />;
}
applyDisplayName(Avatar, "Avatar");

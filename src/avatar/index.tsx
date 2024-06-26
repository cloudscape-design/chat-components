// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import useBaseComponent from "../internal/base-component/use-base-component";
import { applyDisplayName } from "../internal/utils/apply-display-name";
import { AvatarProps } from "./interfaces";
import InternalAvatar from "./internal";

export type { AvatarProps };

export default function Avatar({ color = "default", iconName = "user-profile", ...props }: AvatarProps) {
  const baseComponentProps = useBaseComponent("Avatar", { props: { color, iconName } });
  return <InternalAvatar color={color} iconName={iconName} {...props} {...baseComponentProps} />;
}
applyDisplayName(Avatar, "Avatar");

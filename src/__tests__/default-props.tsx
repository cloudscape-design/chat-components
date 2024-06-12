// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import type { AvatarProps } from "../../lib/components";

const avatarProps: AvatarProps = {
  initials: "",
};
export const defaultProps = {
  avatar: avatarProps,
} as const;

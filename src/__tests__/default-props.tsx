// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import type { AvatarProps } from "../../lib/components";
import type { SupportPromptGroupProps } from "../../lib/components";

const avatarProps: AvatarProps = {
  ariaLabel: "Avatar",
};
const supportPromptGroupProps: SupportPromptGroupProps = {
  ariaLabel: "Support prompt group",
  items: [{ text: "test", id: "test" }],
  onItemClick: () => {},
};
export const defaultProps = {
  avatar: avatarProps,
  ["support-prompt-group"]: supportPromptGroupProps,
} as const;

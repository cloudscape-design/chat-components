// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { SYSTEM } from "../internal/environment";
import customCssProps from "../internal/generated/custom-css-properties";
import { AvatarProps } from "./interfaces";

export function getRootStyles(style: AvatarProps.Style | undefined) {
  let properties = {};

  if (SYSTEM === "core" && style?.root) {
    properties = {
      background: style.root?.background,
      borderRadius: style.root?.borderRadius,
      boxShadow: style.root?.boxShadow,
      color: style.root?.color,
      [customCssProps.avatarRootBorderWidth]: style.root?.borderWidth,
      [customCssProps.avatarFocusRingBorderColor]: style.root?.focusRing?.borderColor,
      [customCssProps.avatarFocusRingBorderRadius]: style.root?.focusRing?.borderRadius,
      [customCssProps.avatarFocusRingBorderWidth]: style.root?.focusRing?.borderWidth,
    };
  }

  return properties;
}

export function getContentStyles(style: AvatarProps.Style | undefined) {
  let properties = {};

  if (SYSTEM === "core" && style?.root) {
    properties = {
      borderColor: style.root?.borderColor,
      borderRadius: style.root?.borderRadius,
      borderStyle: style.root?.borderWidth && "solid",
      borderWidth: style.root?.borderWidth,
    };
  }

  return properties;
}

export function getImageStyles(style: AvatarProps.Style | undefined) {
  let properties = {};

  if (SYSTEM === "core" && style?.root) {
    properties = {
      borderRadius: style.root?.borderRadius,
    };
  }

  return properties;
}

export function getLoadingDotsStyle(style: AvatarProps.Style | undefined) {
  let properties = {};

  if (SYSTEM === "core" && style?.root) {
    properties = {
      borderRadius: style.root?.borderRadius,
    };
  }

  return properties;
}

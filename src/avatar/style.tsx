// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

//import { SYSTEM } from '../internal/environment';
import { AvatarProps } from "./interfaces";

export function getRootStyles(style: AvatarProps | undefined) {
  let properties = {};

  if (style?.root) {
    properties = {
      background: style.root?.background,
      borderRadius: style.root?.borderRadius,
      boxShadow: style.root?.boxShadow,
      color: style.root?.color,
    };
  }

  return properties;
}

export function getContentStyles(style: AvatarProps | undefined) {
  let properties = {};

  if (style?.root) {
    properties = {
      borderColor: style.root?.borderColor,
      borderRadius: style.root?.borderRadius,
      borderStyle: style.root?.borderWidth && "solid",
      borderWidth: style.root?.borderWidth,
    };
  }

  return properties;
}

export function getImageStyles(style: AvatarProps | undefined) {
  let properties = {};

  if (style?.root) {
    properties = {
      borderRadius: style.root?.borderRadius,
    };
  }

  return properties;
}

export function getLoadingDotsStyle(style: AvatarProps | undefined) {
  let properties = {};

  if (style?.root) {
    properties = {
      borderRadius: style.root?.borderRadius,
    };
  }

  return properties;
}

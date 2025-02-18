// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { IconProps } from "@cloudscape-design/components/icon";

export interface AvatarProps {
  /**
   * Determines the color of the avatar.
   * Use `gen-ai` for AI assistants and `default` otherwise.
   */
  color?: AvatarProps.Color;

  /**
   * The text content shown in the avatar's tooltip.
   *
   * When you use this property, make sure to include it in the `ariaLabel`.
   */
  tooltipText?: string;

  /**
   * The text content shown directly in the avatar's body.
   * Can be 1 or 2 symbols long, every subsequent symbol is ignored.
   * Use it to define initials that uniquely identify the avatar's owner.
   */
  initials?: string;

  /**
   * When set to true, a loading indicator is shown in avatar.
   */
  loading?: boolean;

  /**
   * Text to describe the avatar for assistive technology.
   * When more than one avatar is used, provide a unique label for each.
   * For example, "Avatar of John Doe" or "Avatar of generative AI assistant".
   *
   * If `tooltipText` is used make sure to include it in the `ariaLabel`.
   */
  ariaLabel: string;

  /**
   * Specifies the icon to be displayed as Avatar.
   * Use `gen-ai` icon for AI assistants. By default `user-profile` icon is used.
   *
   * If you set both `iconName` and `initials`, `initials` will take precedence.
   */
  iconName?: IconProps.Name;

  /**
   * Specifies the URL of a custom icon. Use this property if the icon you want isn't available, and your custom icon can't be an SVG.
   * For SVG icons, use the `iconSvg` slot instead.
   *
   * If you set both `iconUrl` and `iconSvg`, `iconSvg` will take precedence.
   */
  iconUrl?: string;

  /**
   * Specifies the SVG of a custom icon.
   *
   * Use this property if the icon you want isn't available.
   * If you set both `iconUrl` and `iconSvg`, `iconSvg` will take precedence.
   */
  iconSvg?: React.ReactNode;

  /**
   * Specifies the URL of a custom image. If you set both `iconUrl` and `imgUrl`, `imgUrl` will take precedence.
   */
  imgUrl?: string;

  /**
   * Defines the width of the avatar.
   * This value corresponds to the `width` CSS-property and will center and crop images using `object-fit: cover`.
   * If no width is provided the avatar will use the default width value of 28px.
   */
  width?: number;
}

export namespace AvatarProps {
  export type Color = "default" | "gen-ai";
}

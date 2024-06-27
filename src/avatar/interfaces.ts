// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

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
}

export namespace AvatarProps {
  export type Color = "default" | "gen-ai";
}

// This is added here because cross package reference doesn't work in documenter and icon names are not populated
// It'll be replaced by documenter implementation once documenter is updated to handle cross package reference
namespace IconProps {
  // Why not enums? Explained there
  // https://stackoverflow.com/questions/52393730/typescript-string-literal-union-type-from-enum
  export type Name =
    | "add-plus"
    | "anchor-link"
    | "angle-left-double"
    | "angle-left"
    | "angle-right-double"
    | "angle-right"
    | "angle-up"
    | "angle-down"
    | "arrow-left"
    | "arrow-right"
    | "audio-full"
    | "audio-half"
    | "audio-off"
    | "bug"
    | "call"
    | "calendar"
    | "caret-down-filled"
    | "caret-down"
    | "caret-left-filled"
    | "caret-right-filled"
    | "caret-up-filled"
    | "caret-up"
    | "check"
    | "contact"
    | "close"
    | "copy"
    | "delete-marker"
    | "download"
    | "drag-indicator"
    | "edit"
    | "ellipsis"
    | "envelope"
    | "expand"
    | "external"
    | "file-open"
    | "file"
    | "filter"
    | "flag"
    | "folder-open"
    | "folder"
    | "gen-ai"
    | "group-active"
    | "group"
    | "heart"
    | "heart-filled"
    | "insert-row"
    | "key"
    | "keyboard"
    | "lock-private"
    | "menu"
    | "microphone"
    | "microphone-off"
    | "multiscreen"
    | "notification"
    | "redo"
    | "refresh"
    | "remove"
    | "resize-area"
    | "script"
    | "search"
    | "security"
    | "settings"
    | "send"
    | "share"
    | "shrink"
    | "star-filled"
    | "star-half"
    | "star"
    | "status-in-progress"
    | "status-info"
    | "status-negative"
    | "status-pending"
    | "status-positive"
    | "status-stopped"
    | "status-warning"
    | "subtract-minus"
    | "suggestions"
    | "thumbs-down-filled"
    | "thumbs-down"
    | "thumbs-up-filled"
    | "thumbs-up"
    | "ticket"
    | "treeview-collapse"
    | "treeview-expand"
    | "undo"
    | "unlocked"
    | "upload-download"
    | "upload"
    | "user-profile-active"
    | "user-profile"
    | "video-off"
    | "video-on"
    | "video-unavailable"
    | "view-full"
    | "view-horizontal"
    | "view-vertical"
    | "zoom-in"
    | "zoom-out"
    | "zoom-to-fit";
}

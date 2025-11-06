// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { IconProps } from "@cloudscape-design/components/icon";
import { InputProps } from "@cloudscape-design/components/input";

import { FormFieldValidationControlProps } from "../internal/context/form-field-context";
import { BaseKeyDetail, CancelableEventHandler, NonCancelableEventHandler } from "../internal/events";
/**
 * @awsuiSystem core
 */
import { NativeAttributes } from "../internal/utils/with-native-attributes";

export interface InputAutoCorrect {
  /**
   * Specifies whether to disable browser autocorrect and related features.
   * If you set this to `true`, it disables any native browser capabilities
   * that automatically correct user input, such as `autocorrect` and
   * `autocapitalize`. If you don't set it, the behavior follows the default behavior
   * of the user's browser.
   */
  disableBrowserAutocorrect?: boolean;
}

export interface InputAutoComplete {
  /**
   * Specifies whether to enable a browser's autocomplete functionality for this input.
   * In some cases it might be appropriate to disable autocomplete (for example, for security-sensitive fields).
   * To use it correctly, set the `name` property.
   *
   * You can either provide a boolean value to set the property to "on" or "off", or specify a string value
   * for the [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute.
   */
  autoComplete?: boolean | string;
}

export interface InputSpellcheck {
  /**
   * Specifies the value of the `spellcheck` attribute on the native control.
   * This value controls the native browser capability to check for spelling/grammar errors.
   * If not set, the browser default behavior is to perform spellchecking.
   * For more details, check the [spellcheck MDN article](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck).
   *
   * Enhanced spellchecking features of your browser and/or operating system may send input values to external parties.
   * Make sure it’s deactivated for fields with sensitive information to prevent
   * inadvertently sending data (such as user passwords) to third parties.
   */
  spellcheck?: boolean;
}

export interface InputKeyEvents {
  /**
   * Called when the underlying native textarea emits a `keydown` event.
   * The event `detail` contains the `keyCode` and information
   * about modifiers (that is, CTRL, ALT, SHIFT, META, etc.).
   */
  onKeyDown?: CancelableEventHandler<InputProps.KeyDetail>;

  /**
   * Called when the underlying native textarea emits a `keyup` event.
   * The event `detail` contains the `keyCode` and information
   * about modifiers (that is, CTRL, ALT, SHIFT, META, etc.).
   */
  onKeyUp?: CancelableEventHandler<InputProps.KeyDetail>;
}

export interface PromptInputProps
  extends Omit<InputProps, "nativeInputAttributes">,
    InputKeyEvents,
    InputAutoCorrect,
    InputAutoComplete,
    InputSpellcheck,
    FormFieldValidationControlProps {
  /**
   * Called whenever a user clicks the action button or presses the "Enter" key.
   * The event `detail` contains the current value of the field.
   */
  onAction?: NonCancelableEventHandler<PromptInputProps.ActionDetail>;
  /**
   * Determines what icon to display in the action button.
   */
  actionButtonIconName?: IconProps.Name;
  /**
   * Specifies the URL of a custom icon. Use this property if the icon you want isn't available.
   *
   * If you set both `actionButtonIconUrl` and `actionButtonIconSvg`, `actionButtonIconSvg` will take precedence.
   */
  actionButtonIconUrl?: string;
  /**
   * Specifies the SVG of a custom icon.
   *
   * Use this property if you want your custom icon to inherit colors dictated by variant or hover states.
   * When this property is set, the component will be decorated with `aria-hidden="true"`. Ensure that the `svg` element:
   * - has attribute `focusable="false"`.
   * - has `viewBox="0 0 16 16"`.
   *
   * If you set the `svg` element as the root node of the slot, the component will automatically
   * - set `stroke="currentColor"`, `fill="none"`, and `vertical-align="top"`.
   * - set the stroke width based on the size of the icon.
   * - set the width and height of the SVG element based on the size of the icon.
   *
   * If you don't want these styles to be automatically set, wrap the `svg` element into a `span`.
   * You can still set the stroke to `currentColor` to inherit the color of the surrounding elements.
   *
   * If you set both `actionButtonIconUrl` and `actionButtonIconSvg`, `iconSvg` will take precedence.
   *
   * *Note:* Remember to remove any additional elements (for example: `defs`) and related CSS classes from SVG files exported from design software.
   * In most cases, they aren't needed, as the `svg` element inherits styles from the icon component.
   */
  actionButtonIconSvg?: React.ReactNode;
  /**
   * Specifies alternate text for a custom icon. We recommend that you provide this for accessibility.
   * This property is ignored if you use a predefined icon or if you set your custom icon using the `iconSvg` slot.
   */
  actionButtonIconAlt?: string;
  /**
   * Adds an aria-label to the action button.
   * @i18n
   */
  actionButtonAriaLabel?: string;

  /**
   * Specifies whether to disable the action button.
   */
  disableActionButton?: boolean;

  /**
   * Specifies the minimum number of lines of text to set the height to.
   */
  minRows?: number;

  /**
   * Specifies the maximum number of lines of text the textarea will expand to.
   * Defaults to 3. Use -1 for infinite rows.
   */
  maxRows?: number;

  /**
   * Use this to replace the primary action.
   * If this is provided then any other `actionButton*` properties will be ignored.
   * Note that you should still provide an `onAction` function in order to handle keyboard submission.
   *
   * @awsuiSystem core
   */
  customPrimaryAction?: React.ReactNode;

  /**
   * Use this slot to add secondary actions to the prompt input.
   */
  secondaryActions?: React.ReactNode;

  /**
   * Use this slot to add secondary content, such as file attachments, to the prompt input.
   */
  secondaryContent?: React.ReactNode;

  /**
   * Determines whether the secondary actions area of the input has padding. If true, removes the default padding from the secondary actions area.
   */
  disableSecondaryActionsPaddings?: boolean;

  /**
   * Determines whether the secondary content area of the input has padding. If true, removes the default padding from the secondary content area.
   */
  disableSecondaryContentPaddings?: boolean;

  /**
   * Attributes to add to the native `textarea` element.
   * Some attributes will be automatically combined with internal attribute values:
   * - `className` will be appended.
   * - Event handlers will be chained, unless the default is prevented.
   *
   * We do not support using this attribute to apply custom styling.
   *
   * @awsuiSystem core
   */
  nativeTextareaAttributes?: NativeAttributes<React.TextareaHTMLAttributes<HTMLTextAreaElement>>;
}

export namespace PromptInputProps {
  export type KeyDetail = BaseKeyDetail;
  export type ActionDetail = InputProps.ChangeDetail;

  export interface Ref {
    /**
     * Sets input focus on the textarea control.
     */
    focus(): void;

    /**
     * Selects all text in the textarea control.
     */
    select(): void;

    /**
     * Selects a range of text in the textarea control.
     *
     * See https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/setSelectionRange
     * for more details on this method. Be aware that using this method in React has some
     * common pitfalls: https://stackoverflow.com/questions/60129605/is-javascripts-setselectionrange-incompatible-with-react-hooks
     */
    setSelectionRange(start: number | null, end: number | null, direction?: "forward" | "backward" | "none"): void;
  }
}

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Converts the boolean or string value of the `autoComplete` property to the correct `autocomplete` attribute value.
 */
export const convertAutoComplete = (propertyValue: boolean | string = false): string => {
  if (propertyValue === true) {
    return "on";
  }
  return propertyValue || "off";
};

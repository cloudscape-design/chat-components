// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export interface SupportPromptProps {
  /**
   * Specifies children of the support prompt.
   */
  children: string;

  /**
   * Specifies the on click handler.
   */
  onClick?: () => void;
}

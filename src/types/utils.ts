// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * A Style API slot: a class name, or a function of the slot arguments that returns one.
 */
export type StyleSlot<Args> = string | ((args: Args) => string | undefined);

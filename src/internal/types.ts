// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export type SomeRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

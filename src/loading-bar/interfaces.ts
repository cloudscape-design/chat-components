// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

export interface LoadingBarProps {
  variant: LoadingBarProps.Variant;
}

export namespace LoadingBarProps {
  export type Variant = "gen-ai" | "gen-ai-masked";
}

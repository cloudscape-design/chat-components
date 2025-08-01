// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import process from "process";

export const gitCommitVersion = (process.env.GITHUB_SHA || "HEAD").slice(0, 8);

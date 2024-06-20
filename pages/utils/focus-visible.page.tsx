// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import Button from "@cloudscape-design/components/button";

export default function ButtonsPage() {
  return (
    <main>
      <h1>Testing visible focus outline</h1>
      <Button id="first-button">First button</Button>
      <Button id="second-button">Second button</Button>
      <Button disabled={true} id="dismiss-focus">
        Focus dismiss target
      </Button>
    </main>
  );
}

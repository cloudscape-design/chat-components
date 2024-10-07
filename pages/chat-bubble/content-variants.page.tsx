// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// import CodeView from "@cloudscape-design/code-view/code-view";
import BarChart from "@cloudscape-design/components/bar-chart";
import Box from "@cloudscape-design/components/box";
// import Container from "@cloudscape-design/components/container";
import ExpandableSection from "@cloudscape-design/components/expandable-section";
import Link from "@cloudscape-design/components/link";
import Steps from "@cloudscape-design/components/steps";
import Table, { TableProps } from "@cloudscape-design/components/table";

import { ChatBubble } from "../../lib/components";
import { Actions, ChatBubbleAvatarGenAI, ChatContainer } from "./util-components";

export default function ChatBubblesContentVariantsPage() {
  return (
    <>
      <h1>Content variants in chat bubble</h1>

      <ChatContainer>
        <GenAIChatBubble>
          Expandable section and list
          <ol>
            <li>In the Buckets list, choose the name of the bucket that you want.</li>
            <li>Choose Properties.</li>
            <li>Navigate to S3.</li>
          </ol>
          <ExpandableSection headerText="Sources" defaultExpanded={true}>
            <div>
              <Link href="https://cloudscape.aws.dev/components/link?tabId=playground&example=external-link">
                Example link
              </Link>
            </div>
            <div>
              <Link href="https://cloudscape.aws.dev/components/link?tabId=playground&example=external-link">
                Example link 2
              </Link>
            </div>
          </ExpandableSection>
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Table with default variant</span>

          <ChatBubbleTable />
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Bar chart</span>

          <ChatBubbleChart />
        </GenAIChatBubble>

        {/* <GenAIChatBubble>
          <span>Code view, inside container</span>

          <Container>
            <ChatBubbleCodeView />
          </Container>
        </GenAIChatBubble> */}

        <GenAIChatBubble>
          <span>Steps</span>

          <Steps
            steps={[
              { status: "success", header: "Success step" },
              { status: "info", header: "Info step" },
              { status: "warning", header: "Warning step" },
              { status: "error", header: "Error step" },
              { status: "loading", header: "Loading step" },
              { status: "in-progress", header: "In progress step" },
              { status: "pending", header: "Pending step" },
              { status: "stopped", header: "Stopped step" },
            ]}
          />
        </GenAIChatBubble>
      </ChatContainer>
    </>
  );
}

function GenAIChatBubble({ children }: { children: React.ReactNode }) {
  return (
    <ChatBubble avatar={<ChatBubbleAvatarGenAI />} type="received" actions={<Actions />} ariaLabel="Message">
      {children}
    </ChatBubble>
  );
}

function ChatBubbleTable({ variant }: { variant?: TableProps.Variant }) {
  return (
    <Table
      variant={variant}
      renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      columnDefinitions={[
        {
          id: "variable",
          header: "Variable name",
          cell: (item) => <Link href="#">{item.name || "-"}</Link>,
          isRowHeader: true,
        },
        {
          id: "alt",
          header: "Text value",
          cell: (item) => item.alt || "-",
        },
        {
          id: "description",
          header: "Description",
          cell: (item) => item.description || "-",
        },
      ]}
      enableKeyboardNavigation={true}
      items={[
        {
          name: "Item 1",
          alt: "First",
          description: "This is the first item",
          type: "1A",
          size: "Small",
        },
        {
          name: "Item 2",
          alt: "Second",
          description: "This is the second item",
          type: "1B",
          size: "Large",
        },
        {
          name: "Item 3",
          alt: "Third",
          description: "-",
          type: "1A",
          size: "Large",
        },
        {
          name: "Item 4",
          alt: "Fourth",
          description: "This is the fourth item",
          type: "2A",
          size: "Small",
        },
        {
          name: "Item 5",
          alt: "-",
          description: "This is the fifth item with a longer description",
          type: "2A",
          size: "Large",
        },
        {
          name: "Item 6",
          alt: "Sixth",
          description: "This is the sixth item",
          type: "1A",
          size: "Small",
        },
      ]}
      sortingDisabled={true}
    />
  );
}

function ChatBubbleChart() {
  return (
    <BarChart
      series={[
        {
          title: "Site 1",
          type: "bar",
          data: [
            { x: new Date(1601071200000), y: 34503 },
            { x: new Date(1601078400000), y: 25832 },
            { x: new Date(1601085600000), y: 4012 },
            { x: new Date(1601092800000), y: -5602 },
            { x: new Date(1601100000000), y: 17839 },
          ],
          valueFormatter: (e) =>
            "$" +
            e.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
        },
        {
          title: "Average revenue",
          type: "threshold",
          y: 19104,
          valueFormatter: (e) =>
            "$" +
            e.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
        },
      ]}
      xDomain={[
        new Date(1601071200000),
        new Date(1601078400000),
        new Date(1601085600000),
        new Date(1601092800000),
        new Date(1601100000000),
      ]}
      yDomain={[-10000, 40000]}
      i18nStrings={{
        xTickFormatter: (e) =>
          e
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: !1,
            })
            .split(",")
            .join("\n"),
        yTickFormatter: function s(e) {
          return Math.abs(e) >= 1e9
            ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "G"
            : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
              : Math.abs(e) >= 1e3
                ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
                : e.toFixed(2);
        },
      }}
      ariaLabel="Single data series line chart"
      height={300}
      xTitle="Time (UTC)"
      yTitle="Revenue (USD)"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no matching data to display
          </Box>
        </Box>
      }
    />
  );
}

// function ChatBubbleCodeView() {
//   return (
//     <CodeView
//       content='const hello: string = "world";
//   console.log(hello);'
//       lineNumbers={true}
//       actions={
//         <CopyToClipboard
//           copyButtonAriaLabel="Copy code"
//           copyErrorText="Code failed to copy"
//           copySuccessText="Code copied"
//           textToCopy='const hello: string = "world";
//   console.log(hello);'
//         />
//       }
//     />
//   );
// }

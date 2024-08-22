// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import CodeView from "@cloudscape-design/code-view/code-view";
import BarChart from "@cloudscape-design/components/bar-chart";
import Box from "@cloudscape-design/components/box";
import Container from "@cloudscape-design/components/container";
import CopyToClipboard from "@cloudscape-design/components/copy-to-clipboard";
import ExpandableSection from "@cloudscape-design/components/expandable-section";
import KeyValuePairs from "@cloudscape-design/components/key-value-pairs";
import Link from "@cloudscape-design/components/link";
import ProgressBar from "@cloudscape-design/components/progress-bar";
import Slider from "@cloudscape-design/components/slider";
import SpaceBetween from "@cloudscape-design/components/space-between";
import StatusIndicator from "@cloudscape-design/components/status-indicator";
import Table, { TableProps } from "@cloudscape-design/components/table";

import { ChatBubble } from "../../lib/components";
import { ChatBubbleAvatarGenAI, ChatContainer, InlineActions } from "./util-components";

export default function ChatBubblesContentVariantsPage() {
  return (
    <>
      <h1>Content variants in chat bubble</h1>

      <h2>Table</h2>
      <ChatContainer>
        <GenAIChatBubble>
          <span>Table with default variant</span>

          <ChatBubbleTable />
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Table with default variant, inside an expandable section with default variant</span>

          <ExpandableSection headerText="Data in table" defaultExpanded={true}>
            <ChatBubbleTable />
          </ExpandableSection>
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Table with embedded variant, inside an expandable section with container variant</span>

          <ExpandableSection variant="container" headerText="Data in table" defaultExpanded={true}>
            <ChatBubbleTable variant="embedded" />
          </ExpandableSection>
        </GenAIChatBubble>
      </ChatContainer>

      <h2>Charts</h2>
      <ChatContainer>
        <GenAIChatBubble>
          <span>Bar chart</span>

          <ChatBubbleChart />
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Bar chart, inside container</span>

          <Container>
            <ChatBubbleChart />
          </Container>
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Bar chart, inside expandable section with default variant</span>

          <ExpandableSection headerText="Data in chart" defaultExpanded={true}>
            <ChatBubbleChart />
          </ExpandableSection>
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Bar chart, inside expandable section with container variant</span>

          <ExpandableSection variant="container" headerText="Data in chart" defaultExpanded={true}>
            <ChatBubbleChart />
          </ExpandableSection>
        </GenAIChatBubble>
      </ChatContainer>

      <h2>Code view</h2>
      <ChatContainer>
        <GenAIChatBubble>
          <span>Code view</span>

          <ChatBubbleCodeView />
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Code view, inside container</span>

          <Container>
            <ChatBubbleCodeView />
          </Container>
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Code view, inside an expandable section with default variant</span>

          <ExpandableSection headerText="Data in code view" defaultExpanded={true}>
            <ChatBubbleCodeView />
          </ExpandableSection>
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Code view, inside an expandable section with container variant</span>

          <ExpandableSection variant="container" headerText="Data in code view" defaultExpanded={true}>
            <ChatBubbleCodeView />
          </ExpandableSection>
        </GenAIChatBubble>
      </ChatContainer>

      <h2>Rest</h2>

      <ChatContainer>
        <GenAIChatBubble>
          <span>Status indicator with different types</span>

          <StatusIndicator type="error">Error</StatusIndicator>
          <StatusIndicator type="warning">Warning</StatusIndicator>
          <StatusIndicator type="success">Success</StatusIndicator>
          <StatusIndicator type="pending">Pending</StatusIndicator>
          <StatusIndicator type="stopped">Stopped</StatusIndicator>
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Status indicator with different types in container</span>

          <Container>
            <SpaceBetween size="s">
              <StatusIndicator type="error">Error</StatusIndicator>
              <StatusIndicator type="warning">Warning</StatusIndicator>
              <StatusIndicator type="success">Success</StatusIndicator>
              <StatusIndicator type="pending">Pending</StatusIndicator>
              <StatusIndicator type="stopped">Stopped</StatusIndicator>
            </SpaceBetween>
          </Container>
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Progress bar</span>

          <ProgressBar
            value={30}
            additionalInfo="Additional information"
            description="Progress bar description"
            ariaLabelledby="ssl-certificate-id"
          />
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Progress bar in container</span>

          <Container>
            <ProgressBar
              value={30}
              additionalInfo="Additional information"
              description="Progress bar description"
              ariaLabelledby="ssl-certificate-id"
            />
          </Container>
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Key-value pair</span>

          <KeyValuePairs
            columns={3}
            items={[
              {
                label: "Distribution ID",
                value: "E1WG1ZNPRXT0D4",
                info: (
                  <Link variant="info" href="#">
                    Info
                  </Link>
                ),
              },
              {
                label: "ARN",
                value: (
                  <CopyToClipboard
                    copyButtonAriaLabel="Copy ARN"
                    copyErrorText="ARN failed to copy"
                    copySuccessText="ARN copied"
                    textToCopy="arn:service23G24::111122223333:distribution/23E1WG1ZNPRXT0D4"
                    variant="inline"
                  />
                ),
              },
              {
                label: "Status",
                value: <StatusIndicator>Available</StatusIndicator>,
              },
              {
                label: "SSL Certificate",
                id: "ssl-certificate-id",
                value: (
                  <ProgressBar
                    value={30}
                    additionalInfo="Additional information"
                    description="Progress bar description"
                    ariaLabelledby="ssl-certificate-id"
                  />
                ),
              },
              {
                label: "Price class",
                value: "Use only US, Canada, Europe",
              },
              {
                label: "CNAMEs",
                value: (
                  <Link external={true} href="#">
                    abc.service23G24.xyz
                  </Link>
                ),
              },
            ]}
          />
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Key-value pair in container</span>

          <Container>
            <KeyValuePairs
              columns={3}
              items={[
                {
                  label: "Distribution ID",
                  value: "E1WG1ZNPRXT0D4",
                  info: (
                    <Link variant="info" href="#">
                      Info
                    </Link>
                  ),
                },
                {
                  label: "ARN",
                  value: (
                    <CopyToClipboard
                      copyButtonAriaLabel="Copy ARN"
                      copyErrorText="ARN failed to copy"
                      copySuccessText="ARN copied"
                      textToCopy="arn:service23G24::111122223333:distribution/23E1WG1ZNPRXT0D4"
                      variant="inline"
                    />
                  ),
                },
                {
                  label: "Status",
                  value: <StatusIndicator>Available</StatusIndicator>,
                },
                {
                  label: "SSL Certificate",
                  id: "ssl-certificate-id",
                  value: (
                    <ProgressBar
                      value={30}
                      additionalInfo="Additional information"
                      description="Progress bar description"
                      ariaLabelledby="ssl-certificate-id"
                    />
                  ),
                },
                {
                  label: "Price class",
                  value: "Use only US, Canada, Europe",
                },
                {
                  label: "CNAMEs",
                  value: (
                    <Link external={true} href="#">
                      abc.service23G24.xyz
                    </Link>
                  ),
                },
              ]}
            />
          </Container>
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Slider</span>

          <Slider max={100} min={0} />
        </GenAIChatBubble>

        <GenAIChatBubble>
          <span>Slider in container</span>

          <Container>
            <Slider max={100} min={0} />
          </Container>
        </GenAIChatBubble>
      </ChatContainer>
    </>
  );
}

function GenAIChatBubble({ children }: { children: React.ReactNode }) {
  return (
    <ChatBubble
      avatar={<ChatBubbleAvatarGenAI />}
      backgroundColor="grey"
      inlineActions={<InlineActions />}
      showInlineActionsOnHover={true}
    >
      <SpaceBetween size="s">{children}</SpaceBetween>
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

function ChatBubbleCodeView() {
  return (
    <CodeView
      content='const hello: string = "world";
  console.log(hello);'
      lineNumbers={true}
      actions={
        <CopyToClipboard
          copyButtonAriaLabel="Copy code"
          copyErrorText="Code failed to copy"
          copySuccessText="Code copied"
          textToCopy='const hello: string = "world";
  console.log(hello);'
        />
      }
    />
  );
}

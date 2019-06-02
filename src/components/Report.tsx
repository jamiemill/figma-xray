import React, { useState } from "react";
import styled from "styled-components";

import { FileData, ImageData } from "../api";

import {
  ComponentSummary,
  ComponentWithStats
} from "../analysis/componentSummary";
import { InlineTextStyleNodes } from "../analysis/findStyles";
import { Tabs, Tab } from "./Tabs";
import { ComponentNodeCard, NodeCard, NodeCardGrid } from "./NodeCard";
import { Index } from "../analysis/indexBuilder";

type ReportProps = {
  fileID: string | null;
  fileData: FileData;
  summary: ComponentSummary | null;
  imageData: ImageData;
  inlineTextStyleNodes: InlineTextStyleNodes | null;
  index: Index;
};

type SectionProps = {
  subtitle?: string;
  components: Array<ComponentWithStats>;
  imageData: ImageData;
  sort: Sorts;
  index: Index;
};

type Tabs = "LIBRARY" | "DOCUMENT" | "DELETED_FROM_DOCUMENT" | "INLINE_STYLES";
type Sorts = "NAME" | "USAGE";

function Report({
  fileID,
  fileData,
  summary,
  imageData,
  inlineTextStyleNodes,
  index
}: ReportProps) {
  const [currentTab, setCurrentTab] = useState<Tabs>("LIBRARY");
  const [currentSort, setCurrentSort] = useState<Sorts>("USAGE");

  if (fileData === null || summary === null || fileID === null) {
    return null;
  }

  return (
    <div>
      <Tabs>
        <Tab
          name="Library Components"
          active={currentTab === "LIBRARY"}
          count={summary.LIBRARY.length}
          onClick={() => {
            setCurrentTab("LIBRARY");
          }}
        />
        <Tab
          name="Local Components"
          active={currentTab === "DOCUMENT"}
          count={summary.DOCUMENT.length}
          onClick={() => setCurrentTab("DOCUMENT")}
        />
        <Tab
          name="Deleted Components"
          active={currentTab === "DELETED_FROM_DOCUMENT"}
          count={summary.DELETED_FROM_DOCUMENT.length}
          onClick={() => setCurrentTab("DELETED_FROM_DOCUMENT")}
        />
        <Tab
          name="Inline Styles"
          active={currentTab === "INLINE_STYLES"}
          count={inlineTextStyleNodes ? inlineTextStyleNodes.length : 0}
          onClick={() => setCurrentTab("INLINE_STYLES")}
        />
      </Tabs>
      {(currentTab === "LIBRARY" ||
        currentTab === "DOCUMENT" ||
        currentTab === "DELETED_FROM_DOCUMENT") && (
        <Tabs>
          <Tab
            name="Sort by Usage"
            active={currentSort === "USAGE"}
            onClick={() => setCurrentSort("USAGE")}
          />
          <Tab
            name="Sort by Name"
            active={currentSort === "NAME"}
            onClick={() => setCurrentSort("NAME")}
          />
        </Tabs>
      )}

      {currentTab === "LIBRARY" && (
        <Section
          subtitle="These are the components you've used from the team library."
          components={summary.LIBRARY}
          imageData={imageData}
          sort={currentSort}
          index={index}
        />
      )}
      {currentTab === "DOCUMENT" && (
        <Section
          subtitle="If any are not used, consider deleting them."
          components={summary.DOCUMENT}
          imageData={imageData}
          sort={currentSort}
          index={index}
        />
      )}
      {currentTab === "DELETED_FROM_DOCUMENT" && (
        <Section
          subtitle="Undiscoverable components. Consider restoring the master, or replace the instance."
          components={summary.DELETED_FROM_DOCUMENT}
          imageData={imageData}
          sort={currentSort}
          index={index}
        />
      )}
      {currentTab === "INLINE_STYLES" && (
        <SectionContainer>
          <SectionSubtitle>
            These text layers are not connected to any style. Consider defining
            new styles or assigning to existing ones.
          </SectionSubtitle>
          <NodeCardGrid>
            {inlineTextStyleNodes &&
              (inlineTextStyleNodes.length > 0
                ? inlineTextStyleNodes.map(node => (
                    <NodeCard
                      key={node.node.id}
                      node={node}
                      imageData={imageData}
                    />
                  ))
                : "None.")}
          </NodeCardGrid>
        </SectionContainer>
      )}
    </div>
  );
}

const sorters = {
  USAGE: (a: ComponentWithStats, b: ComponentWithStats): number =>
    -1 * (a.count > b.count ? 1 : a.count < b.count ? -1 : 0),
  NAME: (a: ComponentWithStats, b: ComponentWithStats): number =>
    a.name.localeCompare(b.name)
};

function Section({
  subtitle,
  components,
  imageData,
  sort,
  index
}: SectionProps) {
  const count = components.length;
  const sorted = components.slice(0).sort(sorters[sort]);
  return (
    <SectionContainer>
      <SectionSubtitle>{subtitle}</SectionSubtitle>
      <NodeCardGrid>
        {count > 0
          ? sorted.map(component => (
              <ComponentNodeCard
                key={component.id}
                component={component}
                imageData={imageData}
                index={index}
              />
            ))
          : "None."}
      </NodeCardGrid>
    </SectionContainer>
  );
}

const SectionSubtitle = styled.p`
  margin: 10px 0 20px 0;
  font-weight: 600;
  padding: 10px;
  border-left: 3px solid #123;
`;
const SectionContainer = styled.section``;

export default Report;

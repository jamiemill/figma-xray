import React, { useState } from "react";
import styled from "styled-components";

import { FileData, ImageData } from "../api";
import componentIcon from "../icons/ComponentIcon.svg";
import pageIcon from "../icons/PageIcon.svg";

import {
  ComponentSummary,
  ComponentWithStats,
  Path
} from "../analysis/analysis";
import { Tabs, Tab } from "./Tabs";

type ReportProps = {
  fileID: string | null;
  fileData: FileData;
  summary: ComponentSummary | null;
  imageData: ImageData;
};

type SectionProps = {
  name: string;
  subtitle?: string;
  components: Array<ComponentWithStats>;
  imageData: ImageData;
};

type ComponentProps = {
  component: ComponentWithStats;
  imageData: ImageData;
};

type Tabs = "LIBRARY" | "DOCUMENT" | "DELETED_FROM_DOCUMENT";

function Report({ fileID, fileData, summary, imageData }: ReportProps) {
  const [currentTab, setCurrentTab] = useState<Tabs>("LIBRARY");

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
      </Tabs>
      {currentTab === "LIBRARY" && (
        <Section
          name="Library Components"
          subtitle="These are the components you've used from the team library."
          components={summary.LIBRARY}
          imageData={imageData}
        />
      )}
      {currentTab === "DOCUMENT" && (
        <Section
          name="Local Components"
          subtitle="If any are not used, consider deleting them."
          components={summary.DOCUMENT}
          imageData={imageData}
        />
      )}
      {currentTab === "DELETED_FROM_DOCUMENT" && (
        <Section
          name="Deleted Components"
          subtitle="Undiscoverable components. Consider restoring the master, or replace the instance."
          components={summary.DELETED_FROM_DOCUMENT}
          imageData={imageData}
        />
      )}
    </div>
  );
}

function Section({ name, subtitle, components, imageData }: SectionProps) {
  const count = components.length;
  return (
    <SectionContainer>
      <SectionSubtitle>{subtitle}</SectionSubtitle>
      <ComponentsList>
        {count > 0
          ? components.map(component => (
              <Component
                key={component.id}
                component={component}
                imageData={imageData}
              />
            ))
          : "None."}
      </ComponentsList>
    </SectionContainer>
  );
}

function Component({ component, imageData }: ComponentProps) {
  const [expandInstances, setExpandInstances] = useState<boolean>(false);

  return (
    <ComponentContainer>
      <ComponentPath>
        {component.path && component.path.join(" > ")}
      </ComponentPath>
      <ComponentName>
        <img src={componentIcon} alt="Figma Component Icon" /> {component.name}
      </ComponentName>
      <ComponentImageContainer>
        {imageData && (
          <img
            srcSet={imageData[component.id] + " 2w"}
            sizes="1px"
            src={imageData[component.id]}
            alt="Component Preview"
          />
        )}
      </ComponentImageContainer>
      <ComponentCount onClick={() => setExpandInstances(!expandInstances)}>
        <Count>{component.count}</Count>{" "}
        {component.count === 0
          ? "instances"
          : component.count === 1
          ? "instance..."
          : "instances..."}
      </ComponentCount>
      {expandInstances ? (
        <InstanceList instances={component.instances} />
      ) : null}
    </ComponentContainer>
  );
}

function InstanceList({ instances }: { instances: Array<{ path: Path }> }) {
  return (
    <InstanceListContainer>
      {instances.map(
        (ins, i) =>
          ins.path && (
            <div>
              <img src={pageIcon} alt="Figma Page Icon" />{" "}
              {ins.path.join(" > ")}
            </div>
          )
      )}
    </InstanceListContainer>
  );
}

const InstanceListContainer = styled.div`
  font-size: 85%;
  margin-top: 10px;
  margin-left: 5px;
`;

const SectionName = styled.h2`
  font-weight: 700;
  margin: 10px 0 10px 0;
`;
const SectionSubtitle = styled.p`
  margin: 10px 0 20px 0;
`;
const SectionContainer = styled.section``;
const ComponentContainer = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 20px;
  border-radius: 3px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(25, 25, 25, 0.06) 0px 7px 15px 0px;
`;
const ComponentsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ComponentImageContainer = styled.div`
  margin: 20px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  img {
    max-width: 200px;
    max-height: 200px;
  }
`;
const ComponentPath = styled.div`
  color: #999;
  font-size: 85%;
  margin-bottom: 4px;
`;
const ComponentName = styled.div`
  font-weight: bold;
  color: #7b67fb;
`;
const ComponentCount = styled.div`
  cursor: pointer;
  font-size: 85%;
`;
const Count = styled.span`
  display: inline-block;
  border-radius: 1em;
  background-color: #ddd;
  font-weight: bold;
  padding: 0.2em 0.5em;
`;

export default Report;

import React from "react";
import { FileData, ImageData } from "./api";

import {componentSummary, ComponentWithStats} from "./analysis";
import styled from "styled-components";

type ReportProps =  {
  fileData: FileData,
  imageData: ImageData
};

type SectionProps = {
  name: string,
  components: Array<ComponentWithStats>,
  imageData: ImageData
};

type ComponentProps = {
  component: ComponentWithStats,
  imageData: ImageData
};



function Report({ fileData, imageData }: ReportProps) {
  if (fileData === null) {
    return null;
  }
  const summary = componentSummary(fileData);
  console.log(summary);

  return <div>
    <DocumentName>{fileData.name}</DocumentName>
    <Section name="Components from the Library" components={summary.LIBRARY} imageData={imageData} />
    <Section name="Components in the Document" components={summary.DOCUMENT} imageData={imageData} />
    <Section name="Deleted Components" components={summary.DELETED_FROM_DOCUMENT} imageData={imageData} />
  </div>;
}

function Section({name, components, imageData}:SectionProps) {
  return <SectionContainer>
    <SectionName>{name}</SectionName>
    <ComponentsList>
      {components.length > 0 ?
        components.map(component => <Component key={component.id} component={component} imageData={imageData} />)
      : "None."}
    </ComponentsList>
  </SectionContainer>
}

function Component({component, imageData}: ComponentProps) {
  return <ComponentContainer>
    <ComponentPath>{component.path && component.path.join(" > ")}</ComponentPath>
    <ComponentName>{component.name}</ComponentName>
    <ComponentImageContainer>
      <img src={imageData ? imageData[component.id] : ""} />
    </ComponentImageContainer>
    <ComponentCount><Count>{component.count}</Count> instances</ComponentCount>
  </ComponentContainer>
}


const DocumentName = styled.h1`
`;
const SectionName = styled.h2`
`;
const SectionContainer = styled.section`
`;
const ComponentContainer = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 20px;
  border-radius: 3px;
  background-color: #eee;
`;
const ComponentsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ComponentImageContainer = styled.div`
  margin: 20px 0;
  img {
    max-width: 400px;
    max-height: 400px;
  }
`;
const ComponentPath = styled.div`
  color: #999;
  font-size: 85%;
`;
const ComponentName = styled.div`
  font-weight: bold;
`;
const ComponentCount = styled.div``;
const Count = styled.span`
  display: inline-block;
  border-radius: 1em;
  background-color: #ddd;
  font-weight: bold;
  padding: 0.25em 0.75em;
`;

export default Report;

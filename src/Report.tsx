import React from "react";
import { FileData, ImageData } from "./api";

import {componentSummary, ComponentWithStats} from "./analysis";
import styled from "styled-components";

type ReportProps =  {
  fileData: FileData,
  imageData: ImageData,
  lintErrors: any
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



function Report({ fileData, imageData, lintErrors }: ReportProps) {
  if (fileData === null) {
    return null;
  }
  const summary = componentSummary(fileData);

  return <div>
    <DocumentName><DocumentNameLabel>File:</DocumentNameLabel> {fileData.name}</DocumentName>
    <LintErrors lintErrors={lintErrors} />
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
      <img src={imageData ? imageData[component.id] : ""} alt="" />
    </ComponentImageContainer>
    <ComponentCount><Count>{component.count}</Count> instances</ComponentCount>
  </ComponentContainer>
}

function LintErrors({lintErrors}:{lintErrors:Array<any>|null}) {
  return  <SectionContainer>
    <SectionName>Lint Errors</SectionName>
    {lintErrors ?
      <div>{lintErrors.map((e:any,i:number) => <LintError key={i} location={e.location} message={e.message} />)}</div>
      : <div>None.</div>
    }
  </SectionContainer>
}

function LintError({location, message}: {location:string, message:string}) {
  return <div>{location} &mdash; {message}</div>
}


const DocumentName = styled.h1`
  font-weight:900;
`;
const DocumentNameLabel = styled.span`
  font-weight: 300;
  color: #999;
`;
const SectionName = styled.h2`
  font-weight:500;
`;
const SectionContainer = styled.section`
`;
const ComponentContainer = styled.div`
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 20px;
  border-radius: 3px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(25,25,25,0.06) 0px 7px 15px 0px;
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
`;
const ComponentName = styled.div`
  font-weight: bold;
  color: #999;
`;
const ComponentCount = styled.div`
  font-size: 85%;
`;
const Count = styled.span`
  display: inline-block;
  border-radius: 1em;
  background-color: #ddd;
  font-weight: bold;
  padding: 0.25em 0.75em;
`;

export default Report;

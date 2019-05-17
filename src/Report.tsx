import React from "react";
import { FileData, ImageData } from "./api";

import {componentSummary, ComponentWithStats} from "./analysis";

type SectionProps = {
  name: string,
  components: Array<ComponentWithStats>,
  imageData: ImageData
};

function Section({name, components, imageData}:SectionProps) {
  return <div>
    <h2>{name}</h2>
    {components.length > 0 ?
      components.map(component => <div key={component.id}>
        <img src={imageData ? imageData[component.id] : ""} />
        {component.path && component.path.join(" > ")}
        &gt; <strong>{component.name}</strong>
        <br />
        {component.count} instances.
      </div>)
    : "None."}
  </div>
}

type ReportProps =  {
  fileData: FileData,
  imageData: ImageData
};

function Report({ fileData, imageData }: ReportProps) {
  if (fileData === null) {
    return null;
  }
  const summary = componentSummary(fileData);
  console.log(summary);

  return <div>
    <h1>{fileData.name}</h1>
    <Section name="Components from the Library" components={summary.LIBRARY} imageData={imageData} />
    <Section name="Components in the Document" components={summary.DOCUMENT} imageData={imageData} />
    <Section name="Deleted Components" components={summary.DELETED_FROM_DOCUMENT} imageData={imageData} />
  </div>;
}

export default Report;

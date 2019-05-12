import React from "react";
import { FileData } from "./App";

import {componentSummary, ComponentWithStats} from "./analysis";

function Section({name, components}:{name: string, components:Array<ComponentWithStats>}) {
  return <div>
    <h2>{name}</h2>
    {components.length > 0 ?
      components.map(component => <div key={component.id}>
        {component.path && component.path.join(" > ")}
        &gt; <strong>{component.name}</strong>
        <br />
        {component.count} instances.
      </div>)
    : "None."}
  </div>
}

function Report({ fileData }: { fileData: FileData }) {
  if (fileData === null) {
    return null;
  }
  const summary = componentSummary(fileData);
  console.log(summary);

  return <div>
    <h1>{fileData.name}</h1>
    <Section name="Components from the Library" components={summary.LIBRARY} />
    <Section name="Components in the Document" components={summary.DOCUMENT} />
    <Section name="Deleted Components" components={summary.DELETED_FROM_DOCUMENT} />
  </div>;
}

export default Report;

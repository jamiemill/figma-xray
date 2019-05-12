import React from "react";
import { FileData } from "./App";

import {componentReportFromComponents} from "./analysis";

function Report({ fileData }: { fileData: FileData }) {
  return fileData ? <div>
    <h1>{fileData.name}</h1>
    <div>{JSON.stringify(componentReportFromComponents(fileData))}</div>
  </div> : null;
}

export default Report;

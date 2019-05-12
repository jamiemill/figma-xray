import React from "react";
import { FileData } from "./App";

import {componentSummary} from "./analysis";

function Report({ fileData }: { fileData: FileData }) {
  return fileData ? <div>
    <h1>{fileData.name}</h1>
    <pre>{JSON.stringify(componentSummary(fileData), null, "  ")}</pre>
  </div> : null;
}

export default Report;

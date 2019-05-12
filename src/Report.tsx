import React from "react";
import { FileData } from "./App";

function Report({ fileData }: { fileData: FileData }) {
  return fileData ? <div>
    <h1>{fileData.name}</h1>
  </div> : null;
}

export default Report;

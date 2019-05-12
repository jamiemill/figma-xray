import React from "react";
import { FileData } from "./App";

function Report({ fileData }: { fileData: FileData }) {
  return fileData ? <div>Report Here</div> : null;
}



export default Report;

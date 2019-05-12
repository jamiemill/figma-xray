import React, { useEffect } from "react";
import * as Figma from "figma-js";
import { FileInfo } from "./Form";

function Report({ fileInfo }: { fileInfo: FileInfo }) {
  useEffect(() => {
    console.log("fetching...", fileInfo);
    fetchDocument(fileInfo);
  }, [fileInfo]);

  return <div>Report Here</div>;
}

function fetchDocument(fileInfo: FileInfo) {
  if (!fileInfo) {
    return;
  }
  
  const client = Figma.Client({
    personalAccessToken: fileInfo.personalToken
  });

  client.file(fileInfo.fileURL).then(({ data }) => {
    console.log(data);
  });
}

export default Report;

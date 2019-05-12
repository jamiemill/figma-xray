import React, {useState, useEffect} from 'react';
import './App.css';
import Form, {FileInfo} from "./Form";
import Report from "./Report";    
import * as Figma from "figma-js";

export type FileData = object | null;

function App() {
  const [fileInfo, setFileInfo] = useState<FileInfo>(null);
  const [fileData, setFileData] = useState<FileData>(null);

  function handleFileInfoChange(fileInfo:FileInfo) {
    setFileInfo(fileInfo);
  }

  useEffect(() => {
    if(fileInfo) {
      fetchDocument(fileInfo).then(setFileData);
    }
  }, [fileInfo]);

  return (
    <div>
      <Form callback={handleFileInfoChange} />
      {fileData ? <Report fileData={fileData} /> : null}
    </div>
  );
}

function fetchDocument(fileInfo: FileInfo):Promise<FileData> {
  const p = new Promise((resolve, reject) => {
    if (!fileInfo) {
      reject();
      return;
    }
    const client = Figma.Client({
      personalAccessToken: fileInfo.personalToken
    })
    client.file(fileInfo.fileURL).then(({ data }) => {
      resolve(data);
    });
  })
  return p;
}

export default App;

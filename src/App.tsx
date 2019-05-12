import React, {useState, useEffect} from 'react';
import './App.css';
import Form, {ApiInfo} from "./Form";
import Report from "./Report";    
import * as Figma from "figma-js";

export type FileData = object | null;

function App() {
  const [apiInfo, setApiInfo] = useState<ApiInfo>(null);
  const [fileData, setFileData] = useState<FileData>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleFileInfoChange(apiInfo:ApiInfo) {
    setApiInfo(apiInfo);
  }

  useEffect(() => {
    if(apiInfo) {
      setLoading(true);
      fetchDocument(apiInfo).then((data) => {
        setFileData(data);
        setLoading(false)
      });
    }
  }, [apiInfo]);

  return (
    <div>
      <Form callback={handleFileInfoChange} />
      {loading ? "Loading..." : null}
      {fileData ? <Report fileData={fileData} /> : null}
    </div>
  );
}

function fetchDocument(apiInfo: ApiInfo):Promise<FileData> {
  const p = new Promise((resolve, reject) => {
    if (!apiInfo) {
      reject();
      return;
    }
    const client = Figma.Client({
      personalAccessToken: apiInfo.personalToken
    })
    client.file(apiInfo.fileURL).then(({ data }) => {
      resolve(data);
    });
  })
  return p;
}

export default App;

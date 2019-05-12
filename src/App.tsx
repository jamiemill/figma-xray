import React, {useState, useEffect} from 'react';
import Form, {ApiInfo} from "./Form";
import Report from "./Report";    
import * as Figma from "figma-js";
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
`;

export type FileData = Figma.FileResponse | null;

function App() {
  const [apiInfo, setApiInfo] = useState<ApiInfo>(null);
  const [fileData, setFileData] = useState<FileData>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleApiInfoChange(apiInfo:ApiInfo) {
    setApiInfo(apiInfo);
  }

  useEffect(() => {
    if(apiInfo) {
      setLoading(true);
      setFileData(null);
      fetchDocument(apiInfo).then((data) => {
        setFileData(data);
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [apiInfo]);

  return (
    <Container>
      <Form onSubmit={handleApiInfoChange} />
      {loading ? "Loading..." : null}
      {fileData ? <Report fileData={fileData} /> : null}
    </Container>
  );
}

function fetchDocument(apiInfo: ApiInfo):Promise<FileData> {
  const p = new Promise<FileData>((resolve, reject) => {
    if (!apiInfo) {
      reject();
      return;
    }
    const client = Figma.Client({
      personalAccessToken: apiInfo.personalToken
    })
    client.file(apiInfo.fileURL).then(({ data }) => {
      resolve(data);
    }).catch(reject);
  })
  return p;
}

export default App;

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
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleApiInfoChange(apiInfo:ApiInfo) {
    setApiInfo(apiInfo);
  }

  const fileURL: string | null = apiInfo && apiInfo.fileURL;
  const personalToken: string | null = apiInfo && apiInfo.personalToken;

  useEffect(() => {
    if(fileURL && personalToken) {
      setLoading(true);
      setFileData(null);
      setError(null);
      fetchDocument(fileURL, personalToken).then((data) => {
        setFileData(data);
        setLoading(false);
        setError(null);
      }).catch((e) => {
        setError(e.message);
        setLoading(false);
      });
    } else {
      setLoading(false);
      setFileData(null);
      setError("Please specify a token and a file.");
    }
  }, [fileURL, personalToken]);

  return (
    <Container>
      <Form onSubmit={handleApiInfoChange} />
      {loading ? "Loading..." : null}
      {error ? error : null}
      {fileData ? <Report fileData={fileData} /> : null}
    </Container>
  );
}

function fetchDocument(fileURL:string, personalToken:string):Promise<FileData> {
  const p = new Promise<FileData>((resolve, reject) => {
    if (!fileURL || !personalToken) {
      reject();
      return;
    }
    const client = Figma.Client({
      personalAccessToken: personalToken
    })
    client.file(fileURL).then(({ data }) => {
      resolve(data);
    }).catch(reject);
  })
  return p;
}

export default App;

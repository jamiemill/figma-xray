import React, {useState, useEffect} from 'react';
import Form, {ApiInfo} from "./Form";
import Report from "./Report";
import styled from "styled-components";
import {fetchDocument, FileData, ImageData, fetchImages} from "./api";
import lint from "./lint";

const Container = styled.div`
  padding: 1em;
`;

function App() {
  const [apiInfo, setApiInfo] = useState<ApiInfo>(null);
  const [fileData, setFileData] = useState<FileData>(null);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<"LOADING_DOCUMENT" | "LOADING_IMAGES" | "LINTING" | "NONE">("NONE");
  const [imageData, setImageData] = useState<ImageData>(null);
  const [lintErrors, setLintErrors] = useState<any>(null);

  function handleApiInfoChange(apiInfo:ApiInfo) {
    setApiInfo(apiInfo);
  }

  const fileID: string | null = apiInfo && apiInfo.fileID;
  const personalToken: string | null = apiInfo && apiInfo.personalToken;

  useEffect(() => {
    if(fileID && personalToken) {
      const loadEverything = async () => {
        setLoading("LOADING_DOCUMENT");
        setFileData(null);
        setImageData(null);
        setError(null);
        const fileData = await fetchDocument(fileID, personalToken);
        setFileData(fileData);

        setLoading("LINTING");
        const lintErrors = await lint(fileData);
        setLintErrors(lintErrors);

        setLoading("LOADING_IMAGES");
        const componentIds = fileData ? Object.keys(fileData.components) : [];
        const images = await fetchImages(fileID, personalToken, componentIds);
        setImageData(images);

        setLoading("NONE");
      }
      loadEverything().catch((e) => {
        setLoading("NONE");
        if (e.request) {
          setError(e.message);
        } else {
          throw e;
        }
      });
    } else {
      setLoading("NONE");
      setFileData(null);
      setImageData(null);
    }
  }, [fileID, personalToken]);

  return (
    <Container>
      <Form onSubmit={handleApiInfoChange} />
      { {"NONE" : null, "LOADING_DOCUMENT": "Loading document...", "LOADING_IMAGES": "Loading images...", "LINTING": "Linting..."}[loading] }
      {error ? error : null}
      {fileData ? <Report fileData={fileData} imageData={imageData} lintErrors={lintErrors} /> : null}
    </Container>
  );
}

export default App;

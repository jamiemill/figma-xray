import React, {useState, useEffect} from 'react';
import Form, {ApiInfo} from "./Form";
import Report from "./Report";
import styled from "styled-components";
import {fetchDocument, FileData, ImageData, fetchImages} from "./api";

const Container = styled.div`
  padding: 1em;
`;

function App() {
  const [apiInfo, setApiInfo] = useState<ApiInfo>(null);
  const [fileData, setFileData] = useState<FileData>(null);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<ImageData>(null);

  function handleApiInfoChange(apiInfo:ApiInfo) {
    setApiInfo(apiInfo);
  }

  const fileURL: string | null = apiInfo && apiInfo.fileURL;
  const personalToken: string | null = apiInfo && apiInfo.personalToken;

  useEffect(() => {
    if(fileURL && personalToken) {
      setLoading(true);
      setFileData(null);
      setImageData(null);
      setError(null);
      fetchDocument(fileURL, personalToken)
      .then((fileData) => {
        setFileData(fileData);
        const componentIds = fileData ? Object.keys(fileData.components) : [];
        return fetchImages(fileURL, personalToken, componentIds);
      })
      .then(images => {
        setImageData(images);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
    } else {
      setLoading(false);
      setFileData(null);
      setImageData(null);
      setError("Please specify a token and a file.");
    }
  }, [fileURL, personalToken]);

  console.log(imageData);

  return (
    <Container>
      <Form onSubmit={handleApiInfoChange} />
      {loading ? "Loading..." : null}
      {error ? error : null}
      {fileData ? <Report fileData={fileData} imageData={imageData} /> : null}
    </Container>
  );
}

export default App;

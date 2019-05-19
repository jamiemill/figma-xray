import React, { useState, useEffect } from "react";
import Form, { ApiInfo } from "./Form";
import File from "./File";
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
`;

function App() {
  const [apiInfo, setApiInfo] = useState<ApiInfo>(null);

  function handleApiInfoChange(apiInfo: ApiInfo) {
    setApiInfo(apiInfo);
  }

  const fileID: string | null = apiInfo && apiInfo.fileID;
  const personalToken: string | null = apiInfo && apiInfo.personalToken;

  return (
    <Container>
      <Form onSubmit={handleApiInfoChange} />
      {fileID && personalToken ? (
        <File fileID={fileID} personalToken={personalToken} />
      ) : null}
    </Container>
  );
}

export default App;

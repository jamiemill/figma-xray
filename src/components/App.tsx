import React, { useState, useEffect } from "react";
import PersonalTokenForm from "./PersonalTokenForm";
import FileIDForm from "./FileIDForm";
import File from "./File";
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
`;

function App() {
  const [personalToken, setPersonalToken] = useState<string|null>(null);
  function handleTokenChange(personalToken:string) {
    setPersonalToken(personalToken);
  }
  const [fileID, setFileID] = useState<string|null>(null);
  function handleFileIDChange(fileID:string) {
    setFileID(fileID);
  }

  return (
    <Container>
      <PersonalTokenForm onSubmit={handleTokenChange} />
      <FileIDForm onSubmit={handleFileIDChange} />
      {fileID && personalToken ? (
        <File fileID={fileID} personalToken={personalToken} />
      ) : null}
    </Container>
  );
}

export default App;

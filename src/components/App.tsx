import React, { useState, useEffect } from "react";
import PersonalTokenForm from "./PersonalTokenForm";
import FileIDForm from "./FileIDForm";
import File from "./File";
import styled from "styled-components";

const Container = styled.div`
  padding: 1em;
`;

function App() {
  const [personalToken, setPersonalToken] = useState<string | null>(null);
  const [fileID, setFileID] = useState<string | null>(null);

  useEffect(() => {
    const savedPersonalToken = window.localStorage.getItem("personalToken") || "";
    if (savedPersonalToken) {
      setPersonalToken(savedPersonalToken);
    }
    const fileIDHashMatch = window.location.hash.match(/#\/file\/(\w+)/);
    if (fileIDHashMatch) {
      setFileID(fileIDHashMatch[1]);
    }
  }, []);

  function handleTokenChange(personalToken: string) {
    setPersonalToken(personalToken);
    window.localStorage.setItem("personalToken", personalToken);
  }
  function handleFileIDChange(fileID: string) {
    setFileID(fileID);
    if (fileID) {
      window.location.hash = `/file/${fileID}`;
    } else {
      window.location.hash = ``;
    }
  }

  return (
    <Container>
      <PersonalTokenForm personalToken={personalToken} onChange={handleTokenChange} />
      {fileID ? null : <FileIDForm onSubmit={handleFileIDChange} />}
      {fileID && personalToken ? (
        <>
          <BackLink onClick={() => handleFileIDChange("")}>Back</BackLink>
          <File fileID={fileID} personalToken={personalToken} />
        </>
      ) : null}
    </Container>
  );
}

export default App;

const BackLink = styled.div`
  text-decoration: underline;
  margin-bottom: 20px;
  cursor: pointer;
`;
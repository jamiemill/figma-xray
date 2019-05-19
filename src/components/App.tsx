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
    const savedPersonalToken =
      window.localStorage.getItem("personalToken") || "";
    if (savedPersonalToken) {
      setPersonalToken(savedPersonalToken);
    }

    handleURLChange();
    window.onpopstate = function() {
      handleURLChange();
    };
  }, []);

  function handleURLChange() {
    const fileIDHashMatch = window.location.hash.match(/#\/file\/(\w+)/);
    if (fileIDHashMatch) {
      setFileID(fileIDHashMatch[1]);
    } else {
      setFileID(null);
    }
  }

  function handleTokenChange(personalToken: string) {
    setPersonalToken(personalToken);
    window.localStorage.setItem("personalToken", personalToken);
  }
  function handleFileIDChange(fileID: string) {
    setFileID(fileID);
    if (fileID) {
      window.history.pushState(null, "", `#/file/${fileID}`);
    } else {
      window.history.pushState(null, "", `#/`);
    }
  }

  return (
    <Container>
      <PersonalTokenForm
        personalToken={personalToken}
        onChange={handleTokenChange}
      />
      {fileID ? null : <FileIDForm onSubmit={handleFileIDChange} />}
      {fileID && personalToken ? (
        <>
          <BackLink onClick={() => handleFileIDChange("")}>
            Choose another file
          </BackLink>
          <File fileID={fileID} personalToken={personalToken} />
        </>
      ) : null}
    </Container>
  );
}

export default App;

const BackLink = styled.div`
  display: inline-block;
  text-decoration: underline;
  margin-bottom: 20px;
  cursor: pointer;
`;

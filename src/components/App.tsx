import React, { useState, useEffect } from "react";
import PersonalTokenForm from "./PersonalTokenForm";
import FileIDForm from "./FileIDForm";
import File from "./File";
import styled from "styled-components";

import TestWorker from "../workers/test.worker.ts"; // seem to have to include .ts extension for wildcard module to be matched

const Container = styled.div`
  padding: 20px;
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

    const worker1 = new TestWorker();

    worker1.postMessage("hello worker 1");
    worker1.addEventListener("message", (event: any) => {
      console.log("from worker 1", event);
    });

    const worker2 = new TestWorker();

    worker2.postMessage("hello worker 2");
    worker2.addEventListener("message", (event: any) => {
      console.log("from worker 2", event);
    });
    setTimeout(() => {
      worker1.terminate();
      worker2.terminate();
    }, 4000);
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
      {!fileID && (
        <FileIDForm onSubmit={handleFileIDChange} noTokenYet={!personalToken} />
      )}
      {personalToken && fileID && (
        <>
          <BackLink onClick={() => handleFileIDChange("")}>
            Choose another file
          </BackLink>
          <File fileID={fileID} personalToken={personalToken} />
        </>
      )}
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

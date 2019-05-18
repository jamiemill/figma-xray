import React, {useState, SyntheticEvent, useEffect} from 'react';
import styled from "styled-components";

const FormContainer = styled.div`
  margin-bottom: 40px;
`;

const Input = styled.input`
  padding: 0.75em 1em;
  border-radius: 0.25em;
  border: 1px solid #ccc;
  width: 100%;
  font-family: monospace;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5em;
`;

const Field = styled.div`
  margin-bottom: 1em;
`;

const Button = styled.button`
  background-color: #123;
  font-weight: bold;
  border: none;
  border-radius: 0.25em;
  color: white;
  padding: 0.75em 1em;
`;

export type ApiInfo = {
  personalToken:string,
  fileID:string
} | null;

type OnSubmit = (apiInfo:ApiInfo) => void;

type FormProps = {
  onSubmit: OnSubmit
};

function Form(props:FormProps) {
  const [personalToken, setPersonalToken] = useState("");
  const [fileID, setFileID] = useState("");

  useEffect(() => {
    const savedPersonalToken = window.localStorage.getItem("personalToken") || "";
    const savedFileID = window.localStorage.getItem("fileID") || "";
    if (savedPersonalToken) {
      setPersonalToken(savedPersonalToken);
    }
    if (savedFileID) {
      setFileID(savedFileID);
    }
  }, []);

  function handleSubmit(e:SyntheticEvent) {
    e.preventDefault();
    props.onSubmit({personalToken, fileID: fileID})
    window.localStorage.setItem("personalToken", personalToken);
    window.localStorage.setItem("fileID", fileID);
  }

  return <FormContainer>
    <form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="personalToken">Figma Personal Token</Label>
        <Input autoComplete="off" name="personalToken" value={personalToken} onChange={e => setPersonalToken(e.target.value)} />
      </Field>
      <Field>
        <Label htmlFor="fileID">Figma File ID</Label>
        <Input autoComplete="off" name="fileID" value={fileID} onChange={e => setFileID(e.target.value)} />
      </Field>
      <Field>
        <Button type="submit">Analyse file</Button>
      </Field>
    </form>
  </FormContainer>
}

export default Form;
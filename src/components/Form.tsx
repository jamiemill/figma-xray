import React, {useState, SyntheticEvent, useEffect} from 'react';
import { Field, Label, Input, Button } from './Elements';
import styled from 'styled-components';

export const FormContainer = styled.div`
  margin-bottom: 40px;
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
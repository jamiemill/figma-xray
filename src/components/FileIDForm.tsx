import React, {useState, SyntheticEvent, useEffect} from 'react';
import { Field, Label, Input, Button } from './Elements';
import styled from 'styled-components';

export const FormContainer = styled.div`
  margin-bottom: 40px;
`;

type OnSubmit = (personalToken:string) => void;

type FormProps = {
  onSubmit: OnSubmit
};

function FileIDForm(props:FormProps) {
  const [fileID, setFileID] = useState("");

  function handleSubmit(e:SyntheticEvent) {
    e.preventDefault();
    props.onSubmit(fileID)
  }

  return <FormContainer>
    <form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="personalToken">File ID</Label>
        <Input autoComplete="off" name="personalToken" value={fileID} onChange={e => setFileID(e.target.value)} />
      </Field>
      <Field>
        <Button type="submit">Analyse file</Button>
      </Field>
    </form>
  </FormContainer>
}

export default FileIDForm;
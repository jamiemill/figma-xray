import React, {useState, SyntheticEvent} from 'react';
import styled from "styled-components";

const FormContainer = styled.div`
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
  fileURL:string
} | null;

type OnSubmit = (apiInfo:ApiInfo) => void;

type FormProps = {
  onSubmit: OnSubmit
};

function Form(props:FormProps) {
  const [personalToken, setPersonalToken] = useState("");
  const [fileURL, setFileURL] = useState("");

  function handleSubmit(e:SyntheticEvent) {
    e.preventDefault();
    props.onSubmit({personalToken, fileURL})
  }

  return <FormContainer>
    <form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="personalToken">Figma Personal Token</Label>
        <Input autoComplete="off" name="personalToken" value={personalToken} onChange={e => setPersonalToken(e.target.value)} />
      </Field>
      <Field>
        <Label htmlFor="fileURL">Figma File URL</Label>
        <Input autoComplete="off" name="fileURL" value={fileURL} onChange={e => setFileURL(e.target.value)} />
      </Field>
      <Field>
        <Button type="submit">Analyse file</Button>
      </Field>
    </form>
  </FormContainer>
}

export default Form;
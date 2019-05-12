import React, {useState, SyntheticEvent} from 'react';
import styled from "styled-components";

const Input = styled.input`
  padding: 0.3em;
  border-radius: 0.3em;
  border: 1px solid #ccc;
`;

export type ApiInfo = {
  personalToken:string,
  fileURL:string
} | null;

type Callback = (apiInfo:ApiInfo) => void;

type FormProps = {
  callback: Callback
};

function Form(props:FormProps) {
  const [personalToken, setPersonalToken] = useState("");
  const [fileURL, setFileURL] = useState("");

  function handleSubmit(e:SyntheticEvent) {
    e.preventDefault();
    props.callback({personalToken, fileURL})
  }

  return <form onSubmit={handleSubmit}>
    <label>Figma Personal Token
      <Input value={personalToken} onChange={e => setPersonalToken(e.target.value)} />
    </label>
    <label>Figma File URL
      <Input value={fileURL} onChange={e => setFileURL(e.target.value)} />
    </label>
    <button type="submit">Analyse file</button>
  </form>
}

export default Form;
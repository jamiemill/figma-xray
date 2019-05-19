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

function PersonalTokenForm(props:FormProps) {
  const [personalToken, setPersonalToken] = useState("");

  useEffect(() => {
    const savedPersonalToken = window.localStorage.getItem("personalToken") || "";
    if (savedPersonalToken) {
      setPersonalToken(savedPersonalToken);
    }
  }, []);

  function handleSubmit(e:SyntheticEvent) {
    e.preventDefault();
    props.onSubmit(personalToken)
    window.localStorage.setItem("personalToken", personalToken);
  }

  return <FormContainer>
    <form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="personalToken">Personal Token</Label>
        <Input autoComplete="off" name="personalToken" value={personalToken} onChange={e => setPersonalToken(e.target.value)} />
      </Field>
      <Field>
        <Button secondary type="submit">Set</Button>
      </Field>
    </form>
  </FormContainer>
}

export default PersonalTokenForm;
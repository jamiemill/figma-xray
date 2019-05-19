import React, {useState, SyntheticEvent} from 'react';
import { Field, Label, Input, Button } from './Elements';
import styled from 'styled-components';

export const FormContainer = styled.div`
  margin-bottom: 40px;
`;

type OnSubmit = (personalToken:string) => void;

type FormProps = {
  onChange: OnSubmit,
  personalToken: string | null
};

function PersonalTokenForm({onChange, personalToken}:FormProps) {
  return <FormContainer>
    <form>
      <Field>
        <Label htmlFor="personalToken">Personal Token</Label>
        <Input autoComplete="off" name="personalToken" value={personalToken || ""} onChange={e => onChange(e.target.value)} />
      </Field>
    </form>
  </FormContainer>
}

export default PersonalTokenForm;
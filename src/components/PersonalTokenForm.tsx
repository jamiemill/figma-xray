import React, { useState, useRef } from "react";
import { Field, Label, Input } from "./Elements";
import styled from "styled-components";

export const FormContainer = styled.div`
  margin-bottom: 40px;
`;

type OnSubmit = (personalToken: string) => void;

type FormProps = {
  onChange: OnSubmit;
  personalToken: string | null;
};

type InnerFormProps = {
  onChange: OnSubmit;
  personalToken: string | null;
  onBlur: () => void;
  onFocus: () => void;
};

function PersonalTokenForm({ onChange, personalToken }: FormProps) {
  const [editing, setEditing] = useState<boolean>(false);
  return (
    <FormContainer>
      {!personalToken || editing ? (
        <Form
          onChange={onChange}
          personalToken={personalToken}
          onFocus={() => setEditing(true)}
          onBlur={() => setEditing(false)}
        />
      ) : (
        <Summary
          personalToken={personalToken}
          onClick={() => setEditing(true)}
        />
      )}
    </FormContainer>
  );
}

function Summary({
  personalToken,
  onClick
}: {
  personalToken: string | null;
  onClick: () => void;
}) {
  return (
    <SummaryContainer>
      Personal Token:{" "}
      <PersonalTokenChangeLink onClick={onClick}>
        {personalToken && personalToken.substr(0, 5) + "..."}
      </PersonalTokenChangeLink>
    </SummaryContainer>
  );
}

const SummaryContainer = styled.div`
  color: #999;
`;

const PersonalTokenChangeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

function Form({ onChange, personalToken, onBlur, onFocus }: InnerFormProps) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <Field>
      <Label htmlFor="personalToken">Personal Token</Label>
      <Input
        autoComplete="off"
        spellCheck={false}
        name="personalToken"
        value={personalToken || ""}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        ref={input}
        placeholder="e.g. 12345-12345678-1234-1234-1234-123456789012"
      />
      <p>
        Generate a token in Figma's Account Settings page and paste it here.
      </p>
    </Field>
  );
}

export default PersonalTokenForm;

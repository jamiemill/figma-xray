import React, { useState, useRef, useEffect } from "react";
import { Field, Label, Input, Button } from "./Elements";
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
};

function PersonalTokenForm({ onChange, personalToken }: FormProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <FormContainer>
      {expanded ? (
        <Form
          onChange={onChange}
          personalToken={personalToken}
          onBlur={() => setExpanded(false)}
        />
      ) : (
        <Summary
          personalToken={personalToken}
          onClick={() => setExpanded(true)}
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
        {personalToken ? personalToken.substr(0, 5) + "..." : "Not set"}
      </PersonalTokenChangeLink>
    </SummaryContainer>
  );
}

const SummaryContainer = styled.div`
  color: #999;
`;

const PersonalTokenChangeLink = styled.span`
  text-decoration: underline;
  /* font-family: monospace; */
  cursor: pointer;
`;

function Form({ onChange, personalToken, onBlur }: InnerFormProps) {
  useEffect(() => {
    input && input.current && input.current.focus();
  }, []);
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

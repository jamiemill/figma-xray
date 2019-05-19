import styled, { css } from "styled-components";

export const Input = styled.input`
  padding: 0.75em;
  border-radius: 0.25em;
  border: 1px solid #ccc;
  width: 100%;
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
`;
export const Label = styled.label`
  display: block;
  font-weight: 700;
  margin-bottom: 0.5em;
`;
export const Field = styled.div`
  margin-bottom: 1em;
`;

type ButtonProps = {
  secondary?: boolean;
};

export const Button = styled.button<ButtonProps>`
  padding: 0.75em 1em;
  font-weight: bold;
  border-radius: 0.25em;
  background-color: #123;
  color: white;
  border: 1px solid #123;
  ${props =>
    props.secondary &&
    css`
      background-color: transparent;
      color: #123;
    `}
`;

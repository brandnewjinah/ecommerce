import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";

//layout component
import { fontSize, neutral } from "./token";
import { Body } from "./Text";

export interface Props {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  margin?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: FC<Props> = ({
  id,
  name,
  label,
  value,
  placeholder,
  error,
  margin,
  onChange,
  ...rest
}) => {
  return (
    <Container margin={margin}>
      {label && <label htmlFor={name}>{label}</label>}

      <TextAreaElement
        id={id ? id : name}
        name={name}
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />

      {error && (
        <Body variant="caption" color="red">
          {error}
        </Body>
      )}
    </Container>
  );
};

const Container = styled.div<Props>`
  width: 100%;
  position: relative;
  margin: ${(props) => (props.margin ? props.margin : "0 0 -.5rem 0")};

  label {
    display: inline-block;
    font-size: ${fontSize.base};
    padding: 0 0 0.5rem;
  }
`;

const TextAreaElement = styled.textarea`
  width: 100%;
  font-size: ${fontSize.base};
  border-radius: 0.35rem;
  border: 1px solid #d2d2d7;
  padding: 0.875rem;
  background-color: rgba(255, 255, 255, 0.8);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.6);
    border-radius: 0.35rem;
    outline: none;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: ${fontSize.sm2};
    color: ${neutral[200]};
  }
`;

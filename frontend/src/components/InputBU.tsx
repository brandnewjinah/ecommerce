import React, { FC, useState } from "react";
import { useField, ErrorMessage } from "formik";
import styled from "styled-components";

//layout component
import { neutral, primaryColor, typeScale } from "./token";
import { Eye, EyeOff } from "../assets/Icons";

export interface Props {
  label?: string;
  name: string;
  type?: "text" | "password" | "number";
}

export const Input: FC<Props> = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  const [password, setPassword] = useState(true);

  return (
    <Container>
      {label && (
        <label htmlFor={field.name} aria-hidden="true">
          {label}
        </label>
      )}
      <InputContainer>
        <InputTag
          className={`${meta.touched && meta.error && "error"}`}
          {...field}
          {...props}
          name={field.name}
          type={
            type === "password" && password
              ? "password"
              : type === "number"
              ? "number"
              : "text"
          }
          aria-label={field.name}
        />
      </InputContainer>
      {type === "password" && (
        <Toggle onClick={() => setPassword(!password)}>
          {password ? (
            <Eye width="20" height="20" color="#000" stroke="1" />
          ) : (
            <EyeOff width="20" height="20" color="#000" stroke="1" />
          )}
        </Toggle>
      )}
      <ErrorMessage name={field.name} component="div" className="errorTxt" />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin: 1rem 0;

  label {
    display: inline-block;
    font-size: ${typeScale.sbody};
    padding: 0 0 0.25rem;
  }

  .errorTxt {
    font-size: ${typeScale.error};
    color: ${primaryColor.error};
    margin: 0.25rem 0;
  }
`;

const InputContainer = styled.div`
  .error {
    background-color: rgba(216, 50, 50, 0.08);
  }
`;

const InputTag = styled.input<Props>`
  width: 100%;
  font-size: ${typeScale.body};
  border-radius: 0.25rem;
  border: 1px solid ${neutral[200]};
  padding: 0.75rem;
  appearance: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 125, 250, 0.6);
    border-radius: 0.25rem;
    outline: none;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 0.925rem;
    color: ${neutral[300]};
  }
`;

const Toggle = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  cursor: pointer;
`;

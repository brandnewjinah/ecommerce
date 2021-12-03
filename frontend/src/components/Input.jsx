import React from "react";
import styled from "styled-components";
import { neutral, primaryColor, fontScale } from "./token";

export const Input = ({
  errors,
  label,
  name,
  placeholder,
  register,
  type,
  pattern,
  maxLength,
  required,
}) => {
  return (
    <Container>
      {label && (
        <label htmlFor={name} aria-hidden="true">
          {label}
        </label>
      )}
      <InputContainer>
        <input
          {...register(name, { required })}
          placeholder={placeholder}
          type={type}
          pattern={pattern}
          maxLength={maxLength}
        />
      </InputContainer>
      {errors[name] && (
        <Error>
          <p>{errors[name].message}</p>
        </Error>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem 0;
`;

const InputContainer = styled.div`
  input {
    width: 100%;
    font-size: ${fontScale.body};
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
  }
`;

const Error = styled.div`
  font-size: ${fontScale.sbody};
  color: ${primaryColor.error};
  padding: 0.35rem 0;
`;

import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";

//components
import { Article } from "./layout/Container";

//import styles and assets
import { Eye, EyeOff } from "../assets/Icons";
import { neutral, typeScale } from "./token";

//token

interface Props {
  label?: string;
  name?: string;
  error?: string;
  type?: string;
  value?: any;
  required?: boolean;
  placeholder?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({
  error,
  label,
  type,
  value,
  required,
  name,
  placeholder,
  handleChange,
}) => {
  const [password, setPassword] = useState(true);

  return (
    <Article padding=".5rem 0">
      <Container>
        {label && (
          <label htmlFor={name} aria-hidden="true">
            {label}
            {required && "*"}
          </label>
        )}
        <Wrapper>
          <input
            name={name}
            placeholder={placeholder}
            value={value}
            type={type === "password" && password ? "password" : "text"}
            className={error ? "input error" : "input"}
            onChange={handleChange}
          />
          {type === "password" && (
            <Toggle onClick={() => setPassword(!password)}>
              {password ? (
                <Eye width="20" height="20" color="#000" stroke="1" />
              ) : (
                <EyeOff width="20" height="20" color="#000" stroke="1" />
              )}
            </Toggle>
          )}
        </Wrapper>
        <Error>{error}</Error>
      </Container>
    </Article>
  );
};

const Container = styled.div`
  label {
    font-size: ${typeScale.sbody};
    display: inline-block;
    color: ${neutral[600]};
    margin-bottom: 0.5rem;
  }

  .error {
    border: 1px solid red;
  }
`;

const Wrapper = styled.div`
  position: relative;

  input {
    width: 100%;
    font-size: 1rem;
    height: 3rem;
    border: 1px solid ${neutral[200]};
    border-radius: 0.25rem;
    padding: 0 0.5rem;
    appearance: none;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 125, 250, 0.6);
    }

    ::placeholder,
    ::-webkit-input-placeholder {
      font-size: ${typeScale.sbody};
      color: ${neutral[300]};
    }
  }
`;

const Toggle = styled.div`
  position: absolute;
  top: 0.9rem;
  right: 0.75rem;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
`;

export default Input;

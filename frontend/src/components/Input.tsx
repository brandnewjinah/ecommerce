import React, { ChangeEvent, FC, useState } from "react";

//import styles and assets
import styled from "styled-components";
import { Eye, EyeOff } from "../assets/Icons";

interface Props {
  error?: string;
  label?: string;
  type?: string;
  value?: any;
  name?: string;
  prefix?: string;
  placeholder?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({
  error,
  label,
  type,
  value,
  name,
  prefix,
  placeholder,
  handleChange,
}) => {
  const [password, setPassword] = useState(true);

  return (
    <Wrapper>
      <label htmlFor="">{label}</label>
      <InputContainer>
        {prefix && <div>{prefix}</div>}
        <input
          className={error ? "input error" : "input"}
          type={type === "password" && password ? "password" : "text"}
          value={value}
          name={name}
          placeholder={placeholder}
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
      </InputContainer>
      {/* {error && <Error>{error}</Error>} */}

      <Error>{error}</Error>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  label {
  }

  .error {
    border: 1px solid red;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e4e4e4;
  border-radius: 0.25em;
  padding: 0 1em;

  .input {
    width: 100%;
    flex: 1;
    border: transparent;
    padding: 0.75em;
    margin: 0.5em 0;
  }
`;

const Error = styled.div`
  color: red;
`;

const Toggle = styled.div`
  right: 0.75em;
  margin-left: 1em;
`;

export default Input;

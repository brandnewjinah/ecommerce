import React, { ChangeEvent, FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {
  error?: string;
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<Props> = ({
  error,
  label,
  type,
  value,
  name,
  handleChange,
}) => {
  return (
    <Wrapper>
      <label htmlFor="">{label}</label>
      <input
        className={error ? "input error" : "input"}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
      />
      {/* {error && <Error>{error}</Error>} */}
      <Error>{error}</Error>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .input {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 0.25em;
    padding: 0.75em;
    margin: 0.5em 0;
  }

  .error {
    border: 1px solid red;
  }
`;

const Error = styled.div`
  color: red;
`;

export default Input;

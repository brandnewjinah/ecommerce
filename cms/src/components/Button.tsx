import React, { ChangeEvent, FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Button: FC<Props> = ({ label, type, value, name, handleChange }) => {
  return <Wrapper>{label}</Wrapper>;
};

const Wrapper = styled.button`
  outline: transparent;
  border: transparent;
  border-radius: 0.25em;
  background-color: blue;
  color: white;
  padding: 0.75em 2em;
`;

export default Button;

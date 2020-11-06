import React, { ChangeEvent, FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick?: () => void;
}

export const Button: FC<Props> = ({
  label,
  type,
  value,
  name,
  handleClick,
}) => {
  return <Wrapper onClick={handleClick}>{label}</Wrapper>;
};

export const BtnText: FC<Props> = ({ label, handleClick }) => {
  return <Text onClick={handleClick}>{label}</Text>;
};

const Wrapper = styled.button`
  outline: transparent;
  border: transparent;
  border-radius: 0.25em;
  background-color: blue;
  color: white;
  padding: 0.75em 2em;
  cursor: pointer;
`;

const Text = styled.button`
  outline: transparent;
  border: transparent;
  background-color: transparent;
  border-bottom: 1px solid #444;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

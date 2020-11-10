import React, { ChangeEvent, FC } from "react";

//import styles and assets
import styled from "styled-components";

interface Props {
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  imp?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick?: () => void;
}

export const Button: FC<Props> = ({
  label,
  type,
  value,
  name,
  imp,
  handleClick,
}) => {
  return (
    <Wrapper
      style={{ backgroundColor: imp === "primary" ? "#f2665c" : "#f2665c" }}
      onClick={handleClick}
    >
      {label}
    </Wrapper>
  );
};

export const BtnText: FC<Props> = ({ label, handleClick }) => {
  return <Text onClick={handleClick}>{label}</Text>;
};

const Wrapper = styled.button`
  outline: transparent;
  border: transparent;
  border-radius: 0.25em;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 1em 2.5em;
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

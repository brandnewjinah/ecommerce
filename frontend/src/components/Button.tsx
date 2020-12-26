import React, { ChangeEvent, FC } from "react";

//import styles and assets
import styled from "styled-components";
import { Close } from "../assets/Icons";
import colors from "./Colors";

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

export const BtnClose: FC<Props> = ({ label, handleClick }) => {
  return (
    <CircleSmall
      onClick={handleClick}
      style={{ backgroundColor: colors.lightgray }}
    >
      <Close width="14" height="14" color={colors.darkergray} stroke="2" />
    </CircleSmall>
  );
};

const Flex = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.6;
  }
`;

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

const Circle = styled.button`
  display: flex;
  padding: 1em;
  border-radius: 50%;
  background-color: #d46f4a;
  border: none;
  outline: transparent;
  cursor: pointer;
`;

const CircleSmall = styled(Flex)`
  padding: 3px;
  border-radius: 50%;
  border: none;
  outline: transparent;
  cursor: pointer;
`;

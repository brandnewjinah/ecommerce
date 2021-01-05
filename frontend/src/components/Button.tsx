import React, { ChangeEvent, FC } from "react";

//import styles and assets
import styled from "styled-components";
import { Close } from "../assets/Icons";
import colors from "./Colors";

interface Props {
  label?: string;
  type?: "fill" | "outline";
  value?: string;
  name?: string;
  imp?: string;
  color?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick?: () => void;
}

export const Button: FC<Props> = ({
  label,
  type,
  color,
  value,
  name,
  imp,
  handleClick,
}) => {
  return (
    <Wrapper
      style={{
        ...(type === "fill" && { backgroundColor: color }),
        ...(type === "outline" && {
          border: `1px solid ${color}`,
          color: color,
          backgroundColor: `transparent`,
        }),
      }}
      onClick={handleClick}
    >
      {label}
    </Wrapper>
  );
};

export const BtnText: FC<Props> = ({ label, color, handleClick }) => {
  return (
    <Text onClick={handleClick}>
      <span style={{ color: color, borderBottom: `1px solid ${color}` }}>
        {label}
      </span>
    </Text>
  );
};

export const BtnClose: FC<Props> = ({ label, handleClick }) => {
  return (
    <CircleSmall
      onClick={handleClick}
      style={{
        backgroundColor: colors.lightgray,
      }}
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
  width: 100%;
  outline: transparent;
  border: transparent;
  border-radius: 0.25em;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 1.25em 2.5em;
  cursor: pointer;
`;

const Text = styled.button`
  outline: transparent;
  border: transparent;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const CircleSmall = styled(Flex)`
  padding: 3px;
  border-radius: 50%;
  border: none;
  outline: transparent;
  cursor: pointer;
`;

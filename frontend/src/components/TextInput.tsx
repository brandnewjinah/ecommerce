import React, { ChangeEvent, FC, FocusEvent, KeyboardEvent } from "react";
import styled from "styled-components";

//layout component
import { fontSize, neutral } from "./token";
import { Body } from "./Text";

export interface Props {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  type?:
    | "text"
    | "password"
    | "search"
    | "number"
    | "email"
    | "date"
    | undefined;
  maxLength?: number;
  prefix?: string;
  suffix?: string;
  error?: string;
  margin?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const TextInput: FC<Props> = ({
  id,
  name,
  label,
  value,
  placeholder,
  type,
  maxLength,
  prefix,
  suffix,
  error,
  margin,
  onChange,
  onKeyPress,
  ...rest
}) => {
  return (
    <Container margin={margin}>
      {label && <label htmlFor={name}>{label}</label>}
      <InputTag
        id={id ? id : name}
        name={name}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        {...rest}
      />
      {error && (
        <Body variant="caption" color="red">
          {error}
        </Body>
      )}
    </Container>
  );
};

const Container = styled.div<Props>`
  width: 100%;
  position: relative;
  margin: ${(props) => props.margin && props.margin};

  label {
    display: inline-block;
    font-size: ${fontSize.base};
    padding: 0 0 0.5rem;
  }

  button {
    background: transparent;
    display: flex;
    align-items: center;
    border: none;
  }

  .pw {
    position: absolute;
    bottom: calc(1.5rem - 10px);
    right: 0.75rem;
    cursor: pointer;
  }

  form {
    display: flex;
    align-items: center;
  }

  .search {
    position: absolute;
    top: 50%;
    left: 0.75rem;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
  }
`;

const InputTag = styled.input`
  width: 100%;
  font-size: ${fontSize.base};
  border: none;
  height: 3rem;
  padding: ${(props) =>
    props.type === "search" ? "0 0.875rem 0 2.5rem" : "0.75rem"};
  background-color: rgba(255, 255, 255, 0.8);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 125, 250, 0.6);
    outline: none;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: ${fontSize.sm2};
    color: ${neutral[300]};
  }
`;

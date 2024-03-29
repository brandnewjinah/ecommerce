import React, { ChangeEvent, FC, FocusEvent, KeyboardEvent } from "react";
import styled from "styled-components";

//layout component
import { fontSize, neutral } from "./token";
import { Body } from "./Text";

export interface Props {
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
  error?: string;
  margin?: string;
  removeBorder?: boolean;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
}

export const TextInput: FC<Props> = ({
  name,
  label,
  value,
  placeholder,
  type,
  error,
  margin,
  removeBorder,
  maxLength,
  onChange,
  onKeyPress,
  ...rest
}) => {
  return (
    <Container margin={margin}>
      {label && <label htmlFor={name}>{label}</label>}
      <InputTag
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        removeBorder={removeBorder}
        maxLength={maxLength}
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

export interface MaskProps {
  name: string;
  mask: string;
  value: string;
  error?: string;
  placeholder?: string;
  removeBorder?: boolean;
  onChange: (cleanValue: string, name: string) => void;
}

export const InputMask: FC<MaskProps> = ({
  value,
  mask,
  name,
  error,
  placeholder,
  onChange,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const cleanValue = value.replace(/[^\d]/g, "");
    onChange(cleanValue, name);
  };

  const formatValue = (value: string, mask: string) => {
    let i = 0;
    let lastReplacedIndex = -1;
    const filledMask = mask.replace(/#/g, (_, j) => {
      if (i >= value.length) {
        return "#";
      }
      lastReplacedIndex = j;
      return value[i++];
    });
    return filledMask.substring(0, lastReplacedIndex + 1);
  };

  return (
    <Container>
      <InputTag
        value={formatValue(value, mask)}
        name={name}
        placeholder={placeholder ? placeholder : mask}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
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
    font-size: ${fontSize.sm2};
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

const InputTag = styled.input<Props>`
  width: 100%;
  font-size: ${fontSize.base};
  border: ${(props) =>
    props.removeBorder ? "none" : `1px solid ${neutral[200]}`};
  height: 3rem;
  padding: ${(props) =>
    props.type === "search" ? "0 0.875rem 0 2.5rem" : "0.75rem"};
  background-color: ${(props) =>
    props.removeBorder ? neutral[50] : "rgba(255, 255, 255, 0.8)"};
  /* background-color: rgba(255, 255, 255, 0.8); */
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

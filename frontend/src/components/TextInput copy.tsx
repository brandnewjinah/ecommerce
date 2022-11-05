import React, { ChangeEvent, FC, useState, FocusEvent } from "react";
import styled from "styled-components";

//layout component
import { fontSize, neutral } from "./token";
import { Eye, EyeOff, SearchIcon } from "../assets/Icon";
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
    | "submit"
    | undefined;
  maxLength?: number;
  prefix?: string;
  suffix?: string;
  error?: string;
  margin?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  ...rest
}) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <Container margin={margin}>
      {label && <label htmlFor={name}>{label}</label>}
      {type === "search" ? (
        <form action=".">
          <InputTag
            name={name}
            type={type}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            {...rest}
          />
          <div className="search" aria-hidden="true">
            <SearchIcon
              width={18}
              height={18}
              color="#000"
              stroke={1}
              fill={undefined}
            />
          </div>
        </form>
      ) : type === "number" ? (
        <>
          <InputTag
            id={id ? id : name}
            name={name}
            type="text"
            inputMode="decimal"
            pattern="[0-9]*"
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            {...rest}
          />
          {error && (
            <Body variant="caption" color="red">
              {error}
            </Body>
          )}
        </>
      ) : prefix || suffix ? (
        <>
          <InputContainer prefix={prefix}>
            {prefix && (
              <div className="prefix" aria-hidden="true">
                {prefix}
              </div>
            )}
            <input
              name={name}
              type="text"
              inputMode="decimal"
              maxLength={maxLength}
              value={value}
              onChange={onChange}
              {...rest}
            />
            {suffix && (
              <div className="suffix" aria-hidden="true">
                {suffix}
              </div>
            )}
          </InputContainer>
          {error && (
            <Body variant="caption" color="red">
              {error}
            </Body>
          )}
        </>
      ) : (
        <>
          <InputTag
            id={id ? id : name}
            name={name}
            placeholder={placeholder}
            type={
              type === "password" && isPassword
                ? "password"
                : type === "password" && !isPassword
                ? "text"
                : type
            }
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            {...rest}
          />
          {error && (
            <Body variant="caption" color="red">
              {error}
            </Body>
          )}
          {type === "password" && (
            <button
              type="button"
              className="pw"
              onClick={() => setIsPassword(!isPassword)}
            >
              {isPassword ? (
                <Eye width={20} height={20} color="#000" stroke={1} />
              ) : (
                <EyeOff width={20} height={20} color="#000" stroke={1} />
              )}
            </button>
          )}
        </>
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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  border: 1px solid #d2d2d7;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus-within {
    box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.6);
    border-radius: 0.35rem;
  }

  input {
    width: 100%;
    border: none;
    font-size: ${fontSize.base};
    text-align: ${(props) => (props.prefix ? "left" : "right")};
    padding: ${(props) => (props.prefix ? "0 0.25rem 0 0" : "0 1rem")};

    &:focus {
      outline: none;
    }
  }

  .prefix,
  .suffix {
    font-size: ${fontSize.sm2};
    padding: 0.75rem;
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

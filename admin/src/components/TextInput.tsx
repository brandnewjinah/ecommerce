import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  useState,
} from "react";
import styled from "styled-components";

//component
import { fontSize, neutral } from "./token";
import { Body } from "./Text";
import { Eye, EyeOff, SearchIcon } from "../assets/Icon";

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
  className?: string;
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
  className,
  onChange,
  onKeyPress,
  ...rest
}) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <Container margin={margin} className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      {type === "search" ? (
        <>
          <InputTag
            name={name}
            placeholder={placeholder}
            type={type}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            {...rest}
          />
          <div className="search" aria-hidden="true">
            <SearchIcon width={16} height={16} color="#000" stroke={1} />
          </div>
        </>
      ) : (
        <>
          <InputTag
            name={name}
            placeholder={placeholder}
            type={
              type === "password" && isPassword
                ? "password"
                : type === "password" && !isPassword
                ? "text"
                : type
            }
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
    top: calc(1.5rem - 10px);
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
    left: 1rem;
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
  border-radius: ${(props) => props.type === "search" && "3rem"};
  height: 2.875rem;
  padding: ${(props) =>
    props.type === "search" ? "0 0.875rem 0 2.5rem" : "0.75rem"};
  background-color: ${(props) =>
    props.removeBorder ? neutral[50] : "rgba(255, 255, 255, 0.8)"};
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

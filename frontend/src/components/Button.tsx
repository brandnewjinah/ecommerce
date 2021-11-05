import React, { FC } from "react";
import styled from "styled-components";
import { neutral } from "./token";

export interface Props {
  center?: boolean;
  className?: string;
  color?: string;
  disabled?: boolean;
  fontColor?: string;
  icon?: React.ComponentType;
  label?: string;
  margin?: string;
  shape?: "text" | "outline" | undefined;
  size?: "big" | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: () => void;
}

export const Button: FC<Props> = ({
  className,
  color,
  disabled,
  fontColor,
  icon,
  label,
  margin,
  shape,
  size,
  type,
  handleClick,
}) => {
  return (
    <Container
      margin={margin && margin}
      className={className ? className : "flexCenter"}
    >
      <ButtonContainer
        color={color}
        fontColor={fontColor}
        shape={shape}
        size={size}
        type={type}
        onClick={handleClick}
      >
        <div className="flexCenter">
          {icon && icon}
          {label}
        </div>
      </ButtonContainer>
    </Container>
  );
};

export const TextButton: FC<Props> = ({
  center,
  className,
  color,
  disabled,
  margin,
  label,
  handleClick,
}) => {
  return (
    <Container
      center={center}
      margin={margin && margin}
      className={className ? className : "flexCenter"}
    >
      <TextButtonContainer
        aria-label={label}
        color={color}
        disabled={disabled}
        onClick={handleClick}
      >
        <p>{label}</p>
      </TextButtonContainer>
    </Container>
  );
};

const Container = styled.div<Props>`
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.center && "center"};
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

const ButtonContainer = styled.button<Props>`
  width: ${(props) => (props.shape === "text" ? null : "100%")};
  font-size: ${(props) => (props.size === "big" ? "1.125rem" : "1rem")};
  font-weight: 600;
  color: ${(props) => (props.fontColor ? props.fontColor : "#fff")};
  background-color: ${(props) =>
    props.shape === "text" || props.shape === "outline"
      ? "transparent"
      : props.color};
  border-style: solid;
  border-color: ${(props) => props.shape === "outline" && props.color};
  border-width: ${(props) => (props.shape === "outline" ? "1px" : 0)};
  border-radius: 0.25rem;
  padding: ${(props) => (props.size === "big" ? "1.25rem" : "1rem")};
  transition: opacity 0.3s ease-out;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }

  svg {
    margin-right: 0.5rem;
  }

  .flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TextButtonContainer = styled.button<Props>`
  font-weight: 600;
  background: transparent;
  color: ${(props) => props.color};
  border: 0;
  border-bottom: ${(props) =>
    props.color ? `2px solid ${props.color}` : `2px solid black`};
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    border-bottom-color: transparent;
  }

  &:active {
    opacity: 1;
  }

  &:disabled {
    color: ${neutral[200]};
    border-bottom-color: transparent;
    cursor: not-allowed;
  }
`;

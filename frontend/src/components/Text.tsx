import React, { FC } from "react";
import styled, { css } from "styled-components";

interface Props {
  type?: "heading" | "body" | undefined;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "body_large"
    | "body_small"
    | "body_xsmall"
    | "caption"
    | "custom"
    | undefined;
  size?: string;
  bold?: "bold" | "extrabold" | undefined;
  uppercase?: boolean;
  capitalize?: boolean;
  align?: string;
  padding?: string;
  spacing?: string;
  color?: string;
  className?: string;
  children?: string | number | undefined;
}

export const Heading: FC<Props> = ({
  padding,
  uppercase,
  spacing,
  color,
  children,
}) => {
  return (
    <H1 color={color} uppercase={uppercase} spacing={spacing} padding={padding}>
      {children}
    </H1>
  );
};

export const Body: FC<Props> = ({
  className,
  variant,
  size,
  bold,
  padding,
  uppercase,
  capitalize,
  align,
  spacing,
  color,
  children,
}) => {
  return (
    <P
      className={className}
      variant={variant}
      size={size}
      bold={bold}
      uppercase={uppercase}
      capitalize={capitalize}
      align={align}
      color={color}
      spacing={spacing}
      padding={padding}
    >
      {children}
    </P>
  );
};

const Basics = css<Props>`
  color: ${(props) => (props.color ? props.color : "#000")};
  text-transform: ${(props) => props.uppercase && "uppercase"};
  letter-spacing: ${(props) => props.spacing && props.spacing};
  padding: ${(props) => props.padding};
`;

const H1 = styled.h1<Props>`
  ${Basics}
  font-family: "Saira Condensed", sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
`;

const P = styled.p<Props>`
  ${Basics}
  font-size: ${(props) =>
    props.variant === "body_large"
      ? "1.125rem"
      : props.variant === "body_small"
      ? "0.875rem"
      : props.variant === "body_xsmall"
      ? "0.75rem"
      : props.variant === "caption"
      ? "0.625rem"
      : props.variant === "custom"
      ? props.size
      : "16px"};
  line-height: ${(props) =>
    props.variant === "body_large"
      ? "1.625rem"
      : props.variant === "body_small"
      ? "1.35rem"
      : props.variant === "body_xsmall"
      ? "1.25rem"
      : props.variant === "caption"
      ? "1.25rem"
      : "1.625rem"};
  font-weight: ${(props) =>
    props.bold === "bold" ? 600 : props.bold === "extrabold" ? 700 : 400};
  text-transform: ${(props) =>
    props.capitalize ? "capitalize" : props.uppercase ? "uppsercase" : null};
  text-align: ${(props) => props.align && props.align};
`;

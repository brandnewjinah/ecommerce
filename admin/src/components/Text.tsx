import React, { FC } from "react";
import styled, { css } from "styled-components";

interface Props {
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
  lineHeight?: string;
  bold?: "bold" | "extrabold" | undefined;
  uppercase?: boolean;
  capitalize?: boolean;
  align?: string;
  padding?: string;
  spacing?: string;
  color?: string;
  className?: string;
  title?: string;
  children?: any;
}

export const Heading: FC<Props> = ({ padding, color, title }) => {
  return (
    <HeadingWrapper color={color} padding={padding}>
      {title}
    </HeadingWrapper>
  );
};

export const HeaderText: FC<Props> = ({
  variant,
  padding,
  uppercase,
  spacing,
  align,
  color,
  children,
}) => {
  return (
    <>
      {variant === "h1" ? (
        <H1
          variant={variant}
          color={color}
          uppercase={uppercase}
          spacing={spacing}
          align={align}
          padding={padding}
        >
          {children}
        </H1>
      ) : variant === "h2" ? (
        <H2>{children}</H2>
      ) : variant === "h3" ? (
        <h3>{children}</h3>
      ) : null}
    </>
  );
};

export const Body: FC<Props> = ({
  className,
  variant,
  size,
  lineHeight,
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
      lineHeight={lineHeight}
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
  text-align: ${(props) => props.align && props.align};
  padding: ${(props) => props.padding};

  .step {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    width: 1.675rem;
    height: 1.675rem;
    margin-right: 0.5rem;
  }
`;

const HeadingWrapper = styled.h1<Props>`
  ${Basics}
  font-size: 1.125rem;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.03rem;
  position: relative;
  padding-bottom: 0.875rem;
  margin-bottom: 1.75rem;

  &:after {
    content: "";
    margin: auto;
    width: 30px;
    height: 1.75px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: 0.2;
    font-size: 1rem;
  }
`;

const H1 = styled.h1<Props>`
  ${Basics}
  /* font-family: "Saira Condensed", sans-serif; */
  font-size: 1.125rem;
  font-weight: 500;
`;

const H2 = styled.h2<Props>`
  ${Basics}
  font-size: 1.125rem;
  font-weight: 500;
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
    props.lineHeight
      ? props.lineHeight
      : props.variant === "body_large"
      ? "1.625rem"
      : props.variant === "body_small"
      ? "1.5rem"
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

import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";

//import styles and assets

interface Props {
  label?: string;
  type?: "fill" | "outline";
  logo?: "google" | "facebook";
  children?: React.ReactNode;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClick?: () => void;
}

export const Card: FC<Props> = ({
  children,
  label,
  type,
  logo,
  handleClick,
}) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.article`
  width: 100%;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0.65rem 1.5rem rgb(18 38 63 / 3%);
  padding: 2rem;
`;

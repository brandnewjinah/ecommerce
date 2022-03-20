import React, { FC } from "react";
import styled from "styled-components";
import { fontSize } from "./token";

export interface Props {
  title: string;
}

const Header: FC<Props> = ({ title }) => {
  return (
    <HeaderWrapper>
      <h2>{title}</h2>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  h2 {
    font-size: ${fontSize.lg3};
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.03rem;
    position: relative;
    padding-bottom: 1.25rem;
    margin-bottom: 1.75rem;

    &:after {
      content: "";
      margin: auto;
      width: 30px;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      opacity: 0.2;
      font-size: 1.5rem;
    }
  }
`;

export default Header;

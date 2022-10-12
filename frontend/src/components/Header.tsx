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
    font-size: ${fontSize.lg1};
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.03rem;
    position: relative;
    padding-bottom: 1rem;
    margin-bottom: 1.75rem;

    &:after {
      content: "";
      margin: auto;
      width: 30px;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      opacity: 0.2;
      font-size: 1rem;
    }
  }
`;

export default Header;

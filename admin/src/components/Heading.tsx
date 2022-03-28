import React, { FC } from "react";
import styled from "styled-components";

export interface Props {
  title: string;
}

const Heading: FC<Props> = ({ title }) => {
  return (
    <HeaderWrapper>
      <h3>{title}</h3>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  text-transform: uppercase;
`;

export default Heading;

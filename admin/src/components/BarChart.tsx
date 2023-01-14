import React, { FC } from "react";
import styled from "styled-components";

//comp
import { Flex } from "./containers/Div";
import { Body } from "./Text";
import { fontSize, neutral } from "./token";

interface Props {
  width?: string;
  color?: string;
}

const BarChart: FC<Props> = () => {
  return (
    <Section>
      <Div>
        Category<span></span>
        <Span width="90%" color="#4287f5"></Span>
      </Div>
      <Div>
        Category<span></span>
        <Span width="80%" color="#4e9c7a"></Span>
      </Div>
      <Div>
        Category<span></span>
        <Span width="70%" color="#bfc769"></Span>
      </Div>
    </Section>
  );
};

const Section = styled.section``;

const Div = styled.div`
  font-size: ${fontSize.sm2};
  font-weight: 500;
  color: #fff;
  padding: 0.5rem;
  position: relative;
  z-index: 2;
  overflow: hidden;
  margin: 0.5rem 0;

  span {
    &:nth-child(1) {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      background-color: ${neutral[200]};
      z-index: -2;
      height: 100%;
      width: 100%;
    }
  }
`;

const Span = styled.span<Props>`
  position: absolute;
  height: 100%;
  width: ${(props) => props.width && props.width};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.color && props.color};
  z-index: -1;
`;

export default BarChart;

import React, { FC } from "react";
import styled from "styled-components";

export interface Props {
  padding?: string;
}

export const Section: FC<Props> = ({ padding, children }) => {
  return <SectionWrapper padding={padding}>{children}</SectionWrapper>;
};

const SectionWrapper = styled.section<Props>`
  padding: ${(props) => (props.padding ? props.padding : 0)};
`;

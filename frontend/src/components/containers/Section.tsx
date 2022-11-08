import React, { FC } from "react";
import styled from "styled-components";

export interface Props {
  padding?: string;
  margin?: string;
  justifyContent?: string;
  gap?: string;
  className?: string;
}

export const Section: FC<Props> = ({
  padding,
  margin,
  gap,
  className,
  children,
}) => {
  return (
    <SectionWrapper
      gap={gap}
      padding={padding}
      margin={margin}
      className={className}
    >
      {children}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section<Props>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap && props.gap};
  padding: ${(props) => (props.padding ? props.padding : 0)};
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

export const Flex: FC<Props> = ({ gap, justifyContent, padding, children }) => {
  return (
    <FlexWrapper padding={padding} justifyContent={justifyContent} gap={gap}>
      {children}
    </FlexWrapper>
  );
};

const FlexWrapper = styled.section<Props>`
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent === "sb" && "space-between"};
  align-items: center;
  gap: ${(props) => (props.gap ? props.gap : ".5rem")};
  padding: ${(props) => (props.padding ? props.padding : 0)};
`;

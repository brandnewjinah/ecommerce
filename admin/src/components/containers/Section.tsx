import React, { FC } from "react";
import styled from "styled-components";

export interface Props {
  bgColor?: string;
  gap?: string;
  padding?: string;
  margin?: string;
  className?: string;
}

export const Section: FC<Props> = ({
  bgColor,
  padding,
  margin,
  gap,
  className,
  children,
}) => {
  return (
    <SectionWrapper
      bgColor={bgColor}
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
  background-color: ${(props) => props.bgColor && props.bgColor};
  border-radius: 0.5rem;
  gap: ${(props) => props.gap && props.gap};
  padding: ${(props) => (props.padding ? props.padding : 0)};
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

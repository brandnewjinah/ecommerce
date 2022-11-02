import React, { FC } from "react";
import styled from "styled-components";
import { breakpoint } from "../token";

export interface Props {
  justifyContent?: string;
  gap?: string;
  width?: string;
  maxWidth?: string;
  bgColor?: string;
  padding?: string;
  margin?: string;
}

export const Div: FC<Props> = ({ maxWidth, padding, margin, children }) => {
  return (
    <Wrapper maxWidth={maxWidth} padding={padding} margin={margin}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  max-width: ${(props) => props.maxWidth && props.maxWidth};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};
`;

export const Flex: FC<Props> = ({
  justifyContent,
  gap,
  width,
  bgColor,
  padding,
  margin,
  children,
}) => {
  return (
    <FlexWrapper
      justifyContent={justifyContent}
      gap={gap}
      width={width}
      bgColor={bgColor}
      padding={padding}
      margin={margin}
    >
      {children}
    </FlexWrapper>
  );
};

const FlexWrapper = styled.div<Props>`
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-between"};
  align-items: center;
  gap: ${(props) => props.gap && props.gap};
  width: ${(props) => props.width && props.width};
  background-color: ${(props) => props.bgColor && props.bgColor};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};
`;

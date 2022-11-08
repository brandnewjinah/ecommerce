import React, { FC } from "react";
import styled from "styled-components";
import { breakpoint } from "../token";

export interface Props {
  flexCol?: boolean;
  lgFlexCol?: boolean;
  justifyContent?: string;
  gap?: string;
  width?: string;
  maxWidth?: string;
  bgColor?: string;
  padding?: string;
  lgPadding?: string;
  margin?: string;
}

export const Div: FC<Props> = ({
  maxWidth,
  width,
  padding,
  lgPadding,
  margin,
  children,
}) => {
  return (
    <Wrapper
      maxWidth={maxWidth}
      width={width}
      padding={padding}
      lgPadding={lgPadding}
      margin={margin}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  width: ${(props) => props.width && props.width};
  max-width: ${(props) => props.maxWidth && props.maxWidth};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};

  @media ${breakpoint.lg} {
    padding: ${(props) => props.lgPadding && props.lgPadding};
  }
`;

export const Flex: FC<Props> = ({
  flexCol,
  lgFlexCol,
  justifyContent,
  gap,
  width,
  maxWidth,
  bgColor,
  padding,
  lgPadding,
  margin,
  children,
}) => {
  return (
    <FlexWrapper
      flexCol={flexCol}
      lgFlexCol={lgFlexCol}
      justifyContent={justifyContent}
      gap={gap}
      width={width}
      maxWidth={maxWidth}
      bgColor={bgColor}
      padding={padding}
      lgPadding={lgPadding}
      margin={margin}
    >
      {children}
    </FlexWrapper>
  );
};

const FlexWrapper = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => props.flexCol && "column"};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-between"};
  align-items: center;
  gap: ${(props) => props.gap && props.gap};
  width: ${(props) => props.width && props.width};
  max-width: ${(props) => props.maxWidth && props.maxWidth};
  background-color: ${(props) => props.bgColor && props.bgColor};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};

  @media ${breakpoint.lg} {
    flex-direction: ${(props) => props.lgFlexCol && "column"};
    padding: ${(props) => props.lgPadding && props.lgPadding};
  }
`;

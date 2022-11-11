import React, { FC } from "react";
import styled from "styled-components";
import { breakpoint } from "../token";

export interface Props {
  flexCol?: boolean;
  lgFlexCol?: boolean;
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
  width?: string;
  maxWidth?: string;
  lgMaxWidth?: string;
  bgColor?: string;
  padding?: string;
  lgPadding?: string;
  margin?: string;
  className?: any;
}

export const Div: FC<Props> = ({
  width,
  maxWidth,
  bgColor,
  padding,
  lgPadding,
  margin,
  className,
  children,
}) => {
  return (
    <Wrapper
      width={width}
      maxWidth={maxWidth}
      bgColor={bgColor}
      padding={padding}
      lgPadding={lgPadding}
      margin={margin}
      className={className}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  width: ${(props) => props.width && props.width};
  max-width: ${(props) => props.maxWidth && props.maxWidth};
  background-color: ${(props) => props.bgColor && props.bgColor};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};

  @media ${breakpoint.lg} {
    padding: ${(props) => props.lgPadding && props.lgPadding};
  }
`;

export const Flex: FC<Props> = ({
  flexCol,
  lgFlexCol,
  alignItems,
  justifyContent,
  gap,
  width,
  maxWidth,
  lgMaxWidth,
  bgColor,
  padding,
  lgPadding,
  margin,
  children,
  className,
}) => {
  return (
    <FlexWrapper
      flexCol={flexCol}
      lgFlexCol={lgFlexCol}
      alignItems={alignItems}
      justifyContent={justifyContent}
      gap={gap}
      width={width}
      maxWidth={maxWidth}
      lgMaxWidth={lgMaxWidth}
      bgColor={bgColor}
      padding={padding}
      lgPadding={lgPadding}
      margin={margin}
      className={className}
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
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  gap: ${(props) => props.gap && props.gap};
  width: ${(props) => props.width && props.width};
  max-width: ${(props) => props.maxWidth && props.maxWidth};
  background-color: ${(props) => props.bgColor && props.bgColor};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};

  @media ${breakpoint.lg} {
    flex-direction: ${(props) => props.lgFlexCol && "column"};
    max-width: ${(props) => props.lgMaxWidth && props.lgMaxWidth};
    padding: ${(props) => props.lgPadding && props.lgPadding};
  }
`;

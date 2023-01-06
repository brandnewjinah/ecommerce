import React, { FC } from "react";
import styled from "styled-components";

export interface Props {
  width?: string;
  height?: string;
  bgColor?: string;
  justifyContent?: string;
  alignItems?: string;
  flexCol?: boolean;
  gap?: string;
  margin?: string;
  padding?: string;
  className?: any;
  handleClick?: () => void;
}

export const Div: FC<Props> = ({
  bgColor,
  width,
  margin,
  padding,
  className,
  children,
  handleClick,
}) => {
  return (
    <Wrapper
      bgColor={bgColor}
      width={width}
      padding={padding}
      margin={margin}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  background-color: ${(props) => props.bgColor && props.bgColor};
  width: ${(props) => props.width && props.width};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};
`;

export const Flex: FC<Props> = ({
  justifyContent,
  alignItems,
  flexCol,
  gap,
  height,
  padding,
  margin,
  children,
  className,
}) => {
  return (
    <FlexWrapper
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexCol={flexCol}
      gap={gap}
      height={height}
      padding={padding}
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
  justify-content: ${(props) => props.justifyContent && props.justifyContent};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  gap: ${(props) => props.gap && props.gap};
  height: ${(props) => props.height && props.height};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};
`;

import React, { FC } from "react";
import styled from "styled-components";
import { breakpoint } from "../token";

export interface Props {
  width?: string;
  maxWidth?: string;
  padding?: string;
  margin?: string;
  justifyContent?: string;
  gap?: string;
  textCenter?: boolean;
  xlgPadding?: string;
}

export const Div: FC<Props> = ({
  maxWidth,
  padding,
  margin,
  textCenter,
  children,
}) => {
  return (
    <Wrapper
      maxWidth={maxWidth}
      padding={padding}
      margin={margin}
      textCenter={textCenter}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  max-width: ${(props) => props.maxWidth && props.maxWidth};
  text-align: ${(props) => props.textCenter && "center"};
  padding: ${(props) => (props.padding ? props.padding : 0)};
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

export const Flex: FC<Props> = ({
  width,
  maxWidth,
  justifyContent,
  gap,
  padding,
  margin,
  xlgPadding,
  children,
}) => {
  return (
    <FlexWrapper
      width={width}
      maxWidth={maxWidth}
      justifyContent={justifyContent}
      gap={gap}
      padding={padding}
      margin={margin}
      xlgPadding={xlgPadding}
    >
      {children}
    </FlexWrapper>
  );
};

const FlexWrapper = styled.div<Props>`
  width: ${(props) => props.width && props.width};
  max-width: ${(props) => props.maxWidth && props.maxWidth};
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent === "sb" ? "space-between" : props.justifyContent};
  align-items: center;
  gap: ${(props) => (props.gap ? props.gap : ".5rem")};
  padding: ${(props) => (props.padding ? props.padding : 0)};
  margin: ${(props) => (props.margin ? props.margin : 0)};

  .four {
    flex: 4;
  }

  .nine {
    flex: 9;
  }

  @media ${breakpoint.xlg} {
    padding: ${(props) => props.xlgPadding && props.xlgPadding};
  }
`;

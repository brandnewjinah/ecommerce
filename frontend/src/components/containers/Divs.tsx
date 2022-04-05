import React, { FC } from "react";
import styled from "styled-components";

export interface Props {
  padding?: string;
  margin?: string;
  justifyContent?: string;
  gap?: string;
  textCenter?: boolean;
}

export const Div: FC<Props> = ({ padding, margin, textCenter, children }) => {
  return (
    <Wrapper padding={padding} margin={margin} textCenter={textCenter}>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  text-align: ${(props) => props.textCenter && "center"};
  padding: ${(props) => (props.padding ? props.padding : 0)};
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

export const FlexDiv: FC<Props> = ({
  justifyContent,
  gap,
  padding,
  margin,
  children,
}) => {
  return (
    <FlexWrapper
      justifyContent={justifyContent}
      gap={gap}
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
    props.justifyContent === "sb" && "space-between"};
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
`;

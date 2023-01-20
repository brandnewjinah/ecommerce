import React, { FC } from "react";
import styled from "styled-components";
import { Flex } from "./containers/Div";

//comp
import { Body } from "./Text";
import { fontSize } from "./token";

interface Props {
  overline?: string;
  title?: string;
  body?: string;
  caption?: string;
  textAlign?: string;
  small?: boolean;
  icon?: React.ReactNode;
  margin?: string;
}

export const Header: FC<Props> = ({
  title,
  body,
  textAlign,
  caption,
  small,
  icon,
  margin,
}) => {
  return (
    <HeaderWrapper margin={margin} textAlign={textAlign} small={small}>
      {icon ? (
        <Flex>
          <IconContainer>{icon}</IconContainer>
          <h1>{title}</h1>
        </Flex>
      ) : (
        <h1>{title}</h1>
      )}

      {body && <Body variant="body_small">{body}</Body>}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header<Props>`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-align: ${(props) => props.textAlign && props.textAlign};
  margin: ${(props) => props.margin && props.margin};

  h1 {
    /* font-size: ${fontSize.lg2}; */
    font-size: ${(props) => (props.small ? "1.125rem" : "1.5rem")};
    font-weight: 500;
    text-transform: capitalize;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #000;
  border-radius: 50%;
  padding: 0.35rem;
  margin-right: 0.75rem;
`;

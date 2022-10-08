import React, { FC } from "react";
import styled from "styled-components";
import { breakpoint } from "../token";

export interface Props {
  width?: string;
}

export const Flex: FC<Props> = ({ width, children }) => {
  return <FlexWrapper width={width}>{children}</FlexWrapper>;
};

const FlexWrapper = styled.div<Props>`
  width: ${(props) => props.width && props.width};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: 0 auto;

  @media ${breakpoint.xlg} {
    padding: 0 1rem;
  }
`;

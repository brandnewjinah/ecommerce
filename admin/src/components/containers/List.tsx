import React, { FC } from "react";
import styled from "styled-components";

//comp
import { breakpoint } from "../token";

export interface Props {
  gap?: string;
}

export const Ul: FC<Props> = ({ gap, children }) => {
  return <UlWrapper gap={gap}>{children}</UlWrapper>;
};

const UlWrapper = styled.ul<Props>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.gap ? props.gap : "1rem")};

  @media ${breakpoint.lg} {
    flex-direction: column;
  }
`;

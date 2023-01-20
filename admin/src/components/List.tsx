import React, { FC } from "react";
import styled from "styled-components";
import { neutral } from "./token";

interface Props {
  underline?: boolean;
  children?: any;
}

const List: FC<Props> = ({ children, underline }) => {
  return <Li>{children}</Li>;
};

const Li = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid ${neutral[100]};
`;

export default List;

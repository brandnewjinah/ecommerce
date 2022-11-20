import React, { FC } from "react";
import styled from "styled-components";
import { neutral } from "./token";

interface Props {
  flex?: boolean;
  gap?: string;
  alignItems?: string;
  borderBottom?: boolean;
  padding?: string;
  children?: any;
}

export const ListItem: FC<Props> = ({
  flex,
  gap,
  alignItems,
  borderBottom,
  padding,
  children,
}) => {
  return (
    <List
      flex={flex}
      gap={gap}
      alignItems={alignItems}
      borderBottom={borderBottom}
      padding={padding}
    >
      {children && children}
    </List>
  );
};

const List = styled.li<Props>`
  display: ${(props) => props.flex && "flex"};
  gap: ${(props) => props.gap && props.gap};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
  border-bottom: ${(props) =>
    props.borderBottom && `1px solid ${neutral[200]}`};
  padding: ${(props) => props.padding && props.padding};
`;

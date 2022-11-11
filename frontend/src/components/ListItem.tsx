import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  flex?: boolean;
  gap?: string;
  alignItems?: string;
  children?: any;
}

export const ListItem: FC<Props> = ({ flex, gap, alignItems, children }) => {
  return (
    <List flex={flex} gap={gap} alignItems={alignItems}>
      {children && children}
    </List>
  );
};

const List = styled.li<Props>`
  display: ${(props) => props.flex && "flex"};
  gap: ${(props) => props.gap && props.gap};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "center")};
`;

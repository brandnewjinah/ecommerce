import React, { FC } from "react";
import styled from "styled-components";
import { Body } from "../../components/Text";

//token
import { neutral } from "../../components/token";

interface Props {
  overline?: string;
  helper?: string;
  title?: string;
  subtitle?: string;
  body?: string;
}

export const ProductInfo: FC<Props> = ({
  helper,
  subtitle,
  body,
  children,
}) => {
  return (
    <Item>
      {helper && (
        <Body variant="body_xsmall" color={neutral[400]} className="flexOne">
          {helper}
        </Body>
      )}
      {subtitle && <Body className="flexThree">{subtitle}</Body>}
      {body && (
        <Body variant="body_small" lineHeight="1.5rem" className="flexThree">
          {body}
        </Body>
      )}
      {children && <div className="flexThree">{children}</div>}
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  align-items: top;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${neutral[100]};
`;

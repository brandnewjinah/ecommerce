import React, { FC } from "react";
import styled from "styled-components";
import { Body, Heading } from "../../components/Text";

//token
import { neutral, fontSize } from "../../components/token";

interface Props {
  overline?: string;
  helper?: string;
  title?: string;
  subtitle?: string;
  body?: string;
}

export const InfoItem: FC<Props> = ({ overline, title, children }) => {
  return (
    <Article>
      {overline && (
        <Body variant="body_small" color={neutral[400]}>
          {overline}
        </Body>
      )}
      {title && <Heading>{title}</Heading>}
      {children && children}
    </Article>
  );
};

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

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid ${neutral[100]};

  .sub {
    font-size: ${fontSize.lg1};
  }

  .body {
    font-size: ${fontSize.sm2};
    line-height: 1.5rem;
  }

  .counter {
    margin: 0.875rem 0;
  }
`;

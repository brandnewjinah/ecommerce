import React from "react";
import styled from "styled-components";
import {
  fontSize,
  lineHeight,
  breakpoint,
  fontSizeMobile,
  lineHeightMobile,
} from "./token";

const Text = ({ variant, bold, padding, color, children }) => {
  return (
    <>
      {variant === "h1" ? (
        <Heading1 padding={padding}>{children}</Heading1>
      ) : variant === "h2" ? (
        <Heading2 padding={padding}>{children}</Heading2>
      ) : variant === "h3" ? (
        <Heading3 padding={padding}>{children}</Heading3>
      ) : variant === "h4" ? (
        <Heading4 padding={padding}>{children}</Heading4>
      ) : variant === "h5" ? (
        <Heading5 padding={padding}>{children}</Heading5>
      ) : variant === "body_big" ? (
        <BigParagraph padding={padding}>{children}</BigParagraph>
      ) : variant === "body_small" ? (
        <SmallParagraph padding={padding}>{children}</SmallParagraph>
      ) : variant === "caption" ? (
        <Caption bold={bold} color={color} padding={padding}>
          {children}
        </Caption>
      ) : (
        <Paragraph bold={bold} color={color} padding={padding}>
          {children}
        </Paragraph>
      )}
    </>
  );
};

const Heading1 = styled.h1`
  font-size: ${fontSize.lg5};
  font-weight: 400;
  line-height: ${lineHeight.lg5};
  padding: ${(props) => props.padding};

  @media ${breakpoint.m} {
    font-size: ${fontSizeMobile.lg5};
    line-height: ${lineHeightMobile.lg5};
  }
`;

const Heading2 = styled.h2`
  font-size: ${fontSize.lg4};
  font-weight: 700;
  line-height: ${lineHeight.lg4};
  padding: ${(props) => props.padding};

  @media ${breakpoint.m} {
    font-size: ${fontSizeMobile.lg4};
    line-height: ${lineHeightMobile.lg4};
  }
`;

const Heading3 = styled.h3`
  font-size: ${fontSize.lg3};
  font-weight: 600;
  line-height: ${lineHeight.lg3};
  padding: ${(props) => props.padding};
`;

const Heading4 = styled.h4`
  font-size: ${fontSize.lg2};
  font-weight: 600;
  line-height: ${lineHeight.lg2};
  padding: ${(props) => props.padding};
`;

const Heading5 = styled.h5`
  font-size: ${fontSize.lg1};
  font-weight: 500;
  padding: ${(props) => props.padding};
`;

const BigParagraph = styled.p`
  font-size: ${fontSize.lg1};
  line-height: ${lineHeight.lg2};
  padding: ${(props) => props.padding};
`;

const Paragraph = styled.p`
  font-size: ${fontSize.base};
  line-height: ${lineHeight.base};
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  color: ${(props) => (props.color ? props.color : "#000")};
  padding: ${(props) => props.padding};
`;

const SmallParagraph = styled.p`
  font-size: ${fontSize.sm1};
  line-height: ${lineHeight.sm1};
  padding: ${(props) => props.padding};
`;

const Caption = styled.p`
  font-size: ${fontSize.sm2};
  line-height: ${lineHeight.sm2};
  font-weight: ${(props) => (props.bold ? 600 : 400)};
  color: ${(props) => props.color};
  padding: ${(props) => props.padding};
`;

export default Text;

import React, { FC } from "react";
import styled from "styled-components";

//token
import { breakpoint } from "../token";

export interface Props {
  padding?: string;
  open?: boolean;
  className?: string;
  color?: string;
}

type StyleProps = {
  padding?: string | undefined;
  color?: string | undefined;
  open?: boolean;
};

export const Main: FC<Props> = ({ children, padding }) => {
  return <MainBox padding={padding}>{children}</MainBox>;
};

export const Container: FC<Props> = ({
  className,
  children,
  padding,
  color,
}) => {
  return (
    <ContainerBox padding={padding} color={color} className={className}>
      {children}
    </ContainerBox>
  );
};

export const Section: FC<Props> = ({ className, children, padding }) => {
  return (
    <SectionBox padding={padding} className={className}>
      {children}
    </SectionBox>
  );
};

export const Article: FC<Props> = ({ className, children, padding }) => {
  return (
    <ArticleBox padding={padding} className={className}>
      {children}
    </ArticleBox>
  );
};

export const Div: FC<Props> = ({ children, className, color, padding }) => {
  return (
    <DivBox padding={padding} color={color} className={className}>
      {children}
    </DivBox>
  );
};

const MainBox = styled.main<StyleProps>`
  width: 100%;
  height: 100%;

  @media ${breakpoint.lg} {
    padding-left: 260px;
  }
`;

const ContainerBox = styled.div<StyleProps>`
  width: 100%;
  background-color: ${(props) => (props.color ? props.color : "none")};
  padding: ${(props) => props.padding};
`;

const SectionBox = styled.section<StyleProps>`
  width: 100%;
  padding: ${(props) => props.padding};
`;

const ArticleBox = styled.article<StyleProps>`
  width: 100%;
  padding: ${(props) => props.padding};
`;

const DivBox = styled.div<StyleProps>`
  background-color: ${(props) => (props.color ? props.color : "none")};
  padding: ${(props) => props.padding};
`;

import React from "react";
import styled from "styled-components";

//token
import { neutral, typeScale } from "../../components/token";

const InfoArticle = ({ helper, title, body, children }) => {
  return (
    <Article>
      {helper && <p className="helper">{helper}</p>}
      {title && <p className="title">{title}</p>}
      {body && <p className="body">{body}</p>}
      {children && children}
    </Article>
  );
};

const Article = styled.article`
  padding: 0.75rem 0;
  border-bottom: 1px solid ${neutral[100]};

  .helper {
    font-size: ${typeScale.helper};
    color: ${neutral[400]};
  }

  .title {
    font-size: ${typeScale.header3};
  }

  .body {
    font-size: ${typeScale.sbody};
    line-height: 1.5rem;
  }

  .counter {
    margin: 0.875rem 0;
  }
`;

export default InfoArticle;

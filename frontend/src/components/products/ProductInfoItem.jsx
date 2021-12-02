import React from "react";
import styled from "styled-components";

//token
import { neutral, fontScale, fontHeight } from "../token";

const InfoArticle = ({ helper, title, subtitle, body, children }) => {
  return (
    <Article>
      {helper && <p className="helper">{helper}</p>}
      {title && <h1>{title}</h1>}
      {subtitle && <p className="sub">{subtitle}</p>}
      {body && <p className="body">{body}</p>}
      {children && children}
    </Article>
  );
};

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid ${neutral[100]};

  h1 {
    font-size: ${fontScale.scale_b5};
    font-weight: 600;
  }

  .sub {
    font-size: ${fontScale.scale_b3};
  }

  .helper {
    font-size: ${fontScale.scale_s2};
    color: ${neutral[400]};
  }

  .body {
    font-size: ${fontScale.scale_s2};
    line-height: ${fontHeight.body};
  }

  .counter {
    margin: 0.875rem 0;
  }
`;

export default InfoArticle;

import React from "react";
import styled from "styled-components";

const TestItem = ({ data }) => {
  return (
    <Article>
      <Article2>
        <ImageWrapper>
          <img src={data && data.img} alt="" />
        </ImageWrapper>
        <Content>
          <h3>{data.title}</h3>
        </Content>
      </Article2>
    </Article>
  );
};

const Article = styled.article`
  flex-basis: 330px;
  flex-grow: 1.5;
  flex-shrink: 1.5;
`;

const Article2 = styled.article`
  padding-top: 66.667%;
  height: 0;
  position: relative;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  img {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  padding: 0.5rem 0;
`;

export default TestItem;

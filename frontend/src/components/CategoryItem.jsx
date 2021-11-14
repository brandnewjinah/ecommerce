import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <ArticleCard>
      <ArticleImage>
        <Image src={item.img} alt="" />
      </ArticleImage>
      <ArticleContent>
        <CardCategory to="#">Caption</CardCategory>
      </ArticleContent>
    </ArticleCard>
  );
};

const ArticleCard = styled.article``;

const ArticleImage = styled.figure`
  padding-top: 75.00485531171101%;
  position: relative;
  display: block;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const ArticleContent = styled.div``;

const CardCategory = styled(Link)``;

export default CategoryItem;

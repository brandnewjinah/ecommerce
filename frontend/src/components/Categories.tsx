import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { Flex } from "./containers/Div";
import ImageContainer from "./ImageContainer";
import { Heading } from "./Text";
import { ratio } from "./token";

const category = [
  {
    id: 1,
    title: "All",
    imgSrc:
      "https://res.cloudinary.com/fw7128/image/upload/v1670405670/ecommerce/all_jrpohe.jpg",
    linkUrl: "/category/all",
  },
  {
    id: 2,
    title: "Snacks",
    imgSrc:
      "https://res.cloudinary.com/fw7128/image/upload/v1670405670/ecommerce/snacks_eipcgc.jpg",
    linkUrl: "/category/snacks",
  },
  {
    id: 3,
    title: "Beverages",
    imgSrc:
      "https://res.cloudinary.com/fw7128/image/upload/v1670405670/ecommerce/bev_d58lyt.jpg",
    linkUrl: "/category/beverage",
  },
  {
    id: 4,
    title: "Pantry",
    imgSrc:
      "https://res.cloudinary.com/fw7128/image/upload/v1670405670/ecommerce/pantry_ffr8hw.jpg",
    linkUrl: "/category/pantry",
  },
];

const Categories = () => {
  return (
    <Flex flexCol>
      <Heading title="Shop By Category" />
      <Flex width="100%">
        {category &&
          category.map((item, idx) => (
            <Container key={idx}>
              <Link to={item.linkUrl}>
                <ImageContainer
                  imgUrl={item.imgSrc}
                  ratio={ratio.portrait_34}
                />
                <LabelContainer>
                  <Label>{item.title}</Label>
                </LabelContainer>
              </Link>
            </Container>
          ))}
      </Flex>
    </Flex>
  );
};

const Container = styled.div`
  position: relative;
  flex: 1;

  a {
    display: block;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05rem;
  background-color: #fff;
  width: 50%;
  padding: 0.75rem 1rem;
  margin: auto auto 2rem;
  border-radius: 8px;
  max-width: 180px;
`;

export default Categories;

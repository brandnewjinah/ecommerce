import React, { FC } from "react";
import styled from "styled-components";

//comp
import { Flex } from "../containers/Div";
import { Heading } from "../Text";
import Card from "./ProductCard";

//interface
import { Products } from "../../interfaces/productInterface";

interface Props {
  title?: string;
  data?: Products;
  slidesPerView?: {
    small?: number;
    medium?: number;
    large?: number;
  };
}

const SimilarItems: FC<Props> = ({ data, title, slidesPerView }) => {
  return (
    <Container>
      <Heading title={title} />
      <Flex gap="1rem" maxWidth="70%" lgMaxWidth="100%" margin="0 auto">
        {data &&
          data.map((product) => (
            <Card
              key={product.sku}
              sku={product.sku}
              brand={product.brand}
              name={product.name}
              price={product.price}
              imageUrl={product.img}
              _id={product._id}
            />
          ))}
      </Flex>
    </Container>
  );
};

const Container = styled.section`
  padding: 2rem 0;
  margin: 2rem 0;
`;

export default SimilarItems;

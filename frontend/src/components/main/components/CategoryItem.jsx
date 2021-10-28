import React from "react";
import styled from "styled-components";

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <div className="title">{item.title}</div>
        <button>Shop Now</button>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  position: relative;
  max-height: 300px;
  overflow: hidden;
  margin: 0.25rem;
  /* height: 50vh; */
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const Info = styled.div`
  .title {
  }

  button {
  }
`;

export default CategoryItem;

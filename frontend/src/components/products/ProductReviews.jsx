import React from "react";
import styled from "styled-components";

//import components
import { Button } from "../Button";
import Header from "../Header2";
import { primaryColor } from "../token";

const ProductReview = ({ title }) => {
  const reviews = [(1, 2, 3, 4, 5)];

  const handleSubmit = () => {
    // dispatchEvent(reviewProduct(thisReview, product.sku));
  };

  return (
    <Container>
      <Header title={title} />
      <FilterContainer>
        <p>12 reviews</p>
        <p>sort by</p>
      </FilterContainer>
      <ReviewContainer>
        {reviews.map((review, idx) => (
          <p key={idx}>Review {review}</p>
        ))}
      </ReviewContainer>
      <SubmitContainer>
        <Button
          label="Submit Review"
          color={primaryColor.button}
          handleClick={handleSubmit}
        />
      </SubmitContainer>
      <p>If not logged in, Please log in to write a review</p>
    </Container>
  );
};

const Container = styled.section`
  padding: 2rem 0;
  margin: 2rem 0;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewContainer = styled.div``;

const SubmitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export default ProductReview;

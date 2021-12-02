import React from "react";
import styled from "styled-components";

//import components
import { Button } from "../Button";
import { fontScale, primaryColor } from "../token";

const ProductSlider = ({ title }) => {
  const reviews = [(1, 2, 3, 4, 5)];

  const handleSubmit = () => {
    // dispatchEvent(reviewProduct(thisReview, product.sku));
  };

  return (
    <Container>
      <h2>{title}</h2>
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

  h2 {
    font-size: ${fontScale.scale_b3};
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.03rem;
    position: relative;
    padding-bottom: 1.25rem;
    margin-bottom: 1.75rem;

    &:after {
      content: "";
      margin: auto;
      width: 30px;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #000;
      opacity: 0.2;
      font-size: 1.5rem;
    }
  }
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

export default ProductSlider;

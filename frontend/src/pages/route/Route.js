import React from "react";
import { Link } from "react-router-dom";

//import libraries
import Helmet from "react-helmet";

//import components
import { Button } from "../../components/Button";

//import styles and assets
import styled from "styled-components";

const Route = (props) => {
  return (
    <Wrapper>
      <Helmet>
        <title>My Shop</title>
      </Helmet>
      <Container>
        <h1>Which interface do you want to view?</h1>
        <BtnContainer>
          <div className="btn">
            <Link to="/home">
              <Button label="Customer" type="fill" color="#F09273" />
            </Link>
          </div>
          <div className="btn">
            <Link to="/cms">
              <Button label="Admin" type="fill" color="#F09273" />
            </Link>
          </div>
        </BtnContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #fcefe6;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    line-height: 3rem;
    text-align: center;
    color: #1b3456;
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;

  .btn {
    width: 150px;
    margin: 0 0.5em;
  }
`;

export default Route;

import React from "react";
import { useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import styled from "styled-components";

//import components
import { FlexDiv } from "../components/containers/Divs";
import { Button } from "../components/Button";

//token
import { primaryColor, breakpoint } from "../components/token";

const Root = () => {
  const history = useHistory();

  const handleRedirect = (path) => {
    history.push(`/${path}`);
  };

  return (
    <Container>
      <Helmet>
        <title>My Shop</title>
      </Helmet>
      <Wrapper>
        <h1>Which interface do you want to view?</h1>
        <ButtonContainer>
          <Button
            label="Customer"
            color={primaryColor.button}
            size="big"
            margin=".5rem"
            handleClick={() => handleRedirect("home")}
          />
          <Button
            label="Admin"
            color={primaryColor.button}
            size="big"
            margin=".5rem"
            handleClick={() => handleRedirect("admin")}
          />
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${primaryColor.background};
  padding: 2rem;
`;

const Wrapper = styled.main`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    text-align: center;
    color: ${primaryColor.blue};
  }

  @media ${breakpoint.lg} {
    h1 {
      font-size: 2rem;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 2rem;

  article {
    padding: 1rem;
  }

  @media ${breakpoint.lg} {
    flex-direction: column;

    article {
      padding: 1rem 0;
    }
  }
`;

export default Root;

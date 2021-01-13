import React from "react";

//import styles and assets
import styled from "styled-components";
import colors from "../Colors";

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <div className="left">© 2021 MYSHOP</div>
        <div className="right">
          <p>Shop</p>
          <p>About Us</p>
          <p>Our Story</p>
          <p>Press</p>
          <p>Help</p>
        </div>
      </Container>
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
`;

const Wrapper = styled(Flex)`
  align-items: center;
  margin-top: 4em;
`;

const Container = styled(Flex)`
  width: 100%;
  max-width: 1024px;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${colors.darkgray};
  padding: 2em 0;
  margin: 0 auto;

  .left {
    flex: 0 1 40%;
  }

  .right {
    display: flex;
    flex: 0 1 60%;
    justify-content: space-between;
  }

  p {
    line-height: 2.5rem;
    color: ${colors.gray};
  }
`;

const Logo = styled.div`
  /* background-color: salmon; */
  flex: 1 1 30%;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.darkergray};
  letter-spacing: 0.2rem;
`;

export default Footer;

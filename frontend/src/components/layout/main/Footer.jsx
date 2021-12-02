import React from "react";
import styled from "styled-components";

//token
import { neutral, breakpoint, fontScale } from "../../token";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Section>
          <Logo>sweet</Logo>
        </Section>
        <Section>
          <h6>About Us</h6>
          <div>
            <Column>
              <li>Our Story</li>
              <li>Media</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </Column>
          </div>
        </Section>
        <Section>
          <h6>Help</h6>
          <div>
            <Column>
              <li>Ordering</li>
              <li>Shipping</li>
              <li>Return Policy</li>
              <li>FAQ</li>
            </Column>
          </div>
        </Section>

        <Section>
          <h6>My Account</h6>
          <div>
            <Column>
              <li>Sign In</li>
              <li>Register</li>
              <li>Order Status</li>
              <li>Returns</li>
            </Column>
          </div>
        </Section>
      </Wrapper>
    </Container>
  );
};

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #e8dbcf;
  color: ${neutral[500]};
  padding: 4rem 2.5rem;

  @media ${breakpoint.lg} {
    padding: 2.5rem;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Logo = styled.div`
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.025rem;
  text-transform: lowercase;

  @media ${breakpoint.lg} {
    margin-bottom: 2rem;
  }
`;

const Section = styled.section`
  h6 {
    font-size: ${fontScale.scale_s2};
  }
`;

const Column = styled.ul`
  display: grid;
  grid-gap: 0.5rem;
  font-size: ${fontScale.scale_s2};
  padding: 1rem 0;
`;

export default Footer;

import React from "react";
import styled from "styled-components";

//comp
import { Section } from "../../Container";
import Text from "../../Text";
import { neutral, breakpoint, size, fontSize } from "../../token";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Section>
          <Logo>sweet</Logo>
        </Section>
        <Section>
          <Text variant="body_small" bold="extrabold">
            About Us
          </Text>
          <Column>
            <li>Our Story</li>
            <li>Media</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </Column>
        </Section>
        <Section>
          <Text variant="body_small" bold="extrabold">
            Help
          </Text>
          <Column>
            <li>Ordering</li>
            <li>Shipping</li>
            <li>Return Policy</li>
            <li>FAQ</li>
          </Column>
        </Section>
        <Section>
          <Text variant="body_small" bold="extrabold">
            My Account
          </Text>
          <Column>
            <li>Sign In</li>
            <li>Register</li>
            <li>Order Status</li>
            <li>Returns</li>
          </Column>
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
  width: 100%;
  max-width: ${size.xlg};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;

  @media ${breakpoint.lg} {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1.5rem;
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

const Column = styled.ul`
  display: grid;
  grid-gap: 0.875rem;
  font-size: ${fontSize.sm3};
  padding: 0.8rem 0;
`;

export default Footer;

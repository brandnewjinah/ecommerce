import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagramSquare,
  faFacebookF,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

//comp
import { Div, Flex } from "../../containers/Divs";
import Grid from "../../containers/Grid";
import Text from "../../Text";
import { neutral, breakpoint, size, fontSize } from "../../token";

const Footer = () => {
  return (
    <Container>
      <Div maxWidth={size.xlg} padding="0 0 2rem 0" margin="0 auto">
        <Grid breakpointLg="repeat(1, 1fr)">
          <Logo>sweet</Logo>
          <div>
            <Text variant="body_small" bold="extrabold">
              Customer Support
            </Text>
            <Column>
              <li>FAQ</li>
              <li>Ordering</li>
              <li>Shipping</li>
              <li>Return Policy</li>
            </Column>
          </div>
          <div>
            <Text variant="body_small" bold="extrabold">
              About Us
            </Text>
            <Column>
              <li>Our Story</li>
              <li>Media</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </Column>
          </div>
          <div>
            <Text variant="body_small" bold="extrabold">
              My Account
            </Text>
            <Column>
              <li>Sign In</li>
              <li>Register</li>
              <li>Order Status</li>
              <li>Returns</li>
            </Column>
          </div>
        </Grid>
      </Div>
      <Flex
        justifyContent="sb"
        maxWidth={size.xlg}
        padding="2rem 0"
        margin="0 auto"
      >
        <Flex>
          <FontAwesomeIcon icon={faInstagramSquare} />
          <FontAwesomeIcon icon={faFacebookF} />
          <FontAwesomeIcon icon={faYoutube} />
        </Flex>
        <Flex>
          <Text variant="custom" size="11px">
            © 2022 Sweets. All right reserved Privacy Policy | Terms and
            Conditions | Site Index | Do Not Sell My Information
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
};

const Container = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #e0d5c666;
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
  grid-gap: 0.65rem;
  font-size: ${fontSize.sm3};
  padding: 0.5rem 0;

  li {
    cursor: pointer;
  }
`;

export default Footer;

import React from "react";
import styled from "styled-components";

//comp
import { Div, Flex } from "../components/containers/Div";
import Grid from "../components/containers/Grid";
import { Body } from "../components/Text";
import { neutral, breakpoint, size, fontSize } from "../components/token";
import { Facebook, Instagram, Twitter, Youtube } from "../assets/Icon";

const Footer = () => {
  return (
    <Container>
      <Div maxWidth={size.xl} margin="0 auto">
        <Grid columns="repeat(5, 1fr)" breakpointLg="repeat(1, 1fr)">
          <Logo>sweet</Logo>
          <div>
            <Body variant="body_small" bold="extrabold">
              Customer Support
            </Body>
            <Column>
              <li>FAQ</li>
              <li>Ordering</li>
              <li>Shipping</li>
              <li>Return Policy</li>
            </Column>
          </div>
          <div>
            <Body variant="body_small" bold="extrabold">
              About Us
            </Body>
            <Column>
              <li>Our Story</li>
              <li>Media</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </Column>
          </div>
          <div>
            <Body variant="body_small" bold="extrabold">
              My Account
            </Body>
            <Column>
              <li>Sign In</li>
              <li>Register</li>
              <li>Order Status</li>
              <li>Returns</li>
            </Column>
          </div>
          <div>
            <Body variant="body_small" bold="extrabold">
              Follow
            </Body>
            <Column>
              <li>
                <Instagram width={20} height={20} fill={neutral[600]} />
                Instagram
              </li>
              <li>
                <Youtube width={20} height={20} fill={neutral[600]} />
                Youtube
              </li>
              <li>
                <Twitter width={20} height={20} fill={neutral[600]} />
                Twitter
              </li>
              <li>
                <Facebook width={20} height={20} fill={neutral[600]} />
                Facebook
              </li>
            </Column>
          </div>
        </Grid>
      </Div>
      <Flex
        maxWidth={size.xl}
        justifyContent="center"
        padding="2rem 0 0"
        margin="0 auto"
      >
        <Body variant="caption" color={neutral[500]}>
          © 2022 Sweets. All right reserved Privacy Policy | Terms and
          Conditions | Do Not Sell My Information
        </Body>
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
  padding: 4rem 1rem 2rem;

  @media ${breakpoint.lg} {
    padding: 2.5rem 1rem;
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
    display: flex;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
  }
`;

export default Footer;

import React from "react";
import styled from "styled-components";

import { Instagram, Twitter, Youtube } from "../../assets/Icon";

//token
import { neutral, breakpoint } from "../token";

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>sweet</Logo>
        </Left>
        <Center>
          <List>
            <ListItem>All</ListItem>
            <ListItem>Bakery</ListItem>
            <ListItem>Beverage</ListItem>
            <ListItem>Snacks</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
            <ListItem>Contact</ListItem>
            <ListItem>FAQ</ListItem>
          </List>
        </Center>
        <Right>
          <SocialContainer>
            <SocialIcon>
              <Instagram width={14} height={14} color="#fff" stroke={2} />
            </SocialIcon>
            <SocialIcon>
              <Twitter width={14} height={14} color="#fff" stroke={2} />
            </SocialIcon>
            <SocialIcon>
              <Youtube width={14} height={14} color="#fff" stroke={2} />
            </SocialIcon>
          </SocialContainer>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #e8dbcf;
  color: ${neutral[500]};
  padding: 4rem 2.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 90rem;
  margin: 0 auto;

  @media ${breakpoint.lg} {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
`;

const Logo = styled.div`
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: 0.25rem;
  text-transform: lowercase;
`;

const Center = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;

  @media ${breakpoint.lg} {
    flex: 1;
  }
`;

const List = styled.ul`
  column-count: 3;

  @media ${breakpoint.lg} {
    column-count: 2;
    column-gap: 20px;
    column-fill: auto;
    list-style-position: inside;
  }
`;

const ListItem = styled.li`
  font-size: 0.75rem;
  font-weight: 600;
  width: 100%;
  margin-bottom: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.045rem;

  @media ${breakpoint.lg} {
    width: 100%;
  }
`;

const Right = styled.div`
  flex: 1;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  background-color: ${neutral[500]};
  margin-left: 1rem;
`;

export default Footer;

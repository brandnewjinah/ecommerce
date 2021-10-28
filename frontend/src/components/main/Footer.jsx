import React from "react";
import styled from "styled-components";

import { Instagram, Twitter, Youtube } from "../../assets/Icon";

//token
import { primaryColor } from "../token";

const Footer = () => {
  return (
    <Container>
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
            <Instagram width={20} height={20} color="#23221f" stroke={2} />
          </SocialIcon>
          <SocialIcon>
            <Twitter width={20} height={20} color="#23221f" stroke={2} />
          </SocialIcon>
          <SocialIcon>
            <Youtube width={20} height={20} color="#23221f" stroke={2} />
          </SocialIcon>
        </SocialContainer>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #23221f;
  color: ${primaryColor.gold};
  padding: 4rem 2.5rem;
`;

const Left = styled.div`
  flex: 1;
`;

const Logo = styled.div`
  font-family: "Cookie", cursive;
  font-size: 3.5rem;
  text-transform: lowercase;
  font-weight: 500;
`;

const Center = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
`;

const List = styled.ul`
  display: flex;

  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 33%;
  margin-bottom: 0.875rem;
  text-transform: uppercase;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${primaryColor.gold};
  margin-left: 1rem;
`;

export default Footer;

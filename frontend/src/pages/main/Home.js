import React from "react";

//import components
import Layout from "../../components/main/LayoutFull";

//import styles and assets
import styled from "styled-components";

const Home = () => {
  return (
    <Layout>
      <Wrapper>
        <Hero></Hero>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div``;

const Hero = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #e8fccf;
`;

export default Home;

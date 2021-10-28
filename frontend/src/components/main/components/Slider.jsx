import React from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "../../../assets/Icon";

const Slider = () => {
  return (
    <Container>
      <Arrow direction="left">
        <ChevronLeft width={20} height={20} color="#000" stroke={2} />
      </Arrow>
      {/* <Wrapper> */}
      <Slide>
        <ImgContainer>
          <Image src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2680&q=80" />
        </ImgContainer>
        <CopyContainer></CopyContainer>
      </Slide>
      {/* </Wrapper> */}
      <Arrow direction="right">
        <ChevronRight width={20} height={20} color="#000" stroke={2} />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 70vh;
  position: relative;
`;

// const Wrapper = styled.div`
//   height: 100%;
// `;

const Slide = styled.div`
  width: 100%;
  /* height: 70vh; */
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 100%;
  /* height: 70vh; */
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
`;

const CopyContainer = styled.div`
  flex: 1;
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #f4eded;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
`;

export default Slider;

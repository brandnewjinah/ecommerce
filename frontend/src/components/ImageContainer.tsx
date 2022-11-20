import React, { FC } from "react";
import styled from "styled-components";

//comp
import { ImageIcon } from "../assets/Icon";

interface Props {
  imgUrl?: any;
  ratio?: string;
  pathIsTools?: boolean;
  minWidth?: string;
}
const ImageContainer: FC<Props> = ({ imgUrl, minWidth }) => {
  return (
    <>
      {imgUrl && imgUrl ? (
        <Container minWidth={minWidth}>
          <img src={imgUrl} alt="" />
        </Container>
      ) : (
        <Container>
          <ImageIcon width={20} height={20} color="#000" stroke={2} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div<Props>`
  flex: 1;
  width: 100%;
  min-width: ${(props) => props.minWidth && props.minWidth};
  position: relative;
  max-height: 70vw;
  background-color: #fff;

  &:before {
    content: "";
    display: block;
    padding-bottom: 100%;
    width: 100%;
  }
  img {
    border: none;
    position: absolute;
    top: 0;
    /* bottom: 0; */
    left: 0;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default ImageContainer;

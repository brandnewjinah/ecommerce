import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";

//import styles and assets
import styled from "styled-components";
import { Image } from "../../assets/Icons";
import { Button } from "../../components/Button";

const Detail = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${config.API}/product/${props.match.params.id}`)
        .then((res) => {
          const { productInfo } = res.data;
          setData(productInfo);
        })
        .catch((err) => {
          alert(err);
        });
    };

    getData();
  }, [props.match.params.id]);

  return (
    <Wrapper>
      <Main>
        <h1>Cart</h1>
        <Img>
          <Image width="20" height="20" color="#000" stroke="2" />
        </Img>
        <Desc>
          <div className="flex">
            <div>{data.category1}</div>
            <div>/</div>
            <div>{data.category2}</div>
          </div>
          <h4>{data.name}</h4>
          <h6>{data.brand}</h6>
          <h5>{data.price}</h5>
          <div>Counter - 1 +</div>
          <Button label="Add to Cart" />
          <div>descriptions</div>
        </Desc>
      </Main>
      <Details>details</Details>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1040px;
  margin: 0 auto;
`;

const Main = styled.main`
  display: flex;
  padding-top: 4em;
`;

const Img = styled.div`
  width: 430px;
  height: 385px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Desc = styled.div`
  padding-left: 3em;

  .flex {
    display: flex;
  }
`;

const Details = styled.div``;

export default Detail;

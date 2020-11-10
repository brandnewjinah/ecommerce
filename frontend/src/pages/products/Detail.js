import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

//import styles and assets
import styled from "styled-components";
import { Image } from "../../assets/Icons";
import { Button } from "../../components/Button";

const Detail = (props) => {
  const [data, setData] = useState({});

  useEffect(() => {
    getData();
  }, []);

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

  const handleAdd = async () => {
    const product = {
      product: data,
    };
    console.log(product);
    await axios
      .post("http://localhost:5000/cart", product)
      .then((res) => {
        if (res.status === 200) {
          alert("Product saved");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Wrapper>
      <Category>
        <div className="flex link">
          <Link to="/">
            <div>{data.category1}</div>
          </Link>
          <div style={{ margin: `0 .5em`, color: `#8a8a8a` }}> / </div>
          <Link to="/">
            <div>{data.category2}</div>
          </Link>
        </div>
      </Category>
      <Main>
        <Img>
          <img src={data.image} alt="" />
        </Img>
        <Desc>
          <h4>{data.name}</h4>
          <div className="link">
            <Link to="/">
              <h6>{data.brand}</h6>
            </Link>
          </div>
          <h5>${data.price}</h5>
          <div className="btn">
            <Button label="Add to Cart" imp="primary" handleClick={handleAdd} />
          </div>
        </Desc>
      </Main>
      <Details>details</Details>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  .flex {
    display: flex;
  }

  .link a {
    color: #6b6b6b;
    text-decoration: underline;
  }
`;

const Category = styled.div`
  padding: 2em 0 1em 0;
`;

const Main = styled.main`
  display: flex;

  @media (max-width: 840px) {
    flex-direction: column;
  }
`;

const Img = styled.div`
  width: 430px;
  /* height: 385px; */
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    object-fit: cover;
  }

  @media (max-width: 840px) {
    margin: 0 auto;
  }
`;

const Desc = styled.div`
  padding-left: 3em;

  h5 {
    margin: 0.75em 0;
  }

  .btn {
    margin: 2em 0;
  }
`;

const Details = styled.div``;

export default Detail;

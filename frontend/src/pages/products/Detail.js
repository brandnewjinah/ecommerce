import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

//import styles and assets
import Layout from "../../components/main/Layout";
import styled from "styled-components";
import { Image } from "../../assets/Icons";
import { Button } from "../../components/Button";
import colors from "../../components/Colors";

//import redux
import { connect } from "react-redux";
import { domainToASCII } from "url";

const Detail = (props) => {
  let { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const currentItem = props.fashion.find((c) => c.sku === id);
    setData(currentItem);
    // await axios
    //   .get(`${config.API}/product/${props.match.params.id}`)
    //   .then((res) => {
    //     const { productInfo } = res.data;
    //     setData(productInfo);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
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
  console.log(data);
  return (
    <Layout>
      <Wrapper>
        <Category>
          <div className="flex link">
            <Link to="/">
              <div>{data.category1 && data.category1.label}</div>
            </Link>
            <div style={{ margin: `0 .5em`, color: `#8a8a8a` }}> / </div>
            <Link to="/">{data.category2 && data.category2.label}</Link>
            <div style={{ margin: `0 .5em`, color: `#8a8a8a` }}> / </div>
            <Link to="/">{data.category3 && data.category3.label}</Link>
          </div>
        </Category>
        <Main>
          <Img>
            <img src={data.image} alt="" />
          </Img>
          <Desc>
            <Section>
              <Link to="/">
                <p className="overline">{data.brand}</p>
              </Link>
              <p className="title">{data.name}</p>
              <p className="price">
                {data.currency && data.currency.label}
                {data.price}
              </p>
            </Section>
            <Section>
              <p className="overline">From</p>
              <Link to={data.link} target="_blank">
                <p>{data.store}</p>
              </Link>
            </Section>
            <Section>
              <p className="overline">Color</p>
              {data.color && data.color.map((c, idx) => <span>{c.label}</span>)}
            </Section>
            <Section>
              <p className="overline">Size</p>
              {data.size && data.size.map((s, idx) => <span>{s.label}</span>)}
            </Section>
            <div className="btn">
              <Button
                label="Add to Cart"
                imp="primary"
                handleClick={handleAdd}
              />
            </div>
          </Desc>
        </Main>
        <Details>details</Details>
      </Wrapper>
    </Layout>
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
  min-width: 430px;
  /* height: 385px; */
  background-color: #eee;
  display: flex;
  flex: 1 1 50%;
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
  flex: 1 1 50%;
  padding-left: 3em;

  h5 {
    margin: 0.75em 0;
  }

  h6 {
    font-weight: 400;
  }

  .btn {
    margin: 2em 0;
  }
`;

const Section = styled.div`
  padding: 0.75em 0;

  p {
    line-height: 1.5rem;
  }

  .overline {
    font-size: 0.75rem;
    color: ${colors.gray};
  }

  .title {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 0.75em;
  }

  .price {
    font-size: 1rem;
    font-weight: 400;
    color: ${colors.darkestgray};
  }

  border-bottom: 1px solid ${colors.lightgray};
`;

const Details = styled.div``;

const mapStateToProps = (state) => {
  return {
    fashion: state.fashion.products,
  };
};

export default connect(mapStateToProps, null)(Detail);

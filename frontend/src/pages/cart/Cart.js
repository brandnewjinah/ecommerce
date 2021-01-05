import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

//import components
import Layout from "../../components/main/Layout";
import CartItem from "./CartItem";
import { Button } from "../../components/Button";

//import styles and assets
import styled from "styled-components";
import colors from "../../components/Colors";

//import redux
import { connect } from "react-redux";
import { addCart } from "../../reducers/cartReducer";

const Cart = (props) => {
  let { id } = useParams();

  const [data, setData] = useState({});

  const handleDecrease = () => {
    if (data.qty > 1) {
      setData({ ...data, qty: data.qty - 1 });
    }
  };

  const handleIncrease = () => {
    setData({ ...data, qty: data.qty + 1 });
  };

  return (
    <Layout>
      <Wrapper>
        <Main>
          <Items>
            {props.cart &&
              props.cart.length > 0 &&
              props.cart.map((item, idx) => <CartItem data={item} />)}
          </Items>
          <Summary>
            <Section>
              <Link to={{ pathname: data.link }} target="_blank">
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
            {data.color && data.color.length > 0 && (
              <Section>
                <p className="overline">Color</p>
                {data.color &&
                  data.color.map((c, idx) => <span>{c.label}</span>)}
              </Section>
            )}
            <Section>
              <p className="overline">Size</p>
              <p>{data.size}</p>
            </Section>
            <div className="btn">
              <div className="six">
                <Button label="Add to Cart" type="fill" color="#002C66" />
              </div>
            </div>
          </Summary>
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

const Main = styled.main`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 840px) {
    flex-direction: column;
  }
`;

const Items = styled.div`
  flex: 0 1 69%;
  justify-content: center;
  align-items: center;

  @media (max-width: 840px) {
    margin: 0 auto;
  }
`;

const Summary = styled.div`
  background-color: yellow;
  flex: 0 1 29%;
  padding-left: 3em;

  h5 {
    margin: 0.75em 0;
  }

  h6 {
    font-weight: 400;
  }

  .btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2em 0;
  }
  .four {
    flex: 0 1 40%;
  }

  .six {
    flex: 0 1 59%;
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
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps, { addCart })(Cart);

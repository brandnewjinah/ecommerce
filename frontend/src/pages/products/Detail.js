import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

//import components
import Layout from "../../components/main/Layout";
import Counter from "../../components/Counter";
import { Button } from "../../components/Button";
import { Card } from "../../components/main/ProductCard";

//import styles and assets
import styled from "styled-components";

import colors from "../../components/Colors";

//import redux
import { connect } from "react-redux";
import { addCart } from "../../reducers/cartReducer";

const Detail = (props) => {
  let { id } = useParams();

  const [data, setData] = useState({});
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const currentItem = props.product.find((c) => c.sku === id);
      setData({ ...currentItem, qty: 1 });
      let similarItems = props.product.filter(
        (p) => p.category2.id === currentItem.category2.id && p.sku !== id
      );
      setSimilar(similarItems);
      // setData(currentItem);
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
    getData();
  }, [id, props.product]);

  const handleAdd = async () => {
    const product = {
      brand: data.brand,
      name: data.name,
      currency: data.currency,
      price: parseFloat(data.price),
      sku: data.sku,
      img: data.imgs[0],
      qty: data.qty,
    };

    props.addCart(product);
    // await axios
    //   .post("http://localhost:5000/cart", product)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       alert("Product saved");
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };

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
        <Category>
          <div className="flex link">
            <Link to={`/products/${data.category1 && data.category1.value}`}>
              <div>{data.category1 && data.category1.label}</div>
            </Link>
            <div style={{ margin: `0 .5em`, color: `#8a8a8a` }}> / </div>
            {data.category2 && data.category2.label}
          </div>
        </Category>
        <Main>
          <Img>
            <img src={data.imgs && data.imgs[0].src} alt="" />
          </Img>
          <Desc>
            <Section>
              <p className="overline">{data.brand}</p>
              <p className="title">{data.name}</p>
            </Section>
            <Section>
              <p className="overline">Price</p>
              <p className="price">
                {data.currency && data.currency.label}
                {data.price}
              </p>
            </Section>
            <Section>
              <p className="overline">From</p>
              <Link to={{ pathname: data.link }} target="_blank">
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
            <Section>
              <p className="overline">Quantity</p>
              <div className="counter">
                <Counter
                  qty={data.qty}
                  handleDecrease={() => handleDecrease()}
                  handleIncrease={() => handleIncrease()}
                />
              </div>
            </Section>
            <div className="btn">
              <div className="six">
                <Button
                  label="Add to Cart"
                  type="fill"
                  color="#002C66"
                  handleClick={handleAdd}
                />
              </div>
              <div className="four">
                <Button
                  label="Wishlist"
                  type="outline"
                  color="#002C66"
                  handleClick={handleAdd}
                />
              </div>
            </div>
          </Desc>
        </Main>
        <More>
          <h6>You may also like</h6>
          <Similar>
            {similar &&
              similar.map((p, idx) => (
                <Card
                  key={idx}
                  id={p.sku}
                  brand={p.brand}
                  name={p.name}
                  currency={p.currency && p.currency.label}
                  price={p.price}
                  imageUrl={p.imgs[0].src}
                />
              ))}
          </Similar>
        </More>
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
  font-size: 0.75rem;
  color: ${colors.gray};
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
  background-color: #eee;
  display: flex;
  flex: 1 1 40%;
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
  flex: 1 1 60%;
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

  div {
    &:nth-child(5) {
      border: none;
    }
  }
`;

const Section = styled.div`
  padding: 0.75em 0;
  border-bottom: 1px solid ${colors.lightgray};

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
    /* margin-bottom: 0.75em; */
  }

  .price {
    font-size: 1rem;
    font-weight: 400;
    color: ${colors.darkestgray};
  }

  .counter {
    margin-top: 0.35em;
  }
`;

const More = styled.div`
  padding-top: 2em;

  h6 {
    font-weight: 400;
    font-size: 1rem;
    color: ${colors.darkestgray};
  }
`;

const Similar = styled.div`
  margin-top: 1em;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 1em;
  @media (max-width: 980px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const mapStateToProps = (state) => {
  return {
    product: state.products.products,
  };
};

export default connect(mapStateToProps, { addCart })(Detail);

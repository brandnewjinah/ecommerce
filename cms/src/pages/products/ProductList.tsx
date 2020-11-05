import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";

//import components
import { BtnText } from "../../components/Button";

//import styles and assetss
import styled from "styled-components";

interface Props {}

const ProductList: FC<Props> = (props) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(`${config.API}/product`);
    // const { data } = await axios.get("./data/data.json");
    setData(data.products);
  };

  const handleDelete = async () => {
    await axios
      .delete(`${config.API}/product/`)
      .then((res) => {
        if (res.status === 200) {
          alert("All Products Deleted");
          window.location.reload();
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Wrapper>
      <h4>Inventory</h4>
      <p>{data.length} products total</p>
      <BtnText label="Delete All" handleClick={handleDelete} />
      <Container>
        {data.map((p, idx) => (
          <div
            className={idx % 2 === 0 ? "container" : "container odd"}
            key={idx}
          >
            <Link to={`/products/${p.id}`}>
              <div className="code">{p.code}</div>
              <div className="name">{p.name}</div>
              <div className="price">
                {p.price.currency === "USD" && `$${p.price.current_price}`}
              </div>
              <div className="cat">{p.category}</div>
            </Link>
          </div>
        ))}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    width: 100%;
    display: flex;
    padding: 1em;
  }

  a {
    width: 100%;
    display: flex;
  }

  .odd {
    background-color: #fafafa;
  }

  .code {
    width: 10%;
  }
  .name {
    width: 40%;
  }
  .price {
    width: 20%;
  }
  .cat {
    width: 30%;
  }
`;

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #f4f4f4;
  border-radius: 0.5em;
`;

export default ProductList;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//import styles and assets
import Layout from "../../components/main/Layout";
import styled from "styled-components";

import colors from "../../components/Colors";

//import redux
import { connect } from "react-redux";
import { deleteCollection } from "../../reducers/collectionReducer";

const Detail = (props) => {
  let { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const currentItem = props.collection.find((c) => c.id === parseInt(id));
      setData(currentItem);
    };
    getData();
  }, [id, props.collection]);

  // const handleAdd = async () => {
  //   const product = {
  //     product: data,
  //   };
  // };

  const handleDelete = () => {
    props.deleteCollection(data);
  };

  return (
    <Layout>
      <Wrapper>
        <Main>
          <Header>
            <Flex>
              <h4>{data.name}</h4>
              <Link to={`/collection/${id}/edit`}>
                <div>Edit</div>
              </Link>
              <Link to={`/collection/${id}/add`}>
                <div>Add</div>
              </Link>
              <div onClick={handleDelete}>delete</div>
            </Flex>
            <p>{data.description}</p>
          </Header>
          <ImageContainer>
            {data.imgs &&
              data.imgs.length > 0 &&
              data.imgs.map((img, idx) => (
                <div key={idx}>
                  <img src={img.src} alt="" />
                </div>
              ))}
          </ImageContainer>
          {/* <Img>
            <img src={data.image} alt="" />
          </Img>
          <Desc>
            <Section>
              <Link to="/">
                <p className="overline">a</p>
              </Link>
              <p className="title">b</p>
              <p className="price">c</p>
            </Section>
            <Section>
              <p className="overline">From</p>
              <Link to={data.link} target="_blank">
                <p>d</p>
              </Link>
            </Section>
          </Desc> */}
        </Main>
      </Wrapper>
    </Layout>
  );
};

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  padding-top: 2em;

  @media (max-width: 840px) {
    flex-direction: column;
  }
`;

const Header = styled.div`
  text-align: center;
  padding: 1em;

  h4 {
    font-weight: 600;
  }

  p {
    color: ${colors.gray};
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;

  div {
    width: 25%;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 0.5em;
  }
`;

// const ImageContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-gap: 2em;
//   border: 1px solid ${colors.lightgray};
//   padding: 1em;

//   img {
//     width: 100%;
//   }
// `;

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, { deleteCollection })(Detail);

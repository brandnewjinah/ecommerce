import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router-dom";

//import components
import Layout from "../../components/main/Layout";
import Input from "../../components/Input";
import { Button } from "../../components/Button";

//import styles and assets
import styled from "styled-components";
import colors from "../../components/Colors";

//import data
import { occasionData } from "../../data/collection";

//redux
import { connect } from "react-redux";
import {
  addCollection,
  editCollection,
  deleteAll,
} from "../../reducers/collectionReducer";

const AddCollection = (props) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    imgs: [
      {
        id: 1,
        src: "",
      },
    ],
    category1: {},
    category2: {},
    category3: {},
  });
  const history = useHistory();
  let location = useLocation();
  let { id } = useParams();

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const handleImgChange = (e, idx) => {
    const userInput = { ...data };
    userInput[e.target.name][idx].src = e.target.value;
    setData(userInput);
  };

  const handleCategory = (name) => (value) => {
    let newData = { ...data, [name]: value };
    setData(newData);
  };

  const validate = () => {
    const errors = {};
    if (data.image === "") {
      errors.image = "Image is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    let id =
      props.collection.length === 0
        ? 1
        : props.collection[props.collection.length - 1].id + 1;

    let newData = { ...data, id: id };
    props.addCollection(newData);
    // postData();
  };

  const handleEdit = () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    props.editCollection(data); //add to redux
    alert("Updated");
    history.push(`/collection/${id}`);
  };

  let newImgs = [...data.imgs];
  const handleImgAdd = () => {
    let id = newImgs[newImgs.length - 1].id + 1;
    newImgs = [...newImgs, { id: id, src: "" }];
    setData({ ...data, imgs: newImgs });
  };

  const handleImgDelete = (id) => {
    newImgs = newImgs.filter((i) => i.id !== id);
    setData({ ...data, imgs: newImgs });
  };

  useEffect(() => {
    const getData = async () => {
      if (location.pathname.includes("/edit")) {
        //from redux store
        const currentItem = await props.collection.find(
          (c) => c.id === parseInt(id)
        );
        setData(currentItem);
      }
    };
    getData();
  }, [id, location.pathname, props.collection]);

  return (
    <Layout>
      <Wrapper>
        <h6>Add Collection</h6>

        <form onSubmit={handleSubmit}>
          <Container>
            <Input
              label=" Name"
              placeholder={`like "Home Lounging" or "Outdoor Workout"`}
              name="name"
              value={data.name}
              error={errors.name}
              handleChange={handleChange}
            />
            <Input
              label="Description"
              name="description"
              value={data.description}
              error={errors.description}
              handleChange={handleChange}
            />
          </Container>
          <Container>
            <p>Collection Images</p>
            <ImageContainer>
              {data.imgs.map((img, idx) => (
                <img src={img.src} alt="" />
              ))}
            </ImageContainer>
            {data.imgs.map((img, idx) => (
              <InputWrapper>
                <div className="left">
                  <Input
                    label="Image URL"
                    name="imgs"
                    value={img.src}
                    error={errors.image}
                    handleChange={(e) => handleImgChange(e, idx)}
                  />
                </div>
                {idx === 0 ? (
                  <div className="right"></div>
                ) : (
                  <div className="right">
                    <Button
                      lable="delete"
                      handleClick={() => handleImgDelete(img.id)}
                    />
                  </div>
                )}
              </InputWrapper>
            ))}
            <Button label="More" handleClick={handleImgAdd} />
          </Container>

          <Container>
            <Category>
              <p>Select Main Occasion</p>
              <Select
                name="category1"
                options={occasionData}
                onChange={handleCategory("category1")}
              />
            </Category>
            {Object.keys(data.category1).length !== 0 &&
              data.category1.subcategory && (
                <Category>
                  <p>Select Subcategory</p>
                  <Select
                    name="category2"
                    options={data.category1.subcategory}
                    onChange={handleCategory("category2")}
                  />
                </Category>
              )}

            {Object.keys(data.category2).length !== 0 &&
              data.category2.subcategory && (
                <Category>
                  <p>A litte more detail</p>
                  <Select
                    name="category3"
                    options={data.category2.subcategory}
                    onChange={handleCategory("category3")}
                  />
                </Category>
              )}
          </Container>
          {location.pathname.includes("/edit") ? (
            <>
              <Button label="Edit" handleClick={handleEdit} />
              {/* <Button label="Delete" handleClick={handleDelete} /> */}
            </>
          ) : (
            <Button label="Add" handleClick={handleSubmit} />
          )}
        </form>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  h6 {
    text-transform: uppercase;
  }
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 0.25em;
  padding: 2em;
  margin: 1em 0;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2em;
  border: 1px solid ${colors.lightgray};
  padding: 1em;

  img {
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    width: 96%;
  }

  .right {
    width: 2%;
  }
`;

const Category = styled.div`
  margin: 1em 0;
`;

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, {
  addCollection,
  editCollection,
  deleteAll,
})(AddCollection);

import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

//import libraries
import Select from "react-select";
import moment from "moment";

//import components
import Input from "../../../components/Input";
import { Button } from "../../../components/Button";

//import data

import { demoCustomers } from "../../../data/demo/demoCustomers";

//redux
import { connect } from "react-redux";
import { addItem, editItem } from "../../../reducers/productReducer";

//import styles and assets
import styled from "styled-components";
import colors from "../../../components/Colors";

const roleData = [
  {
    id: 100,
    value: "user",
    label: "User",
  },
  {
    id: 101,
    value: "admin",
    label: "Admin",
  },
];

const AddProduct = (props) => {
  const history = useHistory();
  let location = useLocation();
  let { id } = useParams();

  const [data, setData] = useState({
    name: "",
    email: "",
    role: {},
    joined: "",
  });

  const formatDate = (date) => {
    return moment(date).format("MMM Do YYYY, h:mm a");
  };

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const handleRole = (name) => (value) => {
    let newData = { ...data, [name]: value };
    setData(newData);
  };

  const validate = () => {
    const errors = {};
    if (data.name === "") {
      errors.name = "Name is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleEdit = () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    props.editItem({ ...data, uploaded: moment().toISOString() });
    history.push("/cms/customers");
    // postData();
  };

  useEffect(() => {
    const getData = () => {
      //from demo data
      const currentCustomer = demoCustomers.find((c) => c.id === parseInt(id));
      setData(currentCustomer);
    };
    getData();
  }, [location.pathname, props.product, id]);

  return (
    <Wrapper>
      <Flex>
        <div>
          <h6>Customer Info</h6>
        </div>
        <div>
          {/* <Button
            label="Save Changes"
            handleClick={handleEdit}
            type="fill"
            color="#06193b"
          /> */}
        </div>
      </Flex>
      <Container>
        <div className="item">
          <Input
            label="Name"
            name="name"
            value={data.name}
            error={errors.name}
            handleChange={handleChange}
          />
        </div>
        <div className="item">
          <Input
            label="Email"
            name="email"
            value={data.email}
            error={errors.email}
            handleChange={handleChange}
          />
        </div>
      </Container>
      <Container>
        <div className="item">
          <p className="label">Role</p>
          <Select
            name="role"
            styles={customStyles}
            value={data.role}
            options={roleData}
            onChange={handleRole("role")}
          />
        </div>
      </Container>

      <Container>
        <div className="item">
          <p className="label">Joined</p>
          <p className="label">{formatDate(data.joined)}</p>
        </div>
      </Container>

      <div className="right">
        {/* <Button
          label="Save Changes"
          handleClick={handleEdit}
          type="fill"
          color="#06193b"
        /> */}
      </div>
    </Wrapper>
  );
};

const customStyles = {
  control: (styles) => ({
    ...styles,
    borderRadius: `0.25em`,
    border: `1px solid #e4e4e4`,
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: colors.lightergray,
    padding: `0 0.5em`,
  }),
};

const Wrapper = styled.div`
  h6 {
    text-transform: uppercase;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 0 30px 0 rgba(63, 76, 105, 0.05);
  border-radius: 0.25em;
  padding: 2em;
  margin-bottom: 1em;

  .item {
    margin-bottom: 1em;
  }

  .label {
    font-weight: 400;
    color: ${colors.darkergray};
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;

  .one {
    flex: 0 1 9%;
  }

  .two {
    flex: 0 1 20%;
  }

  .eight {
    flex: 0 1 79%;
  }

  .nine {
    flex: 0 1 90%;
  }

  @media (max-width: 780px) {
    .eight {
      flex: 0 1 49.5%;
    }

    .two {
      flex: 0 1 49.5%;
    }

    .one {
      flex: 0 1 49.5%;
    }

    .nine {
      flex: 0 1 49.5%;
    }
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;

  .left {
    width: 96%;
  }

  .right {
    width: 2%;
    padding-top: 2.25em;
  }
`;

const mapStateToProps = (state) => {
  return {
    product: state.products.products,
  };
};

export default connect(mapStateToProps, { addItem, editItem })(AddProduct);

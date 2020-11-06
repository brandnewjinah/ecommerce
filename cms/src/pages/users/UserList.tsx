import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config.json";
import axios from "axios";

//import components
import { BtnText } from "../../components/Button";

//import styles and assetss
import styled from "styled-components";

interface Props {}

const UserList: FC<Props> = (props) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(`${config.API}/user`);
    // const { data } = await axios.get("./data/data.json");
    setData(data.users);
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
      <h4>Users</h4>
      <p>{data.length} users total</p>
      <BtnText label="Delete All" handleClick={handleDelete} />
      <Container>
        {data.map((u, idx) => (
          <div
            className={idx % 2 === 0 ? "container" : "container odd"}
            key={idx}
          >
            <Link to={`/users/${u.id}`}>
              <div className="name">{u.name}</div>
              <div className="email">{u.email}</div>
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

  .name {
    width: 40%;
  }
  .email {
    width: 20%;
  }
`;

const Container = styled.div`
  background-color: #fff;
  border: 1px solid #f4f4f4;
  border-radius: 0.5em;
`;

export default UserList;

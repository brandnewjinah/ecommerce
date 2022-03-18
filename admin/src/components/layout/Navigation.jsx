import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//comp
import { breakpoint } from "../token";

//import data
import { navData } from "../../data/navData";

const Navigation = ({ sideOpen, handleOpen }) => {
  const [open, setOpen] = useState(1000);
  const [active, setActive] = useState();

  const handleSubcategory = (sub) => {
    setActive(sub);
    handleOpen((prev) => !prev);
  };

  return (
    <Container sideOpen={sideOpen}>
      <Nav>
        <ul>
          {navData.map((category, idx) => (
            <li key={idx}>
              <MainLink onClick={() => setOpen(idx === open ? 1000 : idx)}>
                {category.name}
              </MainLink>

              <ul className={idx === open ? "" : "hide"}>
                {category.subcategory.map((sub, idx) => (
                  <li key={idx}>
                    <SubLink
                      to={sub.link}
                      onClick={() => handleSubcategory(sub.name)}
                      className={sub.name === active ? "sub active" : "sub"}
                    >
                      {sub.name}
                    </SubLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Nav>
    </Container>
  );
};

const Container = styled.section`
  flex: 1;
  display: block;
  min-width: 250px;
  height: calc(100vh - 50px);
  background-color: #fff;
  position: sticky;
  top: 50px;
  box-shadow: 0 0.65rem 1.5rem rgb(18 38 63 / 3%);
  overflow-y: auto;
  padding: 1rem 0;
  z-index: 50;
  background-color: aliceblue;

  @media ${breakpoint.lg} {
    display: ${(props) => (props.sideOpen ? "block" : "none")};
  }
`;

const Nav = styled.nav`
  font-size: 0.9rem;

  .hide {
    display: none;
  }
`;

const MainLink = styled(Link)`
  width: 100%;
  font-weight: 700;
  padding: 0.875rem 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 0.35em;
  }
`;

const SubLink = styled(Link)`
  width: 100%;
  padding: 0.875rem 2.25rem;
  font-weight: 400;
  border-radius: 0.35em;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 0.35em;
  }

  .active {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 0.35em;
  }
`;

export default Navigation;

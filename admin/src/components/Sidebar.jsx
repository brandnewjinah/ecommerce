import React, { useState } from "react";
import styled from "styled-components";

import { MenuItems, MenuItem } from "./Utils";
import { breakpoint } from "./token";

const Sidebar = ({ sideOpen, handleOpen }) => {
  const [subSelected, setSubSelected] = useState("");
  const [menuSelected, setMenuSelected] = useState("");

  const handleMenuSelected = (name, submenu) => {
    setMenuSelected(name === menuSelected ? null : name);
    setSubSelected(name);
    !submenu && handleOpen((prev) => !prev);
  };

  const handleSubSelected = (name) => {
    setSubSelected(name);
    handleOpen((prev) => !prev);
  };

  return (
    <Wrapper sideOpen={sideOpen}>
      <div className="sidebarMenu">
        <ul className="sidebarList">
          {MenuItems.map((item, idx) => (
            <MenuItem
              key={idx}
              name={item.name}
              link={item.link}
              submenu={item.submenu}
              subSelected={subSelected}
              menuSelected={menuSelected}
              handleSelected={() => handleMenuSelected(item.name, item.submenu)}
              handleSubClick={(name) => handleSubSelected(name)}
            />
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: block;
  min-width: 250px;
  height: calc(100vh - 50px);
  background-color: #fff;
  position: sticky;
  top: 50px;
  box-shadow: 0 0.65rem 1.5rem rgb(18 38 63 / 3%);

  .sidebarMenu {
    padding: 2rem 0;
  }

  .sidebarList {
  }

  @media ${breakpoint.lg} {
    display: ${(props) => (props.sideOpen ? "block" : "none")};
    width: 100%;
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    z-index: 100;
  }
`;

export default Sidebar;

import React, { useState } from "react";
import styled from "styled-components";

//import styles and assets
import { Notifications, Settings } from "../../assets/Icon";
import { breakpoint, neutral } from "../token";

const Header = ({ handleOpen }) => {
  const [open, setOpen] = useState(false);
  const handleMenuBtnClick = () => {
    handleOpen((prev) => !prev);
  };

  return (
    <Wrapper open={open}>
      <div className="container flexSpaceBetween">
        <div className="left">
          <span className="bold">Kit</span>
        </div>
        <div className="right flexCenter">
          <div className="iconContainer flexCenter">
            <Notifications width={20} height={20} color="#e9ecef" stroke={2} />
            <span className="iconBadge flexCenter">2</span>
          </div>
          <div className="iconContainer flexCenter">
            <Settings width={20} height={20} color="#e9ecef" stroke={2} />
          </div>
          <div className="avatar flexCenter">A</div>
          <div className="menu" onClick={handleMenuBtnClick}>
            menu
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${neutral[100]};
  box-shadow: 0 0.65rem 1.5rem rgb(18 38 63 / 3%);
  z-index: 100;

  .container {
    height: 100%;
    padding: 0px 20px;
  }

  .left {
    color: #e9ecef;
  }

  .iconContainer {
    position: relative;
    cursor: pointer;
    margin-right: 1rem;
  }

  .iconBadge {
    width: 15px;
    height: 15px;
    position: absolute;
    top: -7px;
    right: -3px;
    background-color: #f46a6a;
    color: white;
    border-radius: 50%;
    font-size: 10px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    background-color: green;
    color: white;
    border-radius: 50%;
    cursor: pointer;
  }

  .menu {
    display: block;

    @media ${breakpoint.minlg} {
      display: none;
    }
  }
`;

export default Header;

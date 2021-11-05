import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

//comp
import Auth from "../pages/Auth";

//token
import { neutral } from "./token";
import { Close } from "../assets/Icon";

const ModalAuth = ({ loginOpen, setLoginOpen }) => {
  return (
    <Modal
      open={loginOpen}
      onClose={setLoginOpen}
      center
      closeIcon={
        <Close width={20} height={20} color={neutral[400]} stroke={2} />
      }
    >
      <Auth />
    </Modal>
  );
};

export default ModalAuth;

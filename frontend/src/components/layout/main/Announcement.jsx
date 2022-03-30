import React, { useEffect } from "react";
import styled from "styled-components";
import { primaryColor } from "../../token";

//redux
import { useDispatch } from "react-redux";
import { getAnnouncements } from "../../../redux/announcementRedux";

const Announcement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  // const announce = useSelector((state) => state.announce);
  // const { error, loading, announcement } = announce;

  return (
    <Wrapper>
      {/* {error ? (
        <p>Welcome</p>
      ) : (
        <p>
          {announcement &&
            announcement !== undefined &&
            announcement[0].announcement}
        </p>
      )} */}
      <p>Welcome, new customers!</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${primaryColor.pink};
  padding: 0.75rem 0;

  p {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    color: #fff;
  }
`;

export default Announcement;

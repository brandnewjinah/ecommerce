import React, { useEffect } from "react";
import styled from "styled-components";
import { typeScale } from "../../token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "../../../redux/announcementRedux";

const Announcement = () => {
  const dispatch = useDispatch();
  const announce = useSelector((state) => state.announce);
  const { error, loading, announcement } = announce;
  console.log(announcement);

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  return (
    <Wrapper>
      {error ? <p>Welcome</p> : <p>{announcement[0].announcement}</p>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typeScale.caption};
  font-weight: 700;
  letter-spacing: 0.05rem;
  color: #fff;
  text-transform: uppercase;
  background-color: #d0af8f;
`;

export default Announcement;

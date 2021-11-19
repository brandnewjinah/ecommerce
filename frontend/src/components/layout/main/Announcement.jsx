import React, { useEffect } from "react";
import styled from "styled-components";
import { typeScale } from "../../token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "../../../redux/announcementRedux";

const Announcement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  const announce = useSelector((state) => state.announce);
  const { error, loading, announcement } = announce;

  return (
    <Wrapper>
      {error ? (
        <p>Welcome</p>
      ) : (
        <p>{announcement && announcement[0].announcement}</p>
      )}
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

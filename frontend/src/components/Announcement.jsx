import React, { useEffect } from "react";
import { neutral } from "./token";

//redux
import { useDispatch } from "react-redux";
import { getAnnouncements } from "../redux/announcementRedux";
import { Flex } from "./containers/Divs";
import { Body } from "./Text";

const Announcement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  // const announce = useSelector((state) => state.announce);
  // const { error, loading, announcement } = announce;

  return (
    <Flex justifyContent="center" padding="0.5rem 0" bgColor={neutral[200]}>
      {/* {error ? (
        <p>Welcome</p>
      ) : (
        <p>
          {announcement &&
            announcement !== undefined &&
            announcement[0].announcement}
        </p>
      )} */}
      <Body variant="body_xsmall" color={neutral[600]}>
        Welcome, new customers!
      </Body>
    </Flex>
  );
};

export default Announcement;

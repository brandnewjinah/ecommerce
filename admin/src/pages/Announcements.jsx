import React, { useEffect } from "react";
import styled from "styled-components";

//components
import Table from "../components/Table";

//redux
import { useDispatch, useSelector } from "react-redux";

import { Card } from "../components/Card";
import { getAnnouncements } from "../redux/announcementRedux";

const thead = [
  { id: "announcement", name: "announcement", sort: true, width: "60%" },
  { id: "created", name: "Created Date", sort: true, width: "33.5%" },
  { id: "action", name: "Action", sort: false, width: "6.5%" },
];

const Announcements = () => {
  const dispatch = useDispatch();

  const announcement = useSelector((state) =>
    state.announcement.announcements.map((item) => ({
      announcement: item.announcement,
      created: item.updatedAt,
      id: item._id,
    }))
  );

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  return (
    <Container>
      <Header>
        <h3>ANNOUNCEMENTS</h3>
      </Header>
      <Card>
        <Table thead={thead} tbody={announcement} checkbox action="delete" />
      </Card>
    </Container>
  );
};

const Container = styled.div``;

const Header = styled.div`
  padding: 0 0 1.5rem;
`;

export default Announcements;

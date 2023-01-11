import React, { useEffect } from "react";

//comp
import { Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import { Header } from "../../components/Header";
import { Body, HeaderText } from "../../components/Text";

//redux
import { useDispatch } from "react-redux";
import { getTotalSales } from "../../redux/dashboardReducer";

const Home = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  useEffect(() => {
    dispatch(getTotalSales({ year: 2022, month: 12 }));
  }, [dispatch]);

  return (
    <div>
      <Flex justifyContent="space-between">
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexOne"
        >
          <Header title="Total Sales" small />
          <HeaderText variant="h3">$123</HeaderText>
        </Section>
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexOne"
        >
          <Header title="Total Orders" small />
        </Section>
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexOne"
        >
          <Header title="Total Customers" small />
        </Section>
      </Flex>
      <Flex justifyContent="space-between">
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexOne"
        >
          <Header title="Recent Orders" small />
        </Section>
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexOne"
        >
          <Header title="Recently Joined" small />
        </Section>
      </Flex>
      <Flex justifyContent="space-between">
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexTwo"
        >
          <Header title="Top Products" small />
        </Section>
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexOne"
        >
          <Header title="Sales by Category" small />
        </Section>
      </Flex>
    </div>
  );
};

export default Home;

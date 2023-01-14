import React, { useEffect } from "react";

//comp
import { Flex } from "../../components/containers/Div";
import { Section } from "../../components/containers/Section";
import { Header } from "../../components/Header";
import { Body, HeaderText } from "../../components/Text";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getTotalSales } from "../../redux/dashboardReducer";
import { RootState } from "../../redux/store";
import { Customers, Dollar } from "../../assets/Icon";
import RecentOrders from "./RecentOrders";
import TopProducts from "./TopProducts";
import Pie from "../../components/Pie";
import BarChart from "../../components/BarChart";

const Home = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  // useEffect(() => {
  //   dispatch(getTotalSales({ year: 2022, month: 12 }));
  // }, [dispatch]);

  // const { dashboard } = useSelector((state: RootState) => state.dashboard);

  const dashboard = {
    totalSales: 825491,
    totalOrders: 201,
    recentOrders: [{ total: 12 }, { total: 20 }],
  };

  return (
    <div>
      <Header
        title="Welcome back"
        body="Here's what's happening with your store this month"
        margin="0 0 2rem 0"
      />
      <Flex justifyContent="space-between" alignItems="top">
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexOne"
        >
          <Header
            title="Total Sales"
            icon={<Dollar width={14} height={14} color="#fff" stroke={2} />}
            small
            margin="0 0 1rem 0"
          />
          <HeaderText variant="h3">
            {`$${dashboard && dashboard.totalSales}`}
          </HeaderText>
        </Section>
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexOne"
        >
          <Header
            title="Total Orders"
            icon={<Dollar width={14} height={14} color="#fff" stroke={2} />}
            small
            margin="0 0 1rem 0"
          />
          <HeaderText variant="h3">
            {dashboard && dashboard.totalOrders}
          </HeaderText>
        </Section>
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexOne"
        >
          <Header
            title="Total Customers"
            icon={<Customers width={14} height={14} color="#fff" stroke={2} />}
            small
            margin="0 0 1rem 0"
          />
          <HeaderText variant="h3">
            {`$${dashboard && dashboard.totalSales}`}
          </HeaderText>
        </Section>
      </Flex>

      <Section
        bgColor="#fff"
        padding="1.25rem"
        margin="0 1rem 1rem 0"
        className="flexOne"
      >
        <Header title="Recent Orders" small margin="0 0 1rem 0" />
        <RecentOrders />
      </Section>

      <Flex justifyContent="space-between" alignItems="top">
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexTwo"
        >
          <Header title="Top Products" small margin="0 0 1rem 0" />
          <TopProducts />
        </Section>
        <Section
          bgColor="#fff"
          padding="1.25rem"
          margin="0 1rem 1rem 0"
          className="flexOne"
        >
          <Header title="Sales by Category" small />
          {/* <Pie /> */}
          <BarChart />
        </Section>
      </Flex>
    </div>
  );
};

export default Home;

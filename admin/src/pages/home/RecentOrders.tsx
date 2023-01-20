import React from "react";

//comp
import FlexTable from "../../components/FlexTable";

//test data
import { orderData } from "../../data/testData";

const RecentOrders = () => {
  const tableKey = [
    {
      name: "Order ID",
      width: "flexOne",
    },
    {
      name: "Date",
      width: "flexOne",
    },
    {
      name: "User",
      width: "flexOne",
    },
    {
      name: "Items",
      width: "flexOne",
    },
    {
      name: "Total",
      width: "flexOne",
    },
    {
      name: "Status",
      width: "flexOne",
    },
  ];

  const tableData =
    orderData &&
    orderData.map((item) => {
      return [
        { value: `...${item._id.slice(-7)}`, width: "flexOne" },
        { value: item.createdAt, width: "flexOne" },
        { value: `...${item.user.slice(-7)}`, width: "flexOne" },
        { value: item.orderItems.length, width: "flexOne" },
        { value: item.total, width: "flexOne" },
        { value: item.orderStatus, width: "flexOne" },
      ];
    });

  return <FlexTable keys={tableKey} data={tableData} />;
};

export default RecentOrders;

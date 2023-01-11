import mongoose from "mongoose";

const dashboardSchema = mongoose.Schema(
  {
    totalSales: {
      type: Number,
      required: true,
    },
    totalOrders: {
      type: Number,
      required: true,
    },
    totalCustomers: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;

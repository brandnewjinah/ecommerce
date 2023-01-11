import Order from "../models/order.js";

//GET ALL ORDERS
export const getTotalSales = async (req, res) => {
  const month = req.query.month;
  const year = req.query.year;
  const date = new Date(year, month - 1, 1);
  const fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  // try {
  //   let orders = await Order.find.find({
  //     $and: [
  //       { createdAt: { $gt: startDate } },
  //       { createdAt: { $lt: endDate } },
  //     ],
  //   });
  //   // let orders = Order.find.find();

  //   res.status(200).json({
  //     status: "success",
  //     data: orders,
  //   });
  // } catch (error) {
  //   res.status(500).json(error);
  // }

  try {
    const order = await Order.aggretate([
      {
        $and: [
          { createdAt: { $gt: fromDate } },
          { createdAt: { $lt: toDate } },
        ],
      },
      {
        $group: { _id: null, total: { $sum: "$total" } },
      },
      { $project: { _id: 0, total: 1 } },
    ]);

    // const order = await Order.aggregate([
    //   {
    //     $group: {
    //       _id: null,
    //       total: {
    //         $sum: "$total",
    //       },
    //     },
    //   },
    //   { $project: { _id: 0, total: 1 } },
    // ]);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

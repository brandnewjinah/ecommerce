import Order from "../models/order.js";
import Product from "../models/product.js";

//GET TOTAL
export const getTotalSales = async (req, res) => {
  const month = req.query.month;
  const year = req.query.year;
  const date = new Date(year, month - 1, 1);
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  //top products
  //iterate orderItems and count

  try {
    const order = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },

      // { $unwind: "$orderItems" },
      // {
      //   $group: {
      //     _id: "$orderItems._id",
      //     count: { $sum: 1 },
      //   },
      // },
      // { $sort: { count: -1 } },
      // { $limit: 3 },

      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$total",
          },
          totalOrders: { $count: {} },
          recentOrders: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          totalSales: 1,
          totalOrders: 1,
          recentOrders: 1,
        },
      },
    ]);

    res.status(200).json(order[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTopSelling = async (req, res) => {
  const month = req.query.month;
  const year = req.query.year;
  const date = new Date(year, month - 1, 1);
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  try {
    const order = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },

      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.productId",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "products",
          let: {
            productId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [
                    "$_id",
                    {
                      $toObjectId: "$$productId",
                    },
                  ],
                },
              },
            },
          ],
          as: "product",
        },
      },
    ]);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

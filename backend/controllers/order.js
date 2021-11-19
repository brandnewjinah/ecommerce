import Order from "../models/order.js";

//create
export const createOrder = async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    shipping: req.body.shipping,
    billing: req.body.billing,
    total: req.body.total,
    user: req.user._id,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({ message: "Order placed", order: savedOrder });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOneOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get user order
export const getUserOrder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * pageSize;

  try {
    let orders = Order.find();
    const total = await Order.countDocuments();
    const pages = Math.ceil(total / pageSize);
    orders = orders.skip(skip).limit(pageSize);
    const result = await orders;
    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

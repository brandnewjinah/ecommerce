import Subscriber from "../models/subscriber.js";

//SUBSCRIBE TO THE LIST
export const addSubscriber = async (req, res) => {
  try {
    const existingSubscriber = await Subscriber.findOne({
      email: req.body.email,
    });

    if (existingSubscriber)
      return res.status(400).json("You're already subscribed!");

    const newSubscriber = new Subscriber({ email: req.body.email });
    await newSubscriber.save();

    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

//GET ALL USERS
export const getAllSubscribers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * pageSize;

  try {
    let subscribers = Subscriber.find();
    const total = await Subscriber.countDocuments();
    const pages = Math.ceil(total / pageSize);
    subscribers = subscribers.skip(skip).limit(pageSize);
    const result = await subscribers;
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

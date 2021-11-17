import Announcement from "../models/announcement.js";

// create new announement
export const addAnnouncement = async (req, res) => {
  const announcement = req.body;

  const newAnnounement = new Announcement(announcement);

  try {
    await newAnnounement.save();

    res.status(201).json(newAnnounement);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//GET ALL PRODUCTS
export const getAnnouncement = async (req, res) => {
  const active = req.query.active;

  let announcements;

  try {
    if (active) {
      announcements = await Announcement.find()
        .sort({ updatedAt: -1 })
        .limit(1);
    } else {
      announcements = await Announcement.find();
    }

    res.status(200).json(announcements);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

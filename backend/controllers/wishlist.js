import Wishlist from "../models/wishlist.js";

// GET WISHLIST that belong to one user "/"
export const getWishlist = async (req, res) => {
  const user = req.user._id;

  try {
    Wishlist.findOne({ user })
      .populate("products.product")
      .exec((error, wishlist) => {
        if (error) {
          res.status(400).json(error);
        } else if (!wishlist) {
          res.status(400).json({ message: "Wishlist empty" });
        } else {
          res.status(200).json(wishlist);
        }
      });
  } catch (error) {
    return error;
  }
};

// ADD TO WISHLIST "wishlist/addToWishlist?productId=${productId}""
export const addToWishlist = async (req, res) => {
  const user = req.user._id;
  const item = {
    product: req.query.productId,
  };

  try {
    const existingWishlist = await Wishlist.findOne({ user });
    if (!existingWishlist) {
      await Wishlist.create({
        user: user,
        products: [item],
      });
    } else {
      existingWishlist.products.push(item);
      await existingWishlist.save();
    }
    Wishlist.findOne({ user })
      .populate("products.product")
      .exec((error, wishlist) => {
        if (error) {
          res.status(400).json(error);
        } else if (!wishlist) {
          res.status(400).json({ message: "Wishlist empty" });
        } else {
          res.status(200).json(wishlist);
        }
      });
  } catch (error) {
    return error;
  }
};

//REMOVE FROM WISHLIST
export const removeFromWishlist = async (req, res) => {
  const user = req.user._id;

  try {
    const existingWishlist = await Wishlist.findOne({ user });
    if (existingWishlist.products.length === 1) {
      await Wishlist.findOneAndRemove({ user }, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json([]);
        }
      });
    } else {
      await Wishlist.findOneAndUpdate(
        { user },
        {
          $pull: {
            products: { product: req.query.productId },
          },
        },
        { new: true, useFindAndModify: false }
      );

      Wishlist.findOne({ user })
        .populate("products.product")
        .exec((error, wishlist) => {
          if (error) {
            res.status(400).json(error);
          } else {
            res.status(200).json(wishlist);
          }
        });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

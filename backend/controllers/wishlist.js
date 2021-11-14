import Wishlist from "../models/wishlist.js";
import Product from "../models/product.js";

// add to wishlist "wishlist/addToWishlist?productId=${productId}""
export const addToWishlist = async (req, res) => {
  const user = req.user._id;

  const item = {
    product: req.query.productId,
  };

  try {
    const existingWishlist = await Wishlist.findOne({ user });
    if (!existingWishlist) {
      const newWishlist = await Wishlist.create({
        user: user,
        products: [item],
      });
      res.status(200).json(newWishlist.products);
    } else {
      existingWishlist.products.push(item);
      await existingWishlist.save();
      res.status(200).json(existingWishlist.products);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all wishlist products that belong to one user "/"
export const getWishlist = async (req, res) => {
  const user = req.user._id;

  try {
    Wishlist.findOne({ user })
      .populate("products.product")
      .exec((error, wishlist) => {
        if (error) {
          res.status(400).json(error);
        } else {
          if (!wishlist) {
            res.status(400).json(error);
          } else {
            res.status(200).json(wishlist);
          }
        }
      });
  } catch (error) {
    return error;
  }
};

//delete one
export const removeFromWishlist = async (req, res) => {
  const user = req.user._id;

  try {
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
          res.status(200).json(wishlist.products);
        }
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

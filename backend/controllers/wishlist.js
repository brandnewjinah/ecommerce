import Wishlist from "../models/wishlist.js";
import Product from "../models/product.js";

//create
export const addWishlist = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;
  try {
    const existingWishlist = await Wishlist.findOne({ user: userId });
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      res.status(404).json({ message: "Product doesn't exist" });
    }

    if (existingWishlist) {
      existingWishlist.products.push(product);
    } else {
      const newWishlist = await Wishlist.create({
        user: userId,
        products: [
          {
            product,
          },
        ],
      });
      return res
        .status(200)
        .json({ message: "Saved to wishlist", newWishlist });
    }
  } catch (error) {
    return error;
  }
};

//get all
export const getWishlist = async (req, res) => {
  const userId = req.params.id;

  try {
    Wishlist.findOne({ user: userId })
      .populate("products.product")
      .exec((error, wishlist) => {
        if (error) {
          res.status(400).json(error);
        } else {
          if (!wishlist) {
            res.status(400).json({ message: "Wishlist doesn't exist" });
          } else {
            res.status(200).json(wishlist);
          }
        }
      });
  } catch (error) {
    return error;
  }
};

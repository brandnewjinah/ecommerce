const cart = require("../models/cart");
const cartModel = require("../models/cart");
const productModel = require("../models/product");

//add to cart

exports.cart_add = (req, res) => {
  const { product, quantity } = req.body;

  cartModel
    .findOne({ user: req.user.id })
    .then((cart) => {
      console.log(cart);
    })
    .catch();

  // productModel
  //   .findById(product.id)
  //   .then((product) => {
  //     if (!product) {
  //       return res.status(404).json({
  //         message: "Product doesn't exist",
  //       });
  //     } else {
  //       const cart = new cartModel({
  //         product,
  //         quantity,
  //       });
  //       cart
  //         .save()
  //         .then((cart) => {
  //           res.status(200).json({
  //             message: "Cart updated",
  //             updatedCart: {
  //               id: cart._id,
  //               product: cart.product._id,
  //               quantiyt: cart.quantity,
  //             },
  //           });
  //         })
  //         .catch((err) => {
  //           res.status(500).json({
  //             error: err,
  //           });
  //         });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       error: err.message,
  //     });
  //   });
};

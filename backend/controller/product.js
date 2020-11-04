const productModel = require("../models/product");

//create product
exports.product_post_product = (req, res) => {
  const { name, price, category, brand, code } = req.body;
  const newProduct = new productModel({
    name,
    price,
    category,
    brand,
    code,
  });

  newProduct
    .save()
    .then((product) => {
      res.json({
        message: "Product saved",
        productInfo: {
          id: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          brand: product.brand,
          code: product.code,
          request: {
            type: "GET",
            url: "http://localhost:5000/product/" + product._id,
          },
        },
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

//get all products
exports.product_get_all = (req, res) => {
  productModel
    .find()
    .then((products) => {
      res.json({
        message: "All products",
        count: products.length,
        products: products.map((product) => {
          return {
            id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            brand: product.brand,
            // code: product.code,
            request: {
              type: "GET",
              url: "http://localhost:5000/product/" + product._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

//get product detail
exports.product_get_product = (req, res) => {
  const id = req.params.productId;
  productModel
    .findById(id)
    .then((product) => {
      if (product) {
        res.status(200).json({
          message: "Product info for the provided ID",
          productInfo: {
            id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            brand: product.brand,
            code: product.code,
          },
          request: {
            type: "GET",
            url: "http://localhost:5000/product",
          },
        });
      } else {
        res.status(404).json({
          message: "Product not found with provivded ID ",
        });
      }
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

//update product
exports.product_update_product = (req, res) => {
  const id = req.params.productId;
  // const updateOps = {};

  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }

  productModel
    .findByIdAndUpdate(id, { $set: req.body })
    .then((result) => {
      res.json({
        message: "product updated",
        request: {
          type: "GET",
          url: "http://localhost:5000/product/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

//delete by id
exports.product_delete_product = (req, res) => {
  const id = req.params.productId;
  productModel
    .findByIdAndDelete(id)
    .then((product) => {
      res.json({
        message: "Deleted product",
        request: {
          type: "GET",
          url: "http://localhost:5000/product",
          body: {
            name: "String",
            price: "Number",
            category: "String",
            brand: "String",
            code: "String",
          },
        },
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

//delete all
exports.product_delete_all = (req, res) => {
  productModel
    .remove()
    .then((products) => {
      res.json({
        message: "Deleted all products",
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

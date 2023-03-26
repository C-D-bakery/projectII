const express = require("express");

const Product = require("../models/Product.model");

const router = express.Router();

//CREATE: display form
router.get("/product/create", (req, res, next) => {
  res.render("../views/products/new-product.hbs");
  // .then(
  // )
  // .catch(e => {
  //     console.log("error getting authors from DB", e);
  //     next(e);
  //   });
});

// CREATE - process form
router.post("/product/create", (req, res, next) => {
  const productDetails = {
    product: req.body.product,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    ingredients: req.body.ingredients,
    gluten_free: req.body.gluten_free,
    image: req.body.image,
  };

  Product.create(productDetails)

    .then((productFromDB) => {
      console.log(productFromDB);
      res.redirect("/product");
    })
    .catch((e) => {
      console.log("error creating new product", e);
    });
  console.error((e) => {
    res.redirect("products/new-product", e);
  });
});

router.get("/product", (req, res, next) => {
  Product.find()
    .then((productArr) => {
      const data = {
        items: productArr,
      };
      res.render("products/product", data);
    })
    .catch((e) => {
      console.log("Product not found", e);
      next(e);
    });
});

/////////remove product

router.post("/product/:id/delete", async (req, res, next) => {
  console.log(req.params.id);
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.redirect("/products ");
  } catch (err) {
    console.log("error delete", err);
  }
});

module.exports = router;

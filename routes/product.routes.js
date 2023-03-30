const express = require("express");

const Product = require("../models/product.model.js");
const fileUploader = require("../config/cloudinary.config");
const router = express.Router();
const isUserLoggedIn = require("../middleware/isLoggedIn");

//CREATE: display form
router.get("/product/create", isUserLoggedIn, (req, res, next) => {
  console.log(req.session.currentUser);
  res.render("../views/products/new-product.hbs");
});

// CREATE - process form
router.post(
  "/product/create",
  isUserLoggedIn,
  fileUploader.single("image"),
  (req, res, next) => {
    console.log(req.body);
    const productDetails = {
      product: req.body.product,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      ingredients: req.body.ingredients,
      gluten_free: req.body.gluten_free,
      image: req.file.path,
      // madeBy: req.session.currentUser._id
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
  }
);

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

/////Product details
router.get("/product/:productId/details", (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)

    .then((productDetails) => {
      console.log(productDetails);

      res.render("products/product-details", productDetails);
    })
    .catch((e) => {
      console.log("Product not found", e);
      next(e);
    });
});

/////////remove product

router.post("/product/:id/delete", isUserLoggedIn, async (req, res, next) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.redirect("/product");
  } catch (err) {
    console.log("error delete", err);
  }
});

//UPDATE: display form
router.get("/product/:productId/update", isUserLoggedIn, (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)

    .then((product) => {
      res.render("products/product-update", product);
    })

    .catch((e) => {
      console.log("error updating", e);
    });
});

//UPDATE: Post form
router.post("/product/:productId/update", isUserLoggedIn, (req, res, next) => {
  const newProduct = {
    product: req.body.product,
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    ingredients: req.body.ingredients,
    gluten_free: req.body.gluten_free,
    image: req.body.image,
  };
  console.log(req.params.productId);
  Product.findByIdAndUpdate(req.params.productId, newProduct, { new: true })
    .then(() => {
      res.redirect("/product");
    })
    .catch((e) => {
      console.log("error updating list of products", e);
    });
});

module.exports = router;

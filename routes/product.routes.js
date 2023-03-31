const express = require("express");
const Order = require("../models/order.model.js"); /////new
const Product = require("../models/product.model.js");
const fileUploader = require("../config/cloudinary.config");
const router = express.Router();
const isUserLoggedIn = require("../middleware/isLoggedIn");

//CREATE: display form
router.get(
  "/product/create",
  isUserLoggedIn,
  fileUploader.single("image"),
  (req, res, next) => {
    res.render("../views/products/new-product.hbs");
  }
);

// CREATE - process form
router.post(
  "/product/create",
  isUserLoggedIn,
  fileUploader.single("image"),
  (req, res, next) => {
    const currentUser = req.session.currentUser;
    const productDetails = {
      product: req.body.product,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      ingredients: req.body.ingredients,
      gluten_free: req.body.gluten_free,
      image: req.file.path,
      madeby: currentUser._id,
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
    .populate("madeby")
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
    // image: image,
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

router.get("/product/order", isUserLoggedIn, (req, res) => {
  res.render("../views/products/order.hbs");
});
/////new
// set up route to handle form submission
router.post("/product/order", isUserLoggedIn, (req, res) => {
  // create a new Order document using data from the form submission
  const newOrder = new Order({
    method: req.body.product,
    name: req.body.name,
    billingAddress: req.body.billingAddress,
    date: req.body.date,
    quantityOrder: req.body.quantityOrder,
    payment: req.body.payment,
  });

  // save the new Order document to the database
  newOrder
    .save()
    .then(() => {
      console.log("Order placed successfully!");
      res.redirect("/");
    })

    .catch((err) => {
      console.log(err);
      res.status(500).send("Error placing order.");
    });
});
//////new
router.get("/gallery", isUserLoggedIn, (req, res) => {
  res.render("../views/products/gallery.hbs");
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require("../models/Product.model")

//CREATE: display form
router.get("/product/create", (req, res, next) => {
   console.log(req.body)
    res.render("../views/products/new-product.hbs")
    // .then(
    // )
    // .catch(e => {
    //     console.log("error getting authors from DB", e);
    //     next(e);
    //   });
})

// CREATE - process form
router.post("/product/create",(req,res,next)=>{
console.log(req.body)
    const productDetails = {
        product :req.body.product,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        ingredients: req.body.ingredients,
        gluten_free: req.body.gluten_free
    }
   
    Product.create(productDetails)
    console.log(productDetails)
        .then(productFromDB => {
            res.redirect("/product");
        })
        .catch(e => {
            console.log("error creating new product", e);
            
          });
          console.error(e);
          res.redirect("/product/create")
})





module.exports = router;
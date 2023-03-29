const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    product: {
      type: String,
      required: true,
      enum: ["Cake", "Bread"]
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    ingredients: {
      type: String,
      required: true
    },
    gluten_free: {
      type: String,
      enum: ["Yes", "No"]
    },
    image:{
      type: String,
      required: true
    },
    //  madeby:{
    //    type: Schema.Types.ObjectId,
    //    ref: "User"
    //   }
    }
);

const Product = model("Product",  productSchema);

module.exports = Product;
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const orderSchema = new Schema(
  {
    method: {
      type: String,
      required: true,
      enum: ["pick-up", "delivery"],
    },

    name: {
      type: String,
      required: true,

      trim: true,
    },
    billingAddress: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    quantityOrder: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
      enum: ["Credit-card", "PayPal", "Cash"],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;

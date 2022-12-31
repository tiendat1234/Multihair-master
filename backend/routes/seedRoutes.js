import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";
import Discount from "../models/discountModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  await Discount.remove({});
  const createdDiscount = await Discount.insertMany(data.discounts);
  res.send({ createdProducts, createdUsers, createdDiscount });
});
export default seedRouter;

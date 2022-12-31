import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin, generateToken } from "../utils.js";
import Discount from "./../models/discountModel.js";

const discountRouter = express.Router();
//TẠO MỚI
discountRouter.post(
  "/",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newDiscount = new Discount({
      name: "Mẫu" + Date.now(),
      number: 0,
      quantity: 0,
    });
    const discount = await newDiscount.save();
    res.send({ message: "Tạo Giảm Giá Thành Công", discount });
  })
);
//TẠO MỚI
// discountRouter.post(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     const newDiscount = new Discount({
//       name: req.body.name,
//       number: req.body.number,
//       quantity: req.body.quantity,
//     });
//     const discount = await newDiscount.save();
//     res.send({
//       _id: discount._id,
//       name: discount.name,
//       number: discount.email,
//       quantity: discount.isAdmin,
//       token: generateToken(discount),
//     });
//   })
// );
//LẤY ALL
discountRouter.get(
  "/",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const discounts = await Discount.find({});
    res.send(discounts);
  })
);
// LẤY 1
discountRouter.get(
  "/:id",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const discount = await Discount.findById(req.params.id);
    if (discount) {
      res.send(discount);
    } else {
      res.status(404).send({ message: "Không Tìm Thấy Mã giảm giá nào !!" });
    }
  })
);
// CHANGE 1
discountRouter.put(
  "/:id",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const discount = await Discount.findById(req.params.id);
    if (discount) {
      discount.number = req.body.number || discount.number;
      discount.quantity = req.body.quantity || discount.quantity;
      const updatedDiscount = await discount.save();
      res.send({
        message: "Mã giảm giá Đã Được Cập Nhật",
        discount: updatedDiscount,
      });
    } else {
      res.status(404).send({ message: "Không Tìm Thấy Mã giảm giá" });
    }
  })
);
//XÓA 1
discountRouter.delete(
  "/:id",
  // isAuth,
  // isAdmin,
  expressAsyncHandler(async (req, res) => {
    const discount = await Discount.findById(req.params.id);
    if (discount) {
      await discount.remove();
      res.send({ message: "Xóa Thành Công" });
    } else {
      res.status(404).send({ message: "Không Tìm Thấy Mã giảm giá" });
    }
  })
);
export default discountRouter;

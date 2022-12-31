import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    number: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Discount = mongoose.model("Discount", discountSchema);
export default Discount;

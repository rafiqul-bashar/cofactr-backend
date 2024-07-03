import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Buyer
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  orderType: { type: String, enum: ["purchase", "sale"], required: true }, // 'purchase' or 'sale'
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Seller
  totalPrice: { type: Number, required: true },
  paymentId: { type: String, required: true },
  paymentCompleted: Boolean,
  currency: { type: String, required: true },
});

export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "cannot be empty!"] },
    price: { type: Number, required: [true, "cannot be empty!"] },
    stock: { type: Number, required: [true, "cannot be empty!"] },
    description: { type: String, required: [true, "cannot be empty!"] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { type: String, required: [true, "cannot be empty!"] },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

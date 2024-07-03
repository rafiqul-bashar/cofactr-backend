import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name cannot be empty!"] },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Category", categorySchema);

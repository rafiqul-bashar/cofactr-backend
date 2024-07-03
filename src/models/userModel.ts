import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " should not be blank."],
      min: [8, "is too short! Enter Fullname."],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "looks like invalid!"],
      index: true,
    },
    password: { type: String, required: true, trim: true, select: false },
    image: String,
    seller: { type: Boolean, default: false },
    token: String,
    products: {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      default: [],
    },
    orders: {
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

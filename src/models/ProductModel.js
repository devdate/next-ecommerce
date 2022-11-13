import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 60,
    },
    description: {
      type: String,
      required: true,
      maxLength: 800,
    },
    image: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Products ||
  mongoose.model("Products", ProductSchema);

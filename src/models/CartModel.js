import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const CartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "Users",
  },
  products: [
    {
      quantity: { type: Number, default: 1 },
      variant: { type: Number },
      product: { type: ObjectId, ref: "Products" },
    },
  ],
});

export default mongoose.models.Carts || mongoose.model("Carts", CartSchema);

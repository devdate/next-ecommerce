import dbConnect from "../../helpers/dbConnect";
import Carts from "../../src/models/CartModel";
import jwt from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getCart(req, res);
      break;
    case "PUT":
      await saveCart(req, res);
      break;
    case "DELETE":
      await deleteCart(req, res);
      break;
  }
};

function Authenticated(icomponent) {
  return (req, res) => {
    const { authorization } = req.headers;
    const token = authorization ? authorization.split(" ")[1] : "";
    if (!token) {
      return res.status(401).json({ error: "You Must Login" });
    }
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = userId;
      return icomponent(req, res);
    } catch (err) {
      res.status(401).json({ error: "You Must be Logged In" });
      console.log(err);
    }
  };
}

const getCart = Authenticated(async (req, res) => {
  const cart = await Carts.findOne({ user: req.userId }).populate(
    "products.product"
  );
  var totalQuantity = 0;
  var totalPrice = 0;
  const viewCart = cart.products.map((eachItem) => {
    totalQuantity += eachItem.quantity;
    totalPrice += eachItem.quantity * eachItem.product.prices[eachItem.variant];
    return {
      _id: eachItem.product._id,
      key: eachItem.product._id,
      variant: eachItem.variant,
      quantity: eachItem.quantity,
      name: eachItem.product.name,
      description: eachItem.product.description,
      image: eachItem.product.image,
      prices: eachItem.product.prices,
    };
  });
  res.status(200).json({ viewCart, totalQuantity, totalPrice });
});

const saveCart = Authenticated(async (req, res) => {
  const cart = await Carts.findOne({ user: req.userId });
  const productExists = cart.products.find(
    (each) =>
      req.body.product._id === each.product.toString() &&
      req.body.variant === each.variant
  );
  if (productExists) {
    await Carts.findOneAndUpdate(
      {
        user: req.userId,
        "products._id": productExists._id,
      },
      { $inc: { "products.$.quantity": 1 } }
    );
  } else {
    const newProduct = {
      quantity: 1,
      variant: req.body.variant,
      product: req.body.product._id,
    };
    await Carts.findOneAndUpdate(
      { user: req.userId },
      {
        $push: { products: newProduct },
      }
    );
  }
  res.status(200).json({ message: "Product added to cart" });
});

const deleteCart = Authenticated(async (req, res) => {
  const cart = await Carts.findOne({ user: req.userId });
  const productExists = cart.products.find(
    (each) =>
      req.body.product._id === each.product.toString() &&
      req.body.variant === each.variant
  );
  if (productExists.quantity > 1) {
    await Carts.findOneAndUpdate(
      {
        user: req.userId,
        "products._id": productExists._id,
      },
      { $inc: { "products.$.quantity": -1 } }
    );
  } else {
    await Carts.findOneAndUpdate(
      { user: req.userId },
      {
        $pull: { products: { _id: productExists._id } },
      }
    );
  }
  res.status(200).json({ message: "Product deleted from cart" });
});

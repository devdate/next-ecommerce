import dbConnect from "../../helpers/dbConnect";
import Users from "../../src/models/UserModel";
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
  }
};

const getCart = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization ? authorization.split(" ")[1] : "";
  if (!token) {
    return res.status(401).json({ error: "You Must Login" });
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("test", userId);
    const cart = await Carts.findOne({ user: userId }).populate(
      "products.product"
    );
    //console.log(cart);
    var totalQuantity = 0;
    var totalPrice = 0;
    const viewCart = cart.products.map((eachItem) => {
      totalQuantity += eachItem.quantity;
      totalPrice +=
        eachItem.quantity * eachItem.product.prices[eachItem.variant];
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
    //console.log(cart);
    res.status(200).json({ viewCart, totalQuantity, totalPrice });
  } catch (err) {
    res.status(401).json({ error: "You Must be Logged In" });
    console.log(err);
  }
};

const saveCart = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization ? authorization.split(" ")[1] : "";
  //console.log("token", authorization);
  if (!token) {
    return res.status(401).json({ error: "You Must Login" });
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("user", userId);
    if (!userId) {
      //return res.status(401).send('Unauthorized request');
    }
    const cart = await Carts.findOne({ user: userId });
    //console.log(cart.products, req.body.product._id);
    const productExists = cart.products.find(
      (each) =>
        req.body.product._id === each.product.toString() &&
        req.body.variant === each.variant
    );
    //console.log(productExists);
    if (productExists) {
      console.log(productExists);
      console.log("----------------------------");
      console.log(req.body);
      await Carts.findOneAndUpdate(
        {
          user: userId,
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
        { user: userId },
        {
          $push: { products: newProduct },
        }
      );
    }
    res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    res.status(401).json({ error: "You Must be Logged In" });
    console.log(err.message);
  }
};

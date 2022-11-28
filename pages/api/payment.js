import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import Carts from "../../src/models/CartModel";
import jwt from "jsonwebtoken";

const stripe = Stripe(process.env.STRIPE_SECRET);

export default async (req, res) => {
  const { paymentInfo } = req.body;
  const { authorization } = req.headers;
  const token = authorization ? authorization.split(" ")[1] : "";
  if (!token) {
    return res.status(401).json({ error: "You Must Login" });
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const cart = await Carts.findOne({ user: userId }).populate(
      "products.product"
    );
    let totalPrice = 0;
    cart.products.forEach((eachItem) => {
      totalPrice +=
        eachItem.quantity * eachItem.product.prices[eachItem.variant];
    });
    const prevCustomer = await stripe.customers.list({
      email: paymentInfo.email,
    });
    const isExistingCustomer = prevCustomer.data.length > 0;
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentInfo.email,
        source: paymentInfo.id,
      });
    }
    const charge = await stripe.charges.create(
      {
        currency: "INR",
        amount: totalPrice * 100,
        receipt_email: paymentInfo.email,
        customer: isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
        description: `Your purchaseis completed | ${paymentInfo.email}`,
      },
      { idempotencyKey: uuidv4() }
    );

    res.status(200).json({ message: "payment successful" });
  } catch (err) {
    res.status(401).json({ error: "Error processing payment" });
    console.log(err);
  }
};

import dbConnect from "../../../src/util/mongo";
import Product from "../../../src/models/ProductModel";

export default async function handler(req, res) {
  const { method, query } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(query.id);
      //console.log(query);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

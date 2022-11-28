import dbConnect from "../../../helpers/dbConnect";
import Products from "../../../src/models/ProductModel";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "DELETE":
      deleteProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.query.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err.response);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.query.id);
    res.status(200).json({});
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
};

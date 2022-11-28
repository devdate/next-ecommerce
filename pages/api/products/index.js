import dbConnect from "../../../helpers/dbConnect";
import Products from "../../../src/models/ProductModel";

dbConnect();

export default async (req, res) => {
  const { search } = req.query;
  //console.log(search);
  switch (req.method) {
    case "GET":
      if (search) {
        await getFilteredProducts(req, res);
      } else {
        await getAllProducts(req, res);
      }
      break;
    case "POST":
      await saveProduct(req, res);
      break;
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    //console.log(req.query.search);
    const products = await Products.aggregate([
      {
        $search: {
          index: "default",
          text: {
            query: req.query.search,
            path: {
              wildcard: "*",
            },
          },
        },
      },
      { $limit: 3 },
    ]);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
};

const saveProduct = async (req, res) => {
  const { name, description, image, prices } = req.body;
  try {
    if (!name || !description || !image || !prices || prices.length == 0) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const product = await new Products({
      name,
      description,
      image,
      prices,
    }).save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
};

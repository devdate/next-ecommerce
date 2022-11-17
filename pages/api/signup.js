import dbConnect from "../../helpers/dbConnect";
import Users from "../../src/models/UserModel";
import bcrypt from "bcryptjs";

dbConnect();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await saveUser(req, res);
      break;
  }
};

const saveUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (
      !name ||
      !email ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
      !password ||
      password.length < 8 ||
      password.length > 20
    ) {
      return res.status(422).json({ error: "Invalid Inputs" });
    }
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists" });
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const user = await new Users({
      name,
      email,
      password: hashedPass,
    }).save();
    console.log(user);
    res.status(201).json({ message: "signup success" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
};

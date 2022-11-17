import dbConnect from "../../helpers/dbConnect";
import Users from "../../src/models/UserModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      !email ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
      !password ||
      password.length < 8 ||
      password.length > 20
    ) {
      return res.status(422).json({ error: "Invalid Inputs" });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(422).json({ error: "Incorrect Credentials" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { name, email, role } = user;
      res
        .status(201)
        .json({ token, user: JSON.stringify({ name, email, role }) });
    } else {
      res.status(401).json({ error: "Incorrect Credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err);
  }
};

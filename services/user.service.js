const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../email");
module.exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.json({ message: "email already exists" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      await userModel.insertMany({ name, email, password: hash });
      const token = jwt.sign({ email }, "econfirm", { expiresIn: 30 });
      sendEmail({ email, token, message: "hello" });
      res.json({ message: "signup success" });
    });
  }
};
module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "secretKey"
    );
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      if (user.emailConfirm == true) {
        res.json({ message: "signin success", token });
      } else {
        res.json({ message: "email not confirmed" });
      }
    } else {
      res.json({ message: "wrong password" });
    }
  } else {
    res.json({ message: "email does not exist" });
  }
};
module.exports.emailVerify = (req, res) => {
  const { token } = req.params;
  jwt.verify(token, "econfirm", async (err, decoded) => {
    if (err) {
      res.json(err);
    } else {
      const user = await userModel.findOne({ email: decoded.email });
      if (user) {
        await userModel.findOneAndUpdate(
          { email: decoded.email },
          { emailConfirm: true }
        );
        res.json({ message: "email verified" });
      } else {
        res.json({ message: "user not found" });
      }
    }
  });
};

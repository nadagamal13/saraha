const msgModel = require("../models/message.model");
module.exports.addMsg = async (req, res) => {
  const { message, userId } = req.body;
  await msgModel.insertMany({ message, userId });
  res.json({ message: "Msg added" });
};
module.exports.allMsg = async (req, res) => {
  const msgs = await msgModel.find({ userId: req.id }, { message: 1, _id: 0 });
  res.json({ message: "success", msgs });
};

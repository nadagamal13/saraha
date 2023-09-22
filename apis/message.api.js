const { auth } = require("../middleware/auth");
const { addMsg, allMsg } = require("../services/message.service");
const app = require("express").Router();
app.post("/addMsg", addMsg);
app.get("/allMsg", auth, allMsg);
module.exports = app;
